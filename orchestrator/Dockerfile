# Dockerfile for AI Coding Team Orchestrator
FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js (required for Claude Code)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Install Claude Code CLI
# Note: Replace with actual installation method when available
RUN npm install -g @anthropic-ai/claude-code || echo "Claude Code CLI installation placeholder"

# Set working directory
WORKDIR /workspace

# Copy Python requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy orchestrator code
COPY orchestrator.py .
COPY webhook_server.py .
COPY tasks/ tasks/
COPY config/ config/

# Create directories for logs and state
RUN mkdir -p logs state

# Environment variables
ENV PYTHONUNBUFFERED=1
ENV ORCHESTRATOR_AUTH_TOKEN=change-me-in-production
ENV PORT=8000

# Expose webhook server port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Default command - run the webhook server
CMD ["python", "webhook_server.py"]
