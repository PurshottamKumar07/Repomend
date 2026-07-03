import sqlite3

DB_NAME="feed.db"

def get_conn():
    conn = sqlite3.connect(DB_NAME, check_same_thread=False, timeout=30.0)
    conn.execute("PRAGMA journal_mode=WAL;")
    return conn

