from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


class AssignedProject(BaseModel):
    assignment_id: int
    project_id: int
    project_name: str
    avg_task_time_minutes: Optional[int]
    avg_task_time_label: Optional[str]
    rating: Optional[float]
    completed_tasks: int
    pending_tasks: int
    status: str

    class Config:
        orm_mode = True


class TaskReviewSummary(BaseModel):
    id: int
    project_id: int
    project_name: str
    rating: float
    comment: Optional[str]
    created_at: datetime

    class Config:
        orm_mode = True


class TasksStats(BaseModel):
    assigned_projects: int
    tasks_completed: int
    tasks_pending: int
    avg_rating: Optional[float]


class TasksDashboardResponse(BaseModel):
    stats: TasksStats
    assignments: List[AssignedProject]
    recent_reviews: List[TaskReviewSummary]


class ProjectCreate(BaseModel):
    name: str = Field(min_length=3)
    status: str = Field(default="Active", min_length=1)
    default_avg_task_time_minutes: Optional[int] = Field(default=None, ge=1)


class ProjectResponse(BaseModel):
    id: int
    name: str
    status: str
    default_avg_task_time_minutes: Optional[int]

    class Config:
        orm_mode = True


class ProjectAssignmentRequest(BaseModel):
    user_id: int
    project_id: int
    status: Optional[str] = None
    avg_task_time_minutes: Optional[int] = Field(default=None, ge=1)
    completed_tasks: Optional[int] = Field(default=None, ge=0)
    pending_tasks: Optional[int] = Field(default=None, ge=0)


class ProjectAssignmentResponse(BaseModel):
    assignment_id: int
    user_id: int
    project_id: int
    status: str
    avg_task_time_minutes: Optional[int]
    completed_tasks: int
    pending_tasks: int


class UserSummary(BaseModel):
    id: int
    email: str
    role: str
    name: Optional[str] = None
    phone: Optional[str] = None
    status: Optional[str] = None

    class Config:
        orm_mode = True
