from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# PostgreSQL connection string (service name = db from docker-compose)
SQLALCHEMY_DATABASE_URL = "postgresql://Dhriti_ai:Dhriti_ai123@db:5432/Dhriti_ai_db"

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


def run_startup_migrations() -> None:
    """Apply lightweight schema adjustments so boot succeeds without manual SQL."""

    statements = [
        "ALTER TABLE projects ADD COLUMN IF NOT EXISTS description TEXT",
        "ALTER TABLE projects ADD COLUMN IF NOT EXISTS data_category VARCHAR(255)",
        "ALTER TABLE projects ADD COLUMN IF NOT EXISTS project_type VARCHAR(255)",
        "ALTER TABLE projects ADD COLUMN IF NOT EXISTS task_type VARCHAR(255)",
        "ALTER TABLE projects ADD COLUMN IF NOT EXISTS review_time_minutes INTEGER",
        "ALTER TABLE projects ADD COLUMN IF NOT EXISTS max_users_per_task INTEGER",
        "ALTER TABLE projects ADD COLUMN IF NOT EXISTS association VARCHAR(255)",
        "ALTER TABLE projects ADD COLUMN IF NOT EXISTS auto_submit_task BOOLEAN DEFAULT FALSE",
        "ALTER TABLE projects ADD COLUMN IF NOT EXISTS allow_reviewer_edit BOOLEAN DEFAULT TRUE",
        "ALTER TABLE projects ADD COLUMN IF NOT EXISTS allow_reviewer_push_back BOOLEAN DEFAULT TRUE",
        "ALTER TABLE projects ADD COLUMN IF NOT EXISTS allow_reviewer_feedback BOOLEAN DEFAULT TRUE",
        "ALTER TABLE projects ADD COLUMN IF NOT EXISTS reviewer_screen_mode VARCHAR(50) DEFAULT 'full'",
        "ALTER TABLE projects ADD COLUMN IF NOT EXISTS reviewer_guidelines TEXT",
    ]

    with engine.begin() as connection:
        for statement in statements:
            connection.execute(text(statement))
