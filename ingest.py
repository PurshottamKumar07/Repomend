from db import get_conn
from rec_f_git import search_repo
from ml_tool import process_list_with_prompt


def merge_preferences(base, incoming):
    """Return a new dict with base preferences updated by incoming deltas.

    Each key in *incoming* is added to the corresponding value in *base*
    (defaulting to 20 when the key is new).  Neither input dict is mutated.
    """
    merged = dict(base)
    for key, delta in incoming.items():
        merged[key] = merged.get(key, 20) + delta
    return merged


def calculate_score(repo, pref):
    score = 0

    # star / fork scoring
    score += repo.get("stars", 0) * 0.002
    score += repo.get("forks", 0) * 0.003

    # keyword scoring
    description = (repo.get("description") or "").lower()
    for keyword, value in pref.items():
        if keyword in description:
            score += value
    return score

def rescore_existing_projects(pref):
    """Re-score every existing project in the DB using the given preferences."""
    conn = get_conn()
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT id, repo_name, description, stars, forks FROM projects")
        rows = cursor.fetchall()
        for row in rows:
            repo = {
                "stars": row[3] or 0,
                "forks": row[4] or 0,
                "description": row[2] or "",
            }
            score = calculate_score(repo, pref)
            cursor.execute("UPDATE projects SET score = ? WHERE id = ?", (score, row[0]))
        conn.commit()
    finally:
        conn.close()

def ingest_data(pref):
    """Fetch and ingest new repos from GitHub using the given preferences.

    *pref* is the fully-resolved preference dict for this request.  The
    function is self-contained and does not rely on any module-level state.
    """
    repp = process_list_with_prompt(pref)

    if not isinstance(repp, list):
        print(f"Error: process_list_with_prompt returned non-list: {repp}")
        return

    # 1. Fetch all repositories from GitHub API outside of any database transaction
    all_repos = []
    for rep in repp:
        try:
            repo_list = search_repo(rep, per_page=10)
            for repo in repo_list:
                score = calculate_score(repo, pref)
                all_repos.append((repo, score))
        except Exception as e:
            print(f"Error searching for topic '{rep}': {e}")
            continue

    if not all_repos:
        print("No repositories found to ingest.")
        return

    # 2. Write to the database in a single, short-lived transaction
    conn = get_conn()
    try:
        cursor = conn.cursor()
        for repo, score in all_repos:
            cursor.execute("""
            INSERT INTO projects (repo_name, link, description, stars, forks, language, score, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(link) DO UPDATE SET
                score = excluded.score,
                stars = excluded.stars,
                forks = excluded.forks,
                description = excluded.description
            """, (
                repo["name"],
                repo.get("link", ""),
                repo.get("description", ""),
                repo.get("stars", 0),
                repo.get("forks", 0),
                repo.get("language", ""),
                score,
                repo.get("date", "")
            ))
        conn.commit()
    finally:
        conn.close()
