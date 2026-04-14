import sqlite3

DB_NAME="feed.db"

def get_conn():
    return sqlite3.connect(DB_NAME, check_same_thread=False)
