#!/usr/bin/env python3
"""
Webhook Server for Remote Orchestrator Triggering
Allows triggering the orchestrator from anywhere (e.g., your phone)
"""

from fastapi import FastAPI, HTTPException, BackgroundTasks, Header
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
import asyncio
import json
import logging
import os
from pathlib import Path
from datetime import datetime
import uvicorn

from orchestrator import TaskOrchestrator, Task, TaskStatus

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="AI Coding Team Orchestrator API")

# Simple authentication token (use environment variable in production)
AUTH_TOKEN = os.getenv("ORCHESTRATOR_AUTH_TOKEN", "your-secret-token-here")

# Store active orchestration sessions
active_sessions = {}


class TaskRequest(BaseModel):
    """Request model for creating a task"""
    id: str
    name: str
    description: str
    prompt: str
    branch_name: str
    dependencies: List[str] = []


class OrchestrationRequest(BaseModel):
    """Request model for starting orchestration"""
    tasks: Optional[List[TaskRequest]] = None
    use_task_file: bool = False
    task_file: str = "orchestrator/tasks/tasks.json"
    max_parallel_agents: int = 3


class StatusResponse(BaseModel):
    """Response model for orchestration status"""
    session_id: str
    status: str
    total_tasks: int
    completed_tasks: int
    failed_tasks: int
    in_progress_tasks: int
    tasks: List[dict]


def verify_token(authorization: str = Header(None)):
    """Verify the authentication token"""
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization header")

    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header format")

    token = authorization.replace("Bearer ", "")
    if token != AUTH_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid token")


async def run_orchestration(session_id: str, orchestrator: TaskOrchestrator):
    """Run the orchestration in the background"""
    try:
        logger.info(f"Starting orchestration session: {session_id}")
        active_sessions[session_id]["status"] = "running"
        await orchestrator.orchestrate()
        active_sessions[session_id]["status"] = "completed"
        logger.info(f"Completed orchestration session: {session_id}")
    except Exception as e:
        logger.exception(f"Error in orchestration session {session_id}: {e}")
        active_sessions[session_id]["status"] = "failed"
        active_sessions[session_id]["error"] = str(e)


@app.post("/api/orchestrate", dependencies=[verify_token])
async def start_orchestration(
    request: OrchestrationRequest,
    background_tasks: BackgroundTasks
):
    """
    Start a new orchestration session

    Example curl command:
    ```
    curl -X POST http://localhost:8000/api/orchestrate \
      -H "Authorization: Bearer your-secret-token-here" \
      -H "Content-Type: application/json" \
      -d '{
        "use_task_file": true,
        "max_parallel_agents": 3
      }'
    ```
    """
    # Create session ID
    session_id = f"session_{datetime.now().strftime('%Y%m%d_%H%M%S')}"

    # Initialize orchestrator
    project_root = Path("/Volumes/LaCie/WEBDEV/greywater-website")
    orchestrator = TaskOrchestrator(
        project_root=project_root,
        max_parallel_agents=request.max_parallel_agents
    )

    # Load tasks from file or request
    if request.use_task_file:
        task_file_path = project_root / request.task_file
        if not task_file_path.exists():
            raise HTTPException(status_code=404, detail=f"Task file not found: {request.task_file}")

        with open(task_file_path, 'r') as f:
            task_data = json.load(f)

        for task_dict in task_data.get("tasks", []):
            task = Task(**task_dict)
            orchestrator.add_task(task)

    elif request.tasks:
        for task_req in request.tasks:
            task = Task(**task_req.dict())
            orchestrator.add_task(task)
    else:
        raise HTTPException(status_code=400, detail="Either tasks or use_task_file must be provided")

    # Store session
    active_sessions[session_id] = {
        "orchestrator": orchestrator,
        "status": "initializing",
        "started_at": datetime.now().isoformat()
    }

    # Start orchestration in background
    background_tasks.add_task(run_orchestration, session_id, orchestrator)

    return {
        "session_id": session_id,
        "status": "started",
        "total_tasks": len(orchestrator.tasks),
        "message": "Orchestration started successfully"
    }


@app.get("/api/status/{session_id}")
async def get_status(session_id: str):
    """
    Get the status of an orchestration session

    Example curl command:
    ```
    curl http://localhost:8000/api/status/session_20250115_120000
    ```
    """
    if session_id not in active_sessions:
        raise HTTPException(status_code=404, detail="Session not found")

    session = active_sessions[session_id]
    orchestrator = session["orchestrator"]

    tasks_info = []
    for task in orchestrator.tasks.values():
        tasks_info.append({
            "id": task.id,
            "name": task.name,
            "status": task.status.value,
            "agent_id": task.agent_id,
            "files_modified": len(task.files_modified) if task.files_modified else 0,
            "error": task.error
        })

    completed = len([t for t in orchestrator.tasks.values() if t.status == TaskStatus.COMPLETED])
    failed = len([t for t in orchestrator.tasks.values() if t.status == TaskStatus.FAILED])
    in_progress = len([t for t in orchestrator.tasks.values() if t.status == TaskStatus.IN_PROGRESS])

    return StatusResponse(
        session_id=session_id,
        status=session["status"],
        total_tasks=len(orchestrator.tasks),
        completed_tasks=completed,
        failed_tasks=failed,
        in_progress_tasks=in_progress,
        tasks=tasks_info
    )


@app.get("/api/sessions")
async def list_sessions():
    """
    List all orchestration sessions

    Example curl command:
    ```
    curl http://localhost:8000/api/sessions
    ```
    """
    sessions = []
    for session_id, session_data in active_sessions.items():
        orchestrator = session_data["orchestrator"]
        completed = len([t for t in orchestrator.tasks.values() if t.status == TaskStatus.COMPLETED])

        sessions.append({
            "session_id": session_id,
            "status": session_data["status"],
            "started_at": session_data["started_at"],
            "total_tasks": len(orchestrator.tasks),
            "completed_tasks": completed
        })

    return {"sessions": sessions}


@app.post("/api/quick-start", dependencies=[verify_token])
async def quick_start(background_tasks: BackgroundTasks):
    """
    Quick start orchestration with default tasks

    Example curl command (from phone):
    ```
    curl -X POST https://your-domain.com/api/quick-start \
      -H "Authorization: Bearer your-secret-token-here"
    ```
    """
    return await start_orchestration(
        OrchestrationRequest(
            use_task_file=True,
            max_parallel_agents=3
        ),
        background_tasks
    )


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}


if __name__ == "__main__":
    # Run the server
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(
        "webhook_server:app",
        host="0.0.0.0",
        port=port,
        reload=False
    )
