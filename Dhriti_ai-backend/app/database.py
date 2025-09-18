from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# PostgreSQL connection string (service name = db from docker-compose)
SQLALCHEMY_DATABASE_URL = "postgresql://accunai:accunai123@db:5432/accunai_db"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Yeh Base ko export karega jise models aur main.py use karenge
Base = declarative_base()

# Dependency: get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
