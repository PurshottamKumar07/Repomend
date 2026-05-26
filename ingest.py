from db import get_conn
from rec_f_git import search_repo
from ml_tool import process_list_with_prompt

cur_pref = {}

def reval_pref(cur_pref, pref):
    for i, j in pref.items():
        cur_pref[i] = cur_pref.get(i, 20) + j
    return cur_pref
    
def calculate_score(repo, pref):
    score = 0

    # star / fork scoring
    score += repo.get("stars", 0) * 0.02
    score += repo.get("forks", 0) * 0.03

    # keyword scoring
    description = (repo.get("description") or "").lower()
    for keyword, value in pref.items():
        if keyword in description:
            score += value
    return score

def ingest_data(pref):
    reval_pref(cur_pref, pref)
    
    repp = process_list_with_prompt(cur_pref)
    
    if not isinstance(repp, list):
        print(f"Error: process_list_with_prompt returned non-list: {repp}")
        return

    conn = get_conn()
    try:
        cursor = conn.cursor()
        for rep in repp:
            try:
                repo_list = search_repo(rep, per_page=10)
            except Exception as e:
                print(f"Error searching for topic '{rep}': {e}")
                continue
                
            for repo in repo_list:
                score = calculate_score(repo, cur_pref)

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