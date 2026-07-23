import sys, os

# Allow importing db.py from the parent (backend) directory
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from db import get_conn

conn = get_conn()
cursor = conn.cursor()
try:
    # Check if the column already exists before adding it
    cursor.execute("PRAGMA table_info(projects)")
    columns = [col[1] for col in cursor.fetchall()]
    if "liked" not in columns:
        cursor.execute("""
            ALTER TABLE projects
            ADD COLUMN liked INTEGER DEFAULT 0;
        """)
        conn.commit()
        print("Column 'liked' added successfully.")
    else:
        print("Column 'liked' already exists, nothing to do.")
except Exception as e:
    print(f"Migration failed: {e}")
finally:
    conn.close()
