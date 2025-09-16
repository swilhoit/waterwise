import { BigQuery } from '@google-cloud/bigquery';

let bigquery: BigQuery;

// Initialize BigQuery client with proper credential handling for Vercel
export function getBigQueryClient() {
  if (!bigquery) {
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;

    if (!projectId) {
      throw new Error("GOOGLE_CLOUD_PROJECT_ID environment variable not set.");
    }
    
    // Check if we have credentials as JSON string (Vercel deployment)
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
      console.log("Initializing BigQuery client with JSON credentials.");
      try {
        const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
        bigquery = new BigQuery({
          projectId,
          credentials
        });
      } catch (error) {
        console.error('Failed to parse GOOGLE_APPLICATION_CREDENTIALS_JSON:', error);
        throw new Error("Could not initialize BigQuery client due to invalid credentials JSON.");
      }
    } else {
      console.log("Initializing BigQuery client with default credentials (local).");
      // Use default credentials (local development with gcloud auth)
      bigquery = new BigQuery({ projectId });
    }
  }
  
  return bigquery;
}