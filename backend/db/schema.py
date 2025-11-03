# app/models.py

from sqlalchemy import Column, String, DateTime, Boolean, ForeignKey, Text, func
from sqlalchemy.orm import relationship
from .db import Base
from uuid import uuid4

class User(Base):
    __tablename__ = "users"

    username = Column(String, primary_key=True, index=True)
    password = Column(String, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    dob = Column(DateTime, nullable=False)
    is_male = Column(Boolean, nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    convs = relationship("Conversation", back_populates="user", cascade="all, delete-orphan")


class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(String, primary_key=True, index=True)
    username = Column(String, ForeignKey("users.username"), nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    user = relationship("User", back_populates="convs")
    chats = relationship("Chat", back_populates="conv", cascade="all, delete-orphan")


class Chat(Base):
    __tablename__ = "chats"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid4()))
    text = Column(Text, nullable=False)
    is_me = Column(Boolean, default=True)
    conv_id = Column(String, ForeignKey("conversations.id"), nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    file_name = Column(Text, nullable=True) 

    conv = relationship("Conversation", back_populates="chats")
