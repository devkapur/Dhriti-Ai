from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from app import database
from app.models.user import User
from app.utils import security

router = APIRouter(prefix="/auth", tags=["Auth"])


# ----------------------
# Pydantic Schemas
# ----------------------
class RegisterRequest(BaseModel):
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# ----------------------
# Routes
# ----------------------

@router.post("/register")
def register(request: RegisterRequest, db: Session = Depends(database.get_db)):
    """Register a new user with email and password"""
    user = db.query(User).filter(User.email == request.email).first()
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = security.hash_password(request.password)
    new_user = User(email=request.email, hashed_password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"msg": "User registered successfully", "id": new_user.id}


@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(database.get_db)):
    """Login user and return JWT token"""
    user = db.query(User).filter(User.email == request.email).first()
    if not user or not security.verify_password(request.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = security.create_access_token(data={"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}
