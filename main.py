from fastapi import FastAPI, HTTPException, BackgroundTasks
from ingest import ingest_data, merge_preferences, rescore_existing_projects
from dotenv import load_dotenv
from pydantic import BaseModel
from models import create_tables, mark_all_unseen
from db import get_conn
from typing import Dict, List
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

class Projects(BaseModel):
    id: int
    title: str
    link: str
    description: str
    stars: int
    forks: int
    language: str
    score: float

class PreferenceRequest(BaseModel):
    preferences: Dict[str, int]
    
load_dotenv()

# Per-process accumulated preferences.  Protected by a lock so that
# concurrent requests (or background tasks) never see a half-updated dict.
import threading

_pref_lock = threading.Lock()
_preferences: dict = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_tables()
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5000",
        "https://repomend.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/preferences", status_code=202)
async def save_preferences(data: PreferenceRequest, background_tasks: BackgroundTasks):
    print("Endpoint /preferences called")

    with _pref_lock:
        global _preferences
        _preferences = merge_preferences(_preferences, data.preferences)
        snapshot = dict(_preferences)   # immutable copy for the background task

    rescore_existing_projects(snapshot)

    background_tasks.add_task(ingest_data, snapshot)
    return {"message": "Preferences received; existing projects re-scored, background ingestion started."}

@app.get("/data", response_model=List[Projects])
def get_feed(limit: int = 10, offset: int = 0):
    conn = get_conn()
    try:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT id, repo_name, link, description, stars, forks, language, score
            FROM projects
            WHERE sent_to_frontend = 0
            ORDER BY score DESC
            LIMIT ? OFFSET ?
        """, (limit, offset))

        rows = cursor.fetchall()

        if rows:
            ids = [r[0] for r in rows]
            placeholders = ",".join("?" for _ in ids)
            cursor.execute(
                f"UPDATE projects SET sent_to_frontend = 1 WHERE id IN ({placeholders})",
                ids,
            )
            conn.commit()
    finally:
        conn.close()

    return [
        {
            "id": r[0],
            "title": r[1],
            "link": r[2] or "",
            "description": r[3] or "No description provided.",
            "stars": r[4],
            "forks": r[5],
            "language": r[6] or "Unknown",
            "score": r[7]
        }
        for r in rows
    ]

@app.post("/reset")
def reset_recommendations():
    print("Endpoint reset called")
    with _pref_lock:
        global _preferences
        _preferences = {}
    
    mark_all_unseen()

    return {"message": "Recommendation system reset successfully. All projects marked unseen."}