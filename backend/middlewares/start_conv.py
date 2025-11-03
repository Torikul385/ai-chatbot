from fastapi import  UploadFile 
from typing import Optional 
from assets.fileupload import fileUpload
from bot.mypc import add_vector
from uuid import uuid4 as uid 
from middlewares.chat import  chat 
from bot.mypc import get_context
from db.schema import Conversation
from db.save_chat import save_chat

async def make_conv(username: str, conv_id: str , db): 

    new_conv = Conversation(id=conv_id, username=username)

    db.add(new_conv)
    db.commit()
    db.refresh(new_conv) 


async def start_conv(db, username, text, file: Optional[UploadFile] = None):
    contents = "" 
    if file: 
        contents = await fileUpload(file) 
    conv_id = str(uid()) 
    await make_conv(username, conv_id, db)
    
    await save_chat(db, text, conv_id, is_me=True)
    if  contents != "": 
        await add_vector(texts=contents, username=username, conv_id=conv_id)
        
    context = await get_context(text, conv_id, username)
    reply = await chat(text, context) 
    await save_chat(db, reply, conv_id, is_me=False)

    return conv_id
