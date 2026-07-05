from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from backend.models import Question
from backend.rag import process_pdf, ask_question

app = FastAPI(title="Chat with PDF API")

# Allow the React frontend to access this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Chat with PDF API is running"
    }


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    """
    Upload a PDF and create embeddings.
    """
    result = await process_pdf(file)
    return result


@app.post("/ask")
def ask(question: Question):
    """
    Ask a question about the uploaded PDF.
    """
    answer = ask_question(question.question)

    return {
        "answer": answer
    }