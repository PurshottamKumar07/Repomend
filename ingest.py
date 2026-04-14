from db import get_conn
from rec_f_git import search_repo

LANGUAGE_SCORES = {
    "Python": 1,
    "Java": -1,
    "JavaScript": 0.5
}

KEYWORD_SCORES = {
    "machine learning": 2,
    "ml": 2,
    "ai": 2,
    "backend": 1,
    "frontend": -0.5
}


def calculate_score(repo):
    score = 0

    # star / fork scoring
    score += repo.get("stars", 0) * 0.01
    score += repo.get("forks", 0) * 0.02

    # language scoring
    lang = repo.get("language")
    score += LANGUAGE_SCORES.get(lang, 0)

    # keyword scoring
    description = (repo.get("description") or "").lower()
    for keyword, value in KEYWORD_SCORES.items():
        if keyword in description:
            score += value

    return score


def ingest_data():
    repo_list = search_repo("starlette", per_page=10)

    conn = get_conn()
    cursor = conn.cursor()

    for repo in repo_list:
        score = calculate_score(repo)

        cursor.execute("""
        INSERT INTO projects (repo_name, description, stars, forks, language, score, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            repo["name"],
            repo.get("description", ""),
            repo.get("stars", 0),
            repo.get("forks", 0),
            repo.get("language", ""),
            score,
            repo.get("date", "")
        ))

    conn.commit()
    conn.close()