# Quick Start Guide - AI Coding Team Orchestrator

Get up and running in 5 minutes!

## Option 1: Local Testing (Fastest)

### Step 1: Install Dependencies

```bash
cd orchestrator
pip install -r requirements.txt
```

### Step 2: Set Your Auth Token

```bash
export ORCHESTRATOR_AUTH_TOKEN="my-secret-token"
```

### Step 3: Start the Webhook Server

```bash
python webhook_server.py
```

Server starts at `http://localhost:8000`

### Step 4: Trigger from Another Terminal

```bash
# Quick start with default tasks
curl -X POST http://localhost:8000/api/quick-start \
  -H "Authorization: Bearer my-secret-token"

# You'll get a session ID back
# {"session_id": "session_20250115_120000", ...}
```

### Step 5: Monitor Progress

```bash
# Check status (replace with your session ID)
curl http://localhost:8000/api/status/session_20250115_120000
```

## Option 2: Docker (Recommended)

### Step 1: Build and Run

```bash
cd orchestrator
docker-compose up -d
```

### Step 2: Trigger Orchestration

```bash
curl -X POST http://localhost:8000/api/quick-start \
  -H "Authorization: Bearer dev-token-change-me"
```

### Step 3: View Logs

```bash
docker-compose logs -f orchestrator
```

## Option 3: Deploy to Google Cloud (Production)

### Step 1: Make Deploy Script Executable

```bash
chmod +x deploy-gcloud.sh
```

### Step 2: Deploy

```bash
./deploy-gcloud.sh
```

The script will output:
- Your service URL
- Your authentication token (save this!)

### Step 3: Trigger from Your Phone

Use any HTTP client app on your phone (or create an iOS Shortcut):

```
POST https://your-service.run.app/api/quick-start
Header: Authorization: Bearer YOUR_TOKEN
```

## Creating Your Own Tasks

Edit `tasks/tasks.json`:

```json
{
  "tasks": [
    {
      "id": "my-task-1",
      "name": "My First Task",
      "description": "What this task does",
      "prompt": "Detailed instructions for Claude Code. Be specific!",
      "branch_name": "feature/my-task-1",
      "dependencies": []
    }
  ]
}
```

### Task Writing Tips

**Good Prompt:**
```
"Create a new API endpoint at /api/users that:
1. Accepts POST requests with name and email
2. Validates the input (email must be valid format)
3. Saves to the database
4. Returns the created user with a 201 status
5. Add error handling for duplicate emails
6. Write unit tests using Jest"
```

**Bad Prompt:**
```
"Make a user endpoint"
```

## Advanced: Custom Tasks via API

```bash
curl -X POST http://localhost:8000/api/orchestrate \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "max_parallel_agents": 2,
    "tasks": [
      {
        "id": "custom-1",
        "name": "Custom Task",
        "description": "On-the-fly task",
        "prompt": "Your detailed instructions...",
        "branch_name": "feature/custom-1",
        "dependencies": []
      }
    ]
  }'
```

## Monitoring

### Check All Sessions

```bash
curl http://localhost:8000/api/sessions
```

### Get Detailed Status

```bash
curl http://localhost:8000/api/status/SESSION_ID | jq
```

Example response:
```json
{
  "session_id": "session_20250115_120000",
  "status": "running",
  "total_tasks": 3,
  "completed_tasks": 1,
  "failed_tasks": 0,
  "in_progress_tasks": 2,
  "tasks": [
    {
      "id": "task-1",
      "name": "Create program jurisdiction link table",
      "status": "completed",
      "agent_id": "agent_1",
      "files_modified": 3
    },
    {
      "id": "task-2",
      "name": "Add program filtering",
      "status": "in_progress",
      "agent_id": "agent_2"
    }
  ]
}
```

## Troubleshooting

### Server Won't Start

Check if port 8000 is in use:
```bash
lsof -i :8000
# Kill the process if needed
kill -9 <PID>
```

### Authentication Errors

Make sure your token matches:
```bash
echo $ORCHESTRATOR_AUTH_TOKEN
```

### Tasks Not Running

Check the logs:
```bash
tail -f orchestrator/logs/orchestrator.log
```

### Docker Issues

Rebuild the container:
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up
```

## Next Steps

1. ✅ Test with the default tasks
2. ✅ Create your own tasks in `tasks.json`
3. ✅ Deploy to Google Cloud
4. ✅ Set up phone shortcut for remote triggering
5. ✅ Monitor your AI team working!

## Getting Help

- Read the full [README.md](README.md)
- Check the [API Documentation](#api-endpoints)
- Review example tasks in `tasks/tasks.json`

## Pro Tips

1. **Start Small**: Test with 1-2 simple tasks first
2. **Use Dependencies**: Let the orchestrator handle task ordering
3. **Monitor Actively**: Check status during first few runs
4. **Iterate on Prompts**: Refine prompts based on results
5. **Parallel Power**: Independent tasks run simultaneously!

---

**Ready to orchestrate? Let's go! 🚀**
