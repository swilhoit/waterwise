#!/usr/bin/env python3
"""
AI Coding Team Orchestrator
Manages multiple Claude Code agents working on different tasks in parallel
"""

import asyncio
import json
import logging
import os
import subprocess
import sys
from dataclasses import dataclass, asdict
from datetime import datetime
from enum import Enum
from pathlib import Path
from typing import Dict, List, Optional
import shutil

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('orchestrator/logs/orchestrator.log'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)


class TaskStatus(Enum):
    """Status of a task"""
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"
    BLOCKED = "blocked"


class AgentStatus(Enum):
    """Status of an agent"""
    IDLE = "idle"
    WORKING = "working"
    COMPLETED = "completed"
    FAILED = "failed"


@dataclass
class Task:
    """Represents a coding task"""
    id: str
    name: str
    description: str
    prompt: str
    branch_name: str
    dependencies: List[str] = None
    status: TaskStatus = TaskStatus.PENDING
    agent_id: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    result: Optional[str] = None
    error: Optional[str] = None
    files_modified: List[str] = None

    def __post_init__(self):
        if self.dependencies is None:
            self.dependencies = []
        if self.files_modified is None:
            self.files_modified = []


@dataclass
class Agent:
    """Represents a Claude Code agent"""
    id: str
    name: str
    status: AgentStatus = AgentStatus.IDLE
    current_task: Optional[Task] = None
    tasks_completed: int = 0
    process: Optional[subprocess.Popen] = None
    workspace_dir: Optional[Path] = None


