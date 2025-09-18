from fastapi import FastAPI
from app.database import Base, engine
from app.routes import auth, protected
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS (React frontend ke liye)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # production me specific domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"msg": "Accun AI Backend Running ✅"}

app.include_router(auth.router)
app.include_router(protected.router)
