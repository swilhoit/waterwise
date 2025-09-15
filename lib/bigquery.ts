import { BigQuery } from '@google-cloud/bigquery';

let bigquery: BigQuery;

// Initialize BigQuery client with proper credential handling for Vercel
export function getBigQueryClient() {
  if (!bigquery) {
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
    
    // Check if we have credentials as JSON string (Vercel deployment)
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
      try {
        const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
        bigquery = new BigQuery({
          projectId,
          credentials
        });
      } catch (error) {
        console.error('Failed to parse Google credentials:', error);
        // Fall back to default credentials (local development)
        bigquery = new BigQuery({ projectId });
      }
    } else {
      // Use default credentials (local development with gcloud auth)
      bigquery = new BigQuery({ projectId });
    }
  }
  
  return bigquery;
}