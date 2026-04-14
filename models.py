from db import get_conn

def create_tables():
    conn = get_conn()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        repo_name TEXT,
        description TEXT,
        stars INTEGER,
        forks INTEGER,
        language TEXT,
        score REAL,
        created_at INTEGER
    )
    """)

    # index for fast feed queries
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_score ON projects(score DESC)")

    conn.commit()
    conn.close()