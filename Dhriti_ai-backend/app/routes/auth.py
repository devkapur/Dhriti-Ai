from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import database
from app.models.user import User
from app.utils import security

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register")
def register(email: str, password: str, db: Session = Depends(database.get_db)):
    user = db.query(User).filter(User.email == email).first()
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pw = security.hash_password(password)
    new_user = User(email=email, hashed_password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"msg": "User registered", "id": new_user.id}

@router.post("/login")
def login(email: str, password: str, db: Session = Depends(database.get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user or not security.verify_password(password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    token = security.create_access_token(data={"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}
