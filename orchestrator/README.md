# AI Coding Team Orchestrator

An intelligent orchestration system that manages multiple Claude Code agents working on different coding tasks in parallel.

## Overview

This orchestrator allows you to:
- Define multiple coding tasks with dependencies
- Execute tasks in parallel using multiple AI agents
- Track progress and status of all tasks
- Trigger orchestration remotely from anywhere (including your phone)
- Deploy to Google Cloud for 24/7 availability

## Architecture

```
┌─────────────────────────────────────────────────┐
│          Webhook API (FastAPI)                  │
│  - Remote triggering from phone/anywhere        │
│  - Status monitoring                            │
│  - Session management                           │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│         Task Orchestrator                       │
│  - Task queue management                        │
│  - Dependency resolution                        │
│  - Agent assignment                             │
│  - State persistence                            │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
        ┌─────────┴─────────┐
        │                   │
        ▼                   ▼
┌─────────────┐     ┌─────────────┐
│  Agent 1    │     │  Agent 2    │  ... Agent N
│ (Claude     │     │ (Claude     │
│  Code)      │     │  Code)      │
└─────────────┘     └─────────────┘
        │                   │
        ▼                   ▼
┌─────────────────────────────────────────────────┐
│         Project Repository (Git)                │
│  - Separate branches per task                  │
│  - Automatic commits and push                  │
└─────────────────────────────────────────────────┘
```

## Quick Start

### 1. Local Development

#### Install Dependencies

```bash
cd orchestrator
pip install -r requirements.txt
```

#### Define Your Tasks

Edit `tasks/tasks.json` to define your coding tasks:

```json
{
  "tasks": [
    {
      "id": "task-1",
      "name": "Add authentication",
      "description": "Implement user authentication with JWT",
      "prompt": "Add JWT-based authentication to the API...",
      "branch_name": "feature/auth",
      "dependencies": []
    }
  ]
}
```

#### Run Orchestrator Locally

```bash
python orchestrator.py
```

#### Start Webhook Server (for remote triggering)

```bash
python webhook_server.py
```

The server will start on `http://localhost:8000`

### 2. Deploy to Google Cloud

#### Prerequisites

- Google Cloud account
- gcloud CLI installed
- Docker installed (for local testing)

#### Deploy

```bash
chmod +x deploy-gcloud.sh
./deploy-gcloud.sh
```

This will:
1. Build a Docker container with your orchestrator
2. Deploy to Google Cloud Run
3. Provide you with a URL and auth token

#### Test Deployment

```bash
# Health check
curl https://your-service-url.run.app/health

# Start orchestration
curl -X POST https://your-service-url.run.app/api/quick-start \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN"

# Check status
curl https://your-service-url.run.app/api/status/session_20250115_120000
```

## API Endpoints

### POST /api/orchestrate

Start a new orchestration session with custom tasks.

**Request:**
```json
{
  "use_task_file": true,
  "max_parallel_agents": 3
}
```

**Response:**
```json
{
  "session_id": "session_20250115_120000",
  "status": "started",
  "total_tasks": 5,
  "message": "Orchestration started successfully"
}
```

### POST /api/quick-start

Quick start with default tasks from `tasks/tasks.json`.

**curl example:**
```bash
curl -X POST https://your-url/api/quick-start \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### GET /api/status/{session_id}

Get status of an orchestration session.

**Response:**
```json
{
  "session_id": "session_20250115_120000",
  "status": "running",
  "total_tasks": 5,
  "completed_tasks": 2,
  "failed_tasks": 0,
  "in_progress_tasks": 2,
  "tasks": [...]
}
```

### GET /api/sessions

List all orchestration sessions.

### GET /health

Health check endpoint.

## Task Definition

Tasks are defined with the following structure:

```json
{
  "id": "unique-task-id",
  "name": "Human-readable name",
  "description": "Detailed description",
  "prompt": "Detailed instructions for Claude Code",
  "branch_name": "git-branch-name",
  "dependencies": ["task-1", "task-2"]
}
```

### Task Dependencies

Tasks can depend on other tasks. The orchestrator will:
1. Wait for all dependencies to complete before starting a task
2. Execute independent tasks in parallel
3. Respect the dependency graph

Example:
```json
{
  "tasks": [
    {
      "id": "task-1",
      "name": "Create database schema",
      "dependencies": []
    },
    {
      "id": "task-2",
      "name": "Add API endpoints",
      "dependencies": ["task-1"]
    },
    {
      "id": "task-3",
      "name": "Add frontend components",
      "dependencies": []
    }
  ]
}
```

In this example:
- `task-1` and `task-3` run in parallel
- `task-2` waits for `task-1` to complete

## Mobile Usage

Save this shortcut on your phone for quick access:

### iOS Shortcuts

1. Open Shortcuts app
2. Create new shortcut
3. Add "Get Contents of URL" action
4. URL: `https://your-service.run.app/api/quick-start`
5. Method: POST
6. Headers: `Authorization: Bearer YOUR_TOKEN`

