from fastapi import FastAPI
from app.database import Base, engine
from app.routes import auth

app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"msg": "Accun AI Backend Running ✅"}

# Include auth routes
app.include_router(auth.router)
