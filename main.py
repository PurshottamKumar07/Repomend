from fastapi import FastAPI, HTTPException, BackgroundTasks
from ingest import ingest_data, merge_preferences, rescore_existing_projects
from dotenv import load_dotenv
from pydantic import BaseModel
from models import create_tables, mark_all_unseen
from db import get_conn
from typing import Dict, List, Optional
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
    liked: int

class PreferenceRequest(BaseModel):
    preferences: Dict[str, int]

class SavedProject(BaseModel):
    id: Optional[int] = None
    title: str
    author: Optional[str] = None
    description: Optional[str] = None
    stars: Optional[str] = None
    forks: Optional[str] = None
    topics: Optional[str] = None
    link: str

class LikedRequest(BaseModel):
    projects: List[SavedProject]
    
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
        "http://localhost:3000",
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
            SELECT id, repo_name, link, description, stars, forks, language, score, liked
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
            "score": r[7],
            "liked": r[8]
        }
        for r in rows
    ]

@app.post("/like/{project_id}")
def toggle_like(project_id: int):
    conn = get_conn()
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT liked FROM projects WHERE id = ?", (project_id,))
        row = cursor.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Project not found")
        new_liked = 0 if row[0] == 1 else 1
        cursor.execute("UPDATE projects SET liked = ? WHERE id = ?", (new_liked, project_id))
        conn.commit()
        return {"id": project_id, "liked": new_liked}
    finally:
        conn.close()

@app.get("/liked")
def get_liked(page: int = 1, limit: int = 12):
    """Return liked projects, paginated.

    Response: { data: [...], hasMore: bool }
    """
    offset = (page - 1) * limit
    conn = get_conn()
    try:
        cursor = conn.cursor()
        # Fetch one extra row to determine if there are more pages
        cursor.execute("""
            SELECT id, repo_name, link, description, stars, forks, language
            FROM projects
            WHERE liked = 1
            ORDER BY id DESC
            LIMIT ? OFFSET ?
        """, (limit + 1, offset))
        rows = cursor.fetchall()
    finally:
        conn.close()

    has_more = len(rows) > limit
    rows = rows[:limit]

    data = [
        {
            "id": r[0],
            "title": r[1] or "",
            "author": "",
            "link": r[2] or "",
            "description": r[3] or "No description provided.",
            "stars": str(r[4] or 0),
            "forks": str(r[5] or 0),
            "topics": r[6] or "Unknown",
        }
        for r in rows
    ]

    return {"data": data, "hasMore": has_more}


@app.delete("/liked/{project_id}")
def delete_liked(project_id: int):
    """Remove a project from the liked list by setting liked = 0."""
    conn = get_conn()
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM projects WHERE id = ?", (project_id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Project not found")
        cursor.execute("UPDATE projects SET liked = 0 WHERE id = ?", (project_id,))
        conn.commit()
    finally:
        conn.close()

    return {"success": True, "id": project_id, "liked": 0}


@app.post("/liked")
def sync_liked(body: LikedRequest):
    """Receive liked projects from localStorage and mark them as liked in the DB.

    Matches each project by its `link` field.  If the link exists in the DB,
    `liked` is set to 1.  Projects whose link is not found are silently skipped.
    """
    conn = get_conn()
    try:
        cursor = conn.cursor()
        matched = 0
        for project in body.projects:
            cursor.execute(
                "UPDATE projects SET liked = 1 WHERE link = ?",
                (project.link,)
            )
            matched += cursor.rowcount
        conn.commit()
    finally:
        conn.close()

    return {"success": True, "matched": matched}


@app.post("/reset")
def reset_recommendations():
    print("Endpoint reset called")
    with _pref_lock:
        global _preferences
        _preferences = {}
    
    mark_all_unseen()

    return {"message": "Recommendation system reset successfully. All projects marked unseen."}
