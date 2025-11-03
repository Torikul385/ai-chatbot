import os 
from ollama import Client 
from typing import Optional
import httpx
from dotenv import load_dotenv
from fastapi import  UploadFile


# Load variables from .env into environment
load_dotenv()
OLLAMA_API  = os.getenv("OLLAMA_API")
UPLOAD_DIR = os.getenv("UPLOAD_DIR")

async def chat(question: str, context: str): 
    try:
        client = Client(
        host='http://localhost:11434',
        headers={'x-some-header': 'some-value'}
        )

        if context == "": 
            prompt = question 
        else:
            prompt = f"Question: {question}\n\nUse the following context to answer the question: \n\n{context}"

        response = client.chat(model='gemma3:270m', messages=[
        {
            'role': 'user',
            'content': prompt,
        },
        ])

        reply = response.message.content

        return reply 
    except Exception as e: 
        print("Error: ================\n", e)
        return ""   
      