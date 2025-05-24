# messaging_agent.py
from fastapi import APIRouter
from pydantic import BaseModel
import openai

router = APIRouter()

openai.api_key = "YOUR_OPENAI_API_KEY"

class EmailInput(BaseModel):
    candidate_name: str
    status: str  # 'invite' or 'reject'
    job_title: str

@router.post("/email")
def generate_email(data: EmailInput):
    if data.status == 'invite':
        prompt = f"Draft a polite interview invitation email to {data.candidate_name} for the role of {data.job_title}."
    else:
        prompt = f"Draft a professional rejection email to {data.candidate_name} for the role of {data.job_title}."

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )

    email_text = response.choices[0].message['content']
    return {"email": email_text}