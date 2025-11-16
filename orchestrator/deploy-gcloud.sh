#!/bin/bash
# Deploy AI Coding Team Orchestrator to Google Cloud Run

set -e

# Configuration
PROJECT_ID="greywater-prospects-2025"
SERVICE_NAME="ai-orchestrator"
REGION="us-central1"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"
AUTH_TOKEN="${ORCHESTRATOR_AUTH_TOKEN:-$(openssl rand -hex 32)}"

echo "================================================"
echo "Deploying AI Orchestrator to Google Cloud Run"
echo "================================================"

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "Error: gcloud CLI is not installed"
    echo "Install from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Set project
echo "Setting project to: $PROJECT_ID"
gcloud config set project $PROJECT_ID

# Enable required APIs
echo "Enabling required APIs..."
gcloud services enable \
    cloudbuild.googleapis.com \
    run.googleapis.com \
    containerregistry.googleapis.com

# Build the Docker image
echo "Building Docker image..."
gcloud builds submit \
    --tag $IMAGE_NAME \
    --timeout=20m \
    .

# Deploy to Cloud Run
echo "Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
    --image $IMAGE_NAME \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --set-env-vars "ORCHESTRATOR_AUTH_TOKEN=${AUTH_TOKEN}" \
    --memory 2Gi \
    --cpu 2 \
    --timeout 3600 \
    --max-instances 3 \
    --min-instances 0

# Get the service URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME \
    --platform managed \
    --region $REGION \
    --format 'value(status.url)')

echo ""
echo "================================================"
echo "Deployment Complete!"
echo "================================================"
echo ""
echo "Service URL: $SERVICE_URL"
echo "Auth Token: $AUTH_TOKEN"
echo ""
echo "Test the service:"
echo "curl $SERVICE_URL/health"
echo ""
echo "Start orchestration from your phone:"
echo "curl -X POST $SERVICE_URL/api/quick-start \\"
echo "  -H \"Authorization: Bearer $AUTH_TOKEN\""
echo ""
echo "IMPORTANT: Save your auth token securely!"
echo "================================================"
