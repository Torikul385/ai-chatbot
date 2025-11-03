from db.schema import Chat 

async def save_chat(db, text: str, conv_id:str, is_me:bool): 
    
    new_conv = Chat(text=text, is_me=is_me, conv_id=conv_id)

    db.add(new_conv)
    db.commit()
    db.refresh(new_conv) 

    return new_conv