class TaskOrchestrator:
    """Orchestrates multiple Claude Code agents working on different tasks"""

    def __init__(self, project_root: Path, max_parallel_agents: int = 3):
        self.project_root = Path(project_root)
        self.max_parallel_agents = max_parallel_agents
        self.tasks: Dict[str, Task] = {}
        self.agents: Dict[str, Agent] = {}
        self.task_queue: List[str] = []
        self.completed_tasks: List[str] = []
        self.state_file = self.project_root / "orchestrator/state.json"

        logger.info(f"Initialized orchestrator for project: {project_root}")
        logger.info(f"Max parallel agents: {max_parallel_agents}")

    def add_task(self, task: Task):
        """Add a task to the orchestrator"""
        self.tasks[task.id] = task
        if task.status == TaskStatus.PENDING:
            self.task_queue.append(task.id)
        logger.info(f"Added task: {task.id} - {task.name}")

    def create_agent(self, agent_id: str, name: str) -> Agent:
        """Create a new agent"""
        agent = Agent(id=agent_id, name=name)
        self.agents[agent_id] = agent
        logger.info(f"Created agent: {agent_id} - {name}")
        return agent

    def can_start_task(self, task_id: str) -> bool:
        """Check if a task's dependencies are met"""
        task = self.tasks[task_id]

        # Check if all dependencies are completed
        for dep_id in task.dependencies:
            if dep_id not in self.completed_tasks:
                logger.debug(f"Task {task_id} blocked by dependency: {dep_id}")
                return False

        return True

    def get_available_agent(self) -> Optional[Agent]:
        """Get an idle agent or create a new one if under limit"""
        # First, check for idle agents
        for agent in self.agents.values():
            if agent.status == AgentStatus.IDLE:
                return agent

        # Create new agent if under limit
        if len(self.agents) < self.max_parallel_agents:
            agent_id = f"agent_{len(self.agents) + 1}"
            return self.create_agent(agent_id, f"Agent {len(self.agents) + 1}")

        return None

    async def execute_task_with_claude(self, agent: Agent, task: Task):
        """Execute a task using Claude Code"""
        logger.info(f"Agent {agent.id} starting task: {task.id}")

        try:
            # Update task and agent status
            task.status = TaskStatus.IN_PROGRESS
            task.agent_id = agent.id
            task.start_time = datetime.now()
            agent.status = AgentStatus.WORKING
            agent.current_task = task

            # Create a branch for this task
            branch_result = await self.run_git_command(
                ["git", "checkout", "-b", task.branch_name]
            )

            if branch_result.returncode != 0:
                # Branch might already exist, try to check it out
                await self.run_git_command(["git", "checkout", task.branch_name])

            # Execute Claude Code with the task prompt
            logger.info(f"Executing Claude Code for task {task.id}")

            # Prepare the Claude Code command
            # Note: This assumes you have claude-code CLI available
            claude_cmd = [
                "claude-code",
                "--prompt", task.prompt,
                "--auto-approve"  # Auto-approve tool executions
            ]

            # Run Claude Code
            result = await self.run_command(claude_cmd, timeout=1800)  # 30 min timeout

            if result.returncode == 0:
                # Task completed successfully
                task.status = TaskStatus.COMPLETED
                task.end_time = datetime.now()
                task.result = "Completed successfully"
                self.completed_tasks.append(task.id)
                agent.tasks_completed += 1
                logger.info(f"Task {task.id} completed successfully by agent {agent.id}")

                # Get modified files
                git_status = await self.run_git_command(["git", "status", "--short"])
                task.files_modified = git_status.stdout.strip().split('\n') if git_status.stdout else []

            else:
                task.status = TaskStatus.FAILED
                task.end_time = datetime.now()
                task.error = result.stderr or "Unknown error"
                logger.error(f"Task {task.id} failed: {task.error}")

        except Exception as e:
            task.status = TaskStatus.FAILED
            task.end_time = datetime.now()
            task.error = str(e)
            logger.exception(f"Exception during task {task.id}: {e}")

        finally:
            # Reset agent status
            agent.status = AgentStatus.IDLE
            agent.current_task = None
            self.save_state()

    async def run_command(self, cmd: List[str], timeout: int = 300) -> subprocess.CompletedProcess:
        """Run a command asynchronously"""
        logger.debug(f"Running command: {' '.join(cmd)}")

        process = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
            cwd=self.project_root
        )

        try:
            stdout, stderr = await asyncio.wait_for(
                process.communicate(),
                timeout=timeout
            )
            return subprocess.CompletedProcess(
                cmd, process.returncode, stdout.decode(), stderr.decode()
            )
        except asyncio.TimeoutError:
            process.kill()
            raise Exception(f"Command timed out after {timeout}s")

    async def run_git_command(self, cmd: List[str]) -> subprocess.CompletedProcess:
        """Run a git command"""
        return await self.run_command(cmd)

    async def orchestrate(self):
        """Main orchestration loop"""
        logger.info("Starting orchestration")

        while self.task_queue or any(a.status == AgentStatus.WORKING for a in self.agents.values()):
            # Start new tasks if agents are available
            tasks_to_start = []

            for task_id in list(self.task_queue):
                if not self.can_start_task(task_id):
                    continue

                agent = self.get_available_agent()
                if agent is None:
                    break

                task = self.tasks[task_id]
                self.task_queue.remove(task_id)
                tasks_to_start.append((agent, task))

            # Execute tasks in parallel
            if tasks_to_start:
                await asyncio.gather(*[
                    self.execute_task_with_claude(agent, task)
                    for agent, task in tasks_to_start
                ])

            # Short sleep to avoid busy waiting
            await asyncio.sleep(1)

        logger.info("Orchestration complete")
        self.print_summary()

    def save_state(self):
        """Save orchestrator state to file"""
        state = {
            "tasks": {
                task_id: {
                    **asdict(task),
                    "status": task.status.value,
                    "start_time": task.start_time.isoformat() if task.start_time else None,
                    "end_time": task.end_time.isoformat() if task.end_time else None
                }
                for task_id, task in self.tasks.items()
            },
            "agents": {
                agent_id: {
                    "id": agent.id,
                    "name": agent.name,
                    "status": agent.status.value,
                    "tasks_completed": agent.tasks_completed
                }
                for agent_id, agent in self.agents.items()
            },
            "completed_tasks": self.completed_tasks,
            "last_updated": datetime.now().isoformat()
        }

        self.state_file.parent.mkdir(parents=True, exist_ok=True)
        with open(self.state_file, 'w') as f:
            json.dump(state, f, indent=2)

        logger.debug("State saved")

    def load_state(self):
        """Load orchestrator state from file"""
        if not self.state_file.exists():
            logger.info("No saved state found")
            return

        with open(self.state_file, 'r') as f:
            state = json.load(f)

        # Restore tasks
        for task_id, task_data in state.get("tasks", {}).items():
            task_data["status"] = TaskStatus(task_data["status"])
            task_data["start_time"] = datetime.fromisoformat(task_data["start_time"]) if task_data["start_time"] else None
            task_data["end_time"] = datetime.fromisoformat(task_data["end_time"]) if task_data["end_time"] else None
            self.tasks[task_id] = Task(**task_data)

        self.completed_tasks = state.get("completed_tasks", [])
        logger.info(f"Loaded state: {len(self.tasks)} tasks, {len(self.completed_tasks)} completed")

    def print_summary(self):
        """Print a summary of all tasks"""
        print("\n" + "="*80)
        print("ORCHESTRATION SUMMARY")
        print("="*80)

        total_tasks = len(self.tasks)
        completed = len([t for t in self.tasks.values() if t.status == TaskStatus.COMPLETED])
        failed = len([t for t in self.tasks.values() if t.status == TaskStatus.FAILED])

        print(f"\nTotal Tasks: {total_tasks}")
        print(f"Completed: {completed}")
        print(f"Failed: {failed}")
        print(f"Success Rate: {(completed/total_tasks*100):.1f}%\n")

        print("Task Details:")
        print("-" * 80)
        for task in self.tasks.values():
            duration = ""
            if task.start_time and task.end_time:
                duration = f" ({(task.end_time - task.start_time).total_seconds():.0f}s)"

            print(f"[{task.status.value.upper()}] {task.id}: {task.name}{duration}")
            if task.error:
                print(f"  Error: {task.error}")
            if task.files_modified:
                print(f"  Files: {len(task.files_modified)} modified")

        print("="*80 + "\n")


