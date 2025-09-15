import { NextResponse } from 'next/server';
import { BigQuery } from '@google-cloud/bigquery';

export async function GET() {
  try {
    const bigquery = new BigQuery({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    });

    // List all datasets in the project
    const [datasets] = await bigquery.getDatasets();
    
    const datasetsInfo = await Promise.all(
      datasets.map(async (dataset) => {
        const [tables] = await dataset.getTables();
        
        // Filter for greywater-related tables
        const greywaterTables = tables.filter(table => {
          const name = table.id?.toLowerCase() || '';
          return name.includes('state') || 
                 name.includes('county') || 
                 name.includes('city') || 
                 name.includes('water') || 
                 name.includes('district') || 
                 name.includes('policy') || 
                 name.includes('incentive') || 
                 name.includes('compliance') ||
                 name.includes('greywater') ||
                 name.includes('location');
        });

        return {
          id: dataset.id,
          tables: tables.map(t => t.id),
          greywaterTables: greywaterTables.map(t => t.id),
          tableCount: tables.length
        };
      })
    );

    // Find the most likely greywater dataset
    const greywaterDataset = datasetsInfo.find(d => 
      d.greywaterTables.length > 0 || 
      d.id?.toLowerCase().includes('greywater') ||
      d.id?.toLowerCase().includes('water') ||
      d.id?.toLowerCase().includes('policy')
    );

    return NextResponse.json({
      status: 'success',
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      datasets: datasetsInfo,
      recommendedDataset: greywaterDataset,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('BigQuery dataset exploration error:', error);
    return NextResponse.json({
      status: 'error', 
      message: 'Failed to explore BigQuery datasets',
      error: error instanceof Error ? error.message : 'Unknown error',
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID
    }, { status: 500 });
  }
}