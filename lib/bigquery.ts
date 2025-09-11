import { BigQuery } from '@google-cloud/bigquery';

// Initialize BigQuery client
const bigquery = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

export class GreywaterBigQueryClient {
  private dataset: string;

  constructor() {
    this.dataset = process.env.BIGQUERY_DATASET || 'greywater_dataset';
  }

  /**
   * Get BigQuery client instance
   */
  getClient() {
    return bigquery;
  }

  /**
   * Get dataset reference
   */
  getDataset() {
    return bigquery.dataset(this.dataset);
  }

  /**
   * Execute a query against BigQuery
   */
  async query(sqlQuery: string, params?: any[]) {
    try {
      const options = {
        query: sqlQuery,
        params: params || [],
      };

      const [rows] = await bigquery.query(options);
      return rows;
    } catch (error) {
      console.error('BigQuery query error:', error);
      throw error;
    }
  }

  /**
   * Insert rows into a BigQuery table
   */
  async insertRows(tableName: string, rows: any[]) {
    try {
      const table = this.getDataset().table(tableName);
      await table.insert(rows);
      console.log(`Inserted ${rows.length} rows into ${tableName}`);
    } catch (error) {
      console.error('BigQuery insert error:', error);
      throw error;
    }
  }

  /**
   * Create a new table in the dataset
   */
  async createTable(tableName: string, schema: any[]) {
    try {
      const table = this.getDataset().table(tableName);
      const [tableExists] = await table.exists();
      
      if (!tableExists) {
        await table.create({ schema });
        console.log(`Table ${tableName} created successfully`);
      } else {
        console.log(`Table ${tableName} already exists`);
      }
    } catch (error) {
      console.error('BigQuery table creation error:', error);
      throw error;
    }
  }

  /**
   * Get table metadata
   */
  async getTableMetadata(tableName: string) {
    try {
      const table = this.getDataset().table(tableName);
      const [metadata] = await table.getMetadata();
      return metadata;
    } catch (error) {
      console.error('BigQuery metadata error:', error);
      throw error;
    }
  }

  /**
   * Test the BigQuery connection
   */
  async testConnection() {
    try {
      const query = 'SELECT 1 as test';
      const result = await this.query(query);
      console.log('BigQuery connection successful:', result);
      return true;
    } catch (error) {
      console.error('BigQuery connection test failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const greywater = new GreywaterBigQueryClient();

// Export types for TypeScript
export interface GreywaterTableSchema {
  name: string;
  type: 'STRING' | 'INTEGER' | 'FLOAT' | 'BOOLEAN' | 'TIMESTAMP' | 'DATE' | 'TIME' | 'DATETIME' | 'GEOGRAPHY' | 'JSON';
  mode?: 'REQUIRED' | 'NULLABLE' | 'REPEATED';
  description?: string;
}

// Common table schemas for greywater project
export const GREYWATER_SCHEMAS = {
  users: [
    { name: 'user_id', type: 'STRING' as const, mode: 'REQUIRED' as const },
    { name: 'email', type: 'STRING' as const, mode: 'REQUIRED' as const },
    { name: 'created_at', type: 'TIMESTAMP' as const, mode: 'REQUIRED' as const },
    { name: 'user_type', type: 'STRING' as const, mode: 'NULLABLE' as const },
  ],
  systems: [
    { name: 'system_id', type: 'STRING' as const, mode: 'REQUIRED' as const },
    { name: 'user_id', type: 'STRING' as const, mode: 'REQUIRED' as const },
    { name: 'system_type', type: 'STRING' as const, mode: 'REQUIRED' as const },
    { name: 'installation_date', type: 'DATE' as const, mode: 'NULLABLE' as const },
    { name: 'location', type: 'GEOGRAPHY' as const, mode: 'NULLABLE' as const },
    { name: 'capacity_gallons', type: 'INTEGER' as const, mode: 'NULLABLE' as const },
  ],
  usage_metrics: [
    { name: 'metric_id', type: 'STRING' as const, mode: 'REQUIRED' as const },
    { name: 'system_id', type: 'STRING' as const, mode: 'REQUIRED' as const },
    { name: 'timestamp', type: 'TIMESTAMP' as const, mode: 'REQUIRED' as const },
    { name: 'water_processed_gallons', type: 'FLOAT' as const, mode: 'NULLABLE' as const },
    { name: 'water_saved_gallons', type: 'FLOAT' as const, mode: 'NULLABLE' as const },
    { name: 'energy_used_kwh', type: 'FLOAT' as const, mode: 'NULLABLE' as const },
  ],
};