async def main():
    """Main entry point"""
    # Example usage
    project_root = Path("/Volumes/LaCie/WEBDEV/greywater-website")
    orchestrator = TaskOrchestrator(project_root, max_parallel_agents=3)

    # Define tasks - example for the greywater project
    tasks = [
        Task(
            id="task-1",
            name="Create program jurisdiction link table",
            description="Create the missing program_jurisdiction_link table in BigQuery",
            prompt="""Create a BigQuery table called program_jurisdiction_link that links
            programs from the programs_master table to jurisdictions (states, counties, cities).
            The table should have columns for program_id and jurisdiction_id. Then create a
            script to populate it based on the program_id naming convention (e.g., CA_PROGRAM_NAME
            should link to CA_STATE).""",
            branch_name="feature/program-jurisdiction-link",
            dependencies=[]
        ),
        Task(
            id="task-2",
            name="Add program filtering to hierarchy API",
            description="Update hierarchy API to use program_jurisdiction_link for filtering",
            prompt="""Update the hierarchy API in app/api/greywater-directory/hierarchy/route.ts
            to use the program_jurisdiction_link table for filtering programs. Restore the
            has_programs and cities_with_programs fields to use actual data from the link table.""",
            branch_name="feature/hierarchy-program-filtering",
            dependencies=["task-1"]  # Depends on task-1 completing first
        ),
        Task(
            id="task-3",
            name="Optimize font loading",
            description="Fix font preloading warnings completely",
            prompt="""Investigate and fix the font preloading warning for the Inter font.
            Consider using next/font optimization techniques, adjusting the preload strategy,
            or implementing font subsetting to reduce the warning.""",
            branch_name="feature/font-optimization",
            dependencies=[]  # Can run in parallel
        )
    ]

    # Add tasks to orchestrator
    for task in tasks:
        orchestrator.add_task(task)

    # Run orchestration
    await orchestrator.orchestrate()


if __name__ == "__main__":
    asyncio.run(main())
