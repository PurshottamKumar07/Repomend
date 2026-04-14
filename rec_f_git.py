from dotenv import load_dotenv
from os import getenv
from pydantic import BaseModel
import requests

load_dotenv()

GITHUB_TOKEN=getenv('GITHUB_KEY')

def search_repo(query, per_page=10):
    url= "https://api.github.com/search/repositories"

    headers={
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Accept": "application/vnd.github+json"
    }

    params={
        "q": query,
        "sort": "help-wanted-issues",
        "order": "desc",
        "per_page": per_page
    }

    response = requests.get(url , headers=headers , params=params)

    if response.status_code != 200:
        raise Exception(f"Error:{response.status_code}-{response.text}")
    
    data=response.json()

    repo_data=[]

    for repo in data["items"]:
        repo_data.append({
            "name": repo["name"],
            "link":repo["html_url"],
            "description": repo["description"],
            "topics": repo.get("topics",[]),
            "date": repo["created_at"],
            "language":repo["language"],
            "stars": repo["stargazers_count"],
            "forks": repo["forks_count"]
        })
    
    return repo_data
