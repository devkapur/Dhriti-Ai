"""Seed sample projects, assignments, and reviews for dashboard testing."""
from datetime import datetime, timedelta

from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.project import Project, ProjectAssignment, TaskReview
from app.models.user import User
from app.utils.security import hash_password

SAMPLE_USER = {
    "email": "alice@example.com",
    "password": "password123",
    "role": "user",
}

SAMPLE_PROJECTS = [
    {
        "name": "BinPref_Prod_PortugueseBP2",
        "status": "Active",
        "default_avg_task_time_minutes": 30,
        "completed_tasks": 466,
        "pending_tasks": 0,
        "reviews": [
            {"rating": 4.8, "comment": "Consistent quality."},
            {"rating": 4.6, "comment": "Great attention to detail."},
        ],
    },
    {
        "name": "VisionTag_EN_v3",
        "status": "Paused",
        "default_avg_task_time_minutes": 12,
        "completed_tasks": 1220,
        "pending_tasks": 34,
        "reviews": [
            {"rating": 4.7, "comment": "Solid performance."},
        ],
    },
    {
        "name": "ASR_Hindi_Release",
        "status": "Active",
        "default_avg_task_time_minutes": 18,
        "completed_tasks": 809,
        "pending_tasks": 12,
        "reviews": [],
    },
]


def get_or_create_user(session: Session) -> User:
    user = session.query(User).filter(User.email == SAMPLE_USER["email"]).first()
    if user:
        return user

    user = User(
        email=SAMPLE_USER["email"],
        hashed_password=hash_password(SAMPLE_USER["password"]),
        role=SAMPLE_USER["role"],
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


def seed_projects(session: Session, user: User) -> None:
    existing_projects = {
        project.name: project for project in session.query(Project).all()
    }

    for index, project_data in enumerate(SAMPLE_PROJECTS):
        project = existing_projects.get(project_data["name"])
        if not project:
            project = Project(
                name=project_data["name"],
                status=project_data["status"],
                default_avg_task_time_minutes=project_data["default_avg_task_time_minutes"],
            )
            session.add(project)
            session.flush()

        assignment = (
            session.query(ProjectAssignment)
            .filter(
                ProjectAssignment.user_id == user.id,
                ProjectAssignment.project_id == project.id,
            )
            .first()
        )
        if not assignment:
            assignment = ProjectAssignment(
                user_id=user.id,
                project_id=project.id,
            )
            session.add(assignment)

        assignment.completed_tasks = project_data["completed_tasks"]
        assignment.pending_tasks = project_data["pending_tasks"]
        assignment.status = project_data["status"]
        assignment.avg_task_time_minutes = project_data["default_avg_task_time_minutes"]

        created_at_base = datetime.utcnow() - timedelta(days=7 - index * 2)
        for offset, review_data in enumerate(project_data["reviews"]):
            existing_review = (
                session.query(TaskReview)
                .filter(
                    TaskReview.user_id == user.id,
                    TaskReview.project_id == project.id,
                    TaskReview.comment == review_data.get("comment"),
                )
                .first()
            )
            if existing_review:
                continue

            review = TaskReview(
                user_id=user.id,
                project_id=project.id,
                rating=review_data["rating"],
                comment=review_data.get("comment"),
                created_at=created_at_base + timedelta(hours=offset * 6),
            )
            session.add(review)

    session.commit()


if __name__ == "__main__":
    session = SessionLocal()
    try:
        user = get_or_create_user(session)
        seed_projects(session, user)
        print("Seed complete. Login with:")
        print(f"  email: {SAMPLE_USER['email']}")
        print(f"  password: {SAMPLE_USER['password']}")
    finally:
        session.close()
