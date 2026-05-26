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
        created_at TEXT
    )
    """)

    # Check if 'link' column exists (for backward compatibility if database already exists)
    cursor.execute("PRAGMA table_info(projects)")
    columns = [col[1] for col in cursor.fetchall()]
    if 'link' not in columns:
        cursor.execute("ALTER TABLE projects ADD COLUMN link TEXT")
        cursor.execute("CREATE UNIQUE INDEX IF NOT EXISTS idx_projects_link ON projects(link)")

    # index for fast feed queries
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_score ON projects(score DESC)")

    conn.commit()
    conn.close()