### Android (Tasker or similar)

Create a task that sends an HTTP POST to your webhook URL.

## Configuration

### Environment Variables

- `ORCHESTRATOR_AUTH_TOKEN`: Authentication token for API access
- `PORT`: Server port (default: 8000)
- `GOOGLE_CLOUD_PROJECT_ID`: Your GCP project ID
- `MAX_PARALLEL_AGENTS`: Maximum concurrent agents (default: 3)

### Authentication

Set a secure token:

```bash
export ORCHESTRATOR_AUTH_TOKEN=$(openssl rand -hex 32)
```

## Monitoring

### View Logs (Google Cloud)

```bash
gcloud run logs read ai-orchestrator --region us-central1
```

### Local Logs

Logs are written to `orchestrator/logs/orchestrator.log`

### State Persistence

The orchestrator saves its state to `orchestrator/state.json` after each task completion. This allows you to:
- Resume after crashes
- Track historical runs
- Debug issues

## Best Practices

1. **Task Sizing**: Keep tasks focused and single-purpose
2. **Dependencies**: Only add necessary dependencies to maximize parallelism
3. **Prompts**: Write clear, detailed prompts for Claude Code
4. **Branches**: Use descriptive branch names
5. **Monitoring**: Check status regularly for long-running orchestrations

## Troubleshooting

### Agent Timeouts

If tasks are timing out, increase the timeout in `orchestrator.py`:

```python
result = await self.run_command(claude_cmd, timeout=3600)  # 1 hour
```

### Memory Issues

Increase Cloud Run memory:

```bash
gcloud run services update ai-orchestrator \
  --memory 4Gi \
  --region us-central1
```

### Authentication Errors

Verify your token is correct:

```bash
echo $ORCHESTRATOR_AUTH_TOKEN
```

## Advanced Usage

### Custom Orchestrator Logic

Extend the `TaskOrchestrator` class to add custom logic:

```python
class CustomOrchestrator(TaskOrchestrator):
    async def before_task(self, task):
        # Custom logic before task execution
        pass

    async def after_task(self, task):
        # Custom logic after task completion
        pass
```

### Multiple Projects

Run separate orchestrators for different projects:

```python
orchestrator1 = TaskOrchestrator("/path/to/project1")
orchestrator2 = TaskOrchestrator("/path/to/project2")

await asyncio.gather(
    orchestrator1.orchestrate(),
    orchestrator2.orchestrate()
)
```

## Security Considerations

1. **Token Security**: Never commit auth tokens to git
2. **HTTPS Only**: Always use HTTPS in production
3. **Rate Limiting**: Add rate limiting for public endpoints
4. **IP Whitelisting**: Consider IP restrictions for webhook access
5. **Secret Management**: Use Google Secret Manager for production

## Cost Optimization

- Set `min-instances 0` to scale to zero when not in use
- Use smaller memory allocations when possible
- Monitor Cloud Run usage in GCP Console
- Consider using Cloud Scheduler for regular orchestrations

## Contributing

To add new features:

1. Fork the repository
2. Create a feature branch
3. Test locally
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- GitHub Issues: https://github.com/your-org/ai-orchestrator/issues
- Documentation: https://docs.your-domain.com

---

**Happy Orchestrating! 🤖🚀**
