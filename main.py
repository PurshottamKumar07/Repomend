from fastapi import FastAPI , HTTPException
from ingest import ingest_data
from models import create_tables
from dotenv import load_dotenv
from os import getenv
from pydantic import BaseModel

class Projects(BaseModel):
    id : int
    p_name: str
    link: str
    name: str
    description: str
    topics: list


load_dotenv()

git_api=getenv("GITHUB_TOKEN")

app=FastAPI()

# Create DB tables on startup
create_tables()

@app.get("/ingest")
def ingest():
    try:
        ingest_data()
        return {"message": "Data ingested successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def read_root():
    return {"message": "Hello everynyan"}


@app.get("/projects")
def product_list():
    return project


@app.get("/product/{id}")
def get_a_single_product(id:int):
    for product in project:
        if product.id==id:
            return product
    raise HTTPException(status_code=404,detail="Product not found!")