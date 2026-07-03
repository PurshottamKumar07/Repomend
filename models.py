from db import get_conn

def create_tables():
    conn = get_conn()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        repo_name TEXT,
        link TEXT UNIQUE,
        description TEXT,
        stars INTEGER,
        forks INTEGER,
        language TEXT,
        score REAL,
        created_at TEXT,
        sent_to_frontend INTEGER NOT NULL DEFAULT 0
    )
    """)

    cursor.execute("PRAGMA table_info(projects)")
    columns = [col[1] for col in cursor.fetchall()]
    if 'link' not in columns:
        cursor.execute("ALTER TABLE projects ADD COLUMN link TEXT")
        cursor.execute("CREATE UNIQUE INDEX IF NOT EXISTS idx_projects_link ON projects(link)")
    if 'sent_to_frontend' not in columns:
        cursor.execute(
            "ALTER TABLE projects ADD COLUMN sent_to_frontend INTEGER NOT NULL DEFAULT 0"
        )

    cursor.execute("CREATE INDEX IF NOT EXISTS idx_score ON projects(score DESC)")
    cursor.execute(
        "CREATE INDEX IF NOT EXISTS idx_unsent_score ON projects(sent_to_frontend, score DESC)"
    )

    conn.commit()
    conn.close()


def mark_all_unseen():
    """Mark every project as not yet sent to the frontend (sent_to_frontend = 0)."""
    conn = get_conn()
    try:
        cursor = conn.cursor()
        cursor.execute("UPDATE projects SET sent_to_frontend = 0")
        cursor.execute("UPDATE projects SET score = 0")
        conn.commit()
    finally:
        conn.close()

def empty_database():
    conn=get_conn()
    cursor=conn.cursor()
    cursor.execute("DELETE FROM projects")
    conn.commit()
    conn.close()

empty_database()