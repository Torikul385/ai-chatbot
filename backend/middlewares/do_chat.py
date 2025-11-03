from typing import Optional 
from assets.fileupload import fileUpload
from db.save_chat import save_chat
from fastapi import  UploadFile 
from bot.mypc import get_context
from bot.mypc import add_vector
from middlewares.chat import chat as make_chat
from db.schema import Chat 

async def do_chat(db, conv_id:str, text:str, username:str,  file: Optional[UploadFile] = None):
    
    contents = "" 
    if file: 
        contents = await fileUpload(file) 


    await save_chat(db, text, conv_id, is_me=True)
    if  contents != "": 
        await add_vector(texts=contents, username=username, conv_id=conv_id)
        
    context = await get_context(text, conv_id, username)
    # chats =  db.query(Chat).filter(Chat.conv_id == conv_id).order_by(Chat.created_at).limit(6)
    # serialized_chats = [
    #     {
    #         "id": chat.id,
    #         "text": chat.text,
    #         "is_me": chat.is_me,
    #         "conv_id": chat.conv_id,
    #         "created_at": chat.created_at.isoformat() if chat.created_at else None,
    #         "file_name": chat.file_name,
    #     }
    #     for chat in chats
    # ]
    
    # our_chats = "\n\nOur Last Chats: \n"
    # for chat in serialized_chats: 
    #     if chat.get("is_me"): 
    #         our_chats += f"Me: {chat.get("text")}"
    #     else:
    #         our_chats += f"You: {chat.get("text")}"
    context = context 
    reply = await make_chat(text, context) 
    await save_chat(db, reply, conv_id, is_me=False)

    return reply 
