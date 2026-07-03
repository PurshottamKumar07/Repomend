from fastapi import FastAPI, HTTPException, BackgroundTasks
from ingest import ingest_data, reval_pref
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
    # Re-score existing projects synchronously so /data is accurate immediately
    from ingest import reval_pref, cur_pref, rescore_existing_projects
    reval_pref(cur_pref, data.preferences)
    rescore_existing_projects(cur_pref)
    # Fetch new repos from GitHub in the background
    background_tasks.add_task(ingest, data.preferences)
    return {"message": "Preferences received; existing projects re-scored, background ingestion started."}
    
def ingest(preferences):
    ingest_data(preferences)   

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
    from ingest import cur_pref
    cur_pref.clear()
    
    mark_all_unseen()

    return {"message": "Recommendation system reset successfully. All projects marked unseen."}