from fastapi import FastAPI, HTTPException, BackgroundTasks
from ingest import ingest_data, reval_pref
from dotenv import load_dotenv
from pydantic import BaseModel
from models import create_tables
from db import get_conn
from typing import Dict, List

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

app = FastAPI()

@app.post("/preferences", status_code=202)
async def save_preferences(data: PreferenceRequest, background_tasks: BackgroundTasks):
    print("Endpoint /preferences called")
    background_tasks.add_task(ingest, data.preferences)
    return {"message": "Preferences received; background ingestion started."}
    
def ingest(preferences):
    create_tables()
    ingest_data(preferences)   

@app.get("/data", response_model=List[Projects])
def get_feed(limit: int = 10, offset: int = 0):
    conn = get_conn()
    try:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT id, repo_name, link, description, stars, forks, language, score
            FROM projects
            ORDER BY score DESC
            LIMIT ? OFFSET ?
        """, (limit, offset))

        rows = cursor.fetchall()

        if rows:
            ids = [r[0] for r in rows]
            placeholders = ",".join("?" for _ in ids)
            cursor.execute(f"DELETE FROM projects WHERE id IN ({placeholders})", ids)
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
    print("Endpoint /reset called")
    from ingest import cur_pref
    cur_pref.clear()

    conn = get_conn()
    try:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM projects")
        conn.commit()
    finally:
        conn.close()

    return {"message": "Recommendation system reset successfully."}