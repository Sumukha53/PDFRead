import os
import shutil

import chromadb
from dotenv import load_dotenv
from fastapi import UploadFile
import google.generativeai as genai
from pypdf import PdfReader
from sentence_transformers import SentenceTransformer

# ============================
# Load Environment Variables
# ============================

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=api_key)

googleModel = genai.GenerativeModel("gemini-2.5-flash")

# ============================
# Load Embedding Model
# ============================

model = SentenceTransformer("all-MiniLM-L6-v2")

# ============================
# ChromaDB
# ============================

client = chromadb.PersistentClient(path="./chroma_db")

collection_name = "pdf_collection"

try:
    collection = client.get_collection(collection_name)
except:
    collection = client.create_collection(collection_name)

# ============================
# Upload PDF
# ============================

async def process_pdf(file: UploadFile):

    os.makedirs("uploads", exist_ok=True)

    file_path = f"uploads/{file.filename}"

    # Save uploaded file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Read PDF
    reader = PdfReader(file_path)

    pdf_text = ""

    for page in reader.pages:
        text = page.extract_text()
        if text:
            pdf_text += text

    # Create chunks
    chunk_size = 200

    chunks = []

    for i in range(0, len(pdf_text), chunk_size):
        chunks.append(pdf_text[i:i + chunk_size])

    # Create embeddings
    embeddings = model.encode(chunks)

    # Delete previous collection
    try:
        client.delete_collection(collection_name)
    except:
        pass

    global collection

    collection = client.create_collection(collection_name)

    collection.add(
        documents=chunks,
        embeddings=embeddings.tolist(),
        ids=[str(i) for i in range(len(chunks))]
    )

    return {
        "message": "PDF uploaded successfully"
    }

# ============================
# Ask Question
# ============================

def ask_question(question: str):

    query_embedding = model.encode([question])

    results = collection.query(
        query_embeddings=query_embedding.tolist(),
        n_results=1
    )

    context = results["documents"][0][0]

    prompt = f"""
You are a helpful assistant.

Answer the question using ONLY the provided context.
If the answer is not present in the context, reply:
"I couldn't find the answer in the uploaded PDF."

Context:
{context}

Question:
{question}
"""

    response = googleModel.generate_content(prompt)

    return response.text