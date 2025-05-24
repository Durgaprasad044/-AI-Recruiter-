# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from resume_screening import router as screening_router
from interview_agent import router as interview_router
from messaging_agent import router as messaging_router

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(screening_router, prefix="/screen")
app.include_router(interview_router, prefix="/interview")
app.include_router(messaging_router, prefix="/message")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)