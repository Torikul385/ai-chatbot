from fastapi.responses import JSONResponse 

from sqlalchemy.orm import Session
from db.schema import User



async def make_login(username: str, password: str, db : Session):

    user = db.query(User).filter(User.username == username).first()
    if not user:
        return {
            "flag": False
        }

    if user.password != password:
        return {
            "flag": False
        }
    return {
        "flag": True,
        "username": user.username,
        
    }