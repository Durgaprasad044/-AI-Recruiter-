# resume_screening.py
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from sentence_transformers import SentenceTransformer, util

router = APIRouter()

model = SentenceTransformer('all-MiniLM-L6-v2')

job_description = ""
candidate_resumes = []

class Resume(BaseModel):
    name: str
    content: str

class JDInput(BaseModel):
    jd_text: str

@router.post("/upload-jd")
def upload_jd(data: JDInput):
    global job_description
    job_description = data.jd_text
    return {"message": "Job description uploaded successfully."}

@router.post("/upload-resumes")
def upload_resumes(resumes: List[Resume]):
    global candidate_resumes
    candidate_resumes = resumes
    return {"message": f"{len(resumes)} resumes uploaded successfully."}

@router.get("/ranked")
def screen_resumes():
    if not job_description or not candidate_resumes:
        return {"error": "Missing job description or resumes"}

    jd_embedding = model.encode(job_description, convert_to_tensor=True)
    results = []

    for resume in candidate_resumes:
        resume_embedding = model.encode(resume.content, convert_to_tensor=True)
        score = util.cos_sim(jd_embedding, resume_embedding).item()
        results.append({"name": resume.name, "score": round(score, 4)})

    results.sort(key=lambda x: x['score'], reverse=True)
    return {"ranked_candidates": results}