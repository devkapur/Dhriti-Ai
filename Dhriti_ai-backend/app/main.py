from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine, run_startup_migrations
from app.routes import auth, dashboard, protected, tasks, users

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
run_startup_migrations()


@app.get("/")
def home():
    return {"msg": "Accun AI Backend Running ✅"}


app.include_router(auth.router)
app.include_router(dashboard.router)
app.include_router(protected.router)
app.include_router(tasks.router)
app.include_router(users.router)
