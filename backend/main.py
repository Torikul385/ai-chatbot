from typing import Union, Optional
from middlewares.chat import chat 
import os
from fastapi import Depends, FastAPI, File, UploadFile, Form, Request  # type: ignore
from pydantic import BaseModel 
from fastapi.middleware.cors import CORSMiddleware 
from db.db import get_db, Base, engine
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse 
import json 
from db.config import Settings
import db.schema as schema 
from middlewares.start_conv import start_conv
from db.schema import Chat 
# middlewares 
from middlewares.signup import signup
from middlewares.do_chat import do_chat
from db.schema import User 
from middlewares.make_login import make_login
from middlewares.get_conv import get_conversations
app = FastAPI()

UPLOAD_DIR = os.getenv("UPLOAD_DIR")
os.makedirs(UPLOAD_DIR, exist_ok=True)
#Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],        
)


@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/conv")
async def conv(username: str = Form(...), text: str = Form(...) ,  file: Optional[UploadFile] = File(None), db: Session = Depends(get_db) ):
    conv_id  = await start_conv(db, username, text, file )

    return {
       "conv_id": conv_id 
    }



@app.post("/signup") 
async def make_signup(request: Request, db: Session = Depends(get_db)): 
    
    form = await request.form() 
    return await  signup(form, db)

@app.post("/login")
async def login(username: str = Form(...), password: str = Form(...),db: Session = Depends(get_db)):
    return await make_login(username, password, db) 

@app.post("/get_conv")
async def get_conv(username:str = Form(...), db: Session = Depends(get_db)): 
    return await get_conversations(username, db)


@app.post("/get_messages") 
async def get_messages(conv_id: str = Form(...), db: Session = Depends(get_db)): 
   
    chats =  db.query(Chat).filter(Chat.conv_id == conv_id).order_by(Chat.created_at) 
    serialized_chats = [
        {
            "id": chat.id,
            "text": chat.text,
            "is_me": chat.is_me,
            "conv_id": chat.conv_id,
            "created_at": chat.created_at.isoformat() if chat.created_at else None,
            "file_name": chat.file_name,
        }
        for chat in chats
    ]
    
    return {
        "chats": serialized_chats
    } 


@app.post("/chat")
async def chat(conv_id: str = Form(...), text: str = Form(...), username: str = Form(...) ,  file: Optional[UploadFile] = File(None), db: Session = Depends(get_db) ):
    reply = await do_chat(db, conv_id, text, username, file)
    
    return {
        "reply": reply 
    } 