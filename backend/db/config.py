# app/core/config.py

import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DATABASE_URL: str = "postgresql+psycopg2://postgres:1234@localhost:5432/chatai"
    

settings = Settings()
