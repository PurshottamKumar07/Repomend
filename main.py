from fastapi import FastAPI , HTTPException
from ingest import ingest_data
from dotenv import load_dotenv
from os import getenv
from pydantic import BaseModel
from models import create_tables
from db import get_conn
from typing import Dict

class Projects(BaseModel):
    id : int
    p_name: str
    link: str
    name: str
    description: str
    topics: list


load_dotenv()

git_api=getenv("GITHUB_TOKEN")

app=FastAPI()


class PreferenceRequest(BaseModel):
    preferences: Dict[str, int]

@app.post("/preferences")
async def save_preferences(data: PreferenceRequest):
    print(data.preferences)
    return {
        "received": data.preferences
    }
    
def ingest():
    create_tables()
    ingest_data()
    return {"message": "Data ingested successfully"}    

@app.get("/")
def read_root():
    return {"message": "Hello everynyan"}

@app.get("/data")
def get_feed(limit: int = 10, offset: int = 0):
    conn = get_conn()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT id, repo_name, description, stars, forks, language, score
        FROM projects
        ORDER BY score DESC
        LIMIT ? OFFSET ?
    """, (limit, offset))

    rows = cursor.fetchall()
    conn.close()

    return [
        {
            "id": r[0],
            "title": r[1],
            "description": r[2] or "No description provided.",
            "stars": r[3],
            "forks": r[4],
            "language": r[5] or "Unknown",
            "score": r[6]
        }
        for r in rows
    ]
