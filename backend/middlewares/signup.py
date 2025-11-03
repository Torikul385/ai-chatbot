from fastapi.responses import JSONResponse 
import json 
from datetime import date 
from pydantic import BaseModel, EmailStr, Field 
from sqlalchemy.orm import Session
from db.schema import User


class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=20)
    password: str = Field(..., min_length=4, max_length=255) 
    name: str
    email: EmailStr
    dob: date 
    is_male: bool

async def signup(form, db : Session):
    raw_data = form.get("data") 
    if not raw_data: 
        return JSONResponse({
            "error": "Missing data field"

        }, status_code = 400) 
    
    try:
        data = json.loads(raw_data) 
        data = UserCreate(**data) 
        #data = data.model_dump_json()
    except: 
        return JSONResponse({
            "error": "Invalid JSON data field"
        }, status_code = 400) 
    
    
    new_user = User(
    username=data.username,
    password=data.password,  # ideally hash the password before saving
    name=data.name,
    email=data.email,
    dob=data.dob,
    is_male=data.is_male
    )

    # Add to DB
    db.add(new_user)
    db.commit()
    db.refresh(new_user) 
    

    return JSONResponse({
        "message": "User created successfully!"
    }, 
    status_code = 200)