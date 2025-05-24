# interview_agent.py
from fastapi import APIRouter
import openai

router = APIRouter()

openai.api_key = "YOUR_OPENAI_API_KEY"

job_description = ""  # should ideally be imported from a shared config

@router.post("/questions")
def generate_questions():
    prompt = f"""
    You are an AI HR assistant. Based on this job description:
    {job_description}

    Generate 5 role-specific, technical interview questions.
    """
    
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )

    questions = response.choices[0].message['content'].strip().split("\n")
    return {"questions": questions}