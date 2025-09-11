const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Load .env.local
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

// Parse environment variables
const envVars = {};
envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [key, ...valueParts] = trimmed.split('=');
    const value = valueParts.join('=').trim();
    if (key && value) {
      envVars[key.trim()] = value;
    }
  }
});

console.log('Found environment variables:');
Object.keys(envVars).forEach(key => {
  console.log(`  - ${key}: ${envVars[key].length} characters`);
});

// Function to set environment variable
async function setEnvVar(key, value) {
  try {
    // First try to remove it (ignore errors)
    try {
      execSync(`npx vercel env rm ${key} production --yes`, { 
        stdio: 'pipe',
        timeout: 5000 
      });
      console.log(`  Removed old ${key}`);
    } catch (e) {
      // Ignore - variable might not exist
    }
    
    // Add the variable using a file
    const tempFile = `/tmp/vercel-env-${key}.txt`;
    fs.writeFileSync(tempFile, value);
    
    execSync(`npx vercel env add ${key} production < ${tempFile}`, { 
      stdio: 'pipe',
      timeout: 10000 
    });
    
    fs.unlinkSync(tempFile);
    console.log(`✅ Added ${key}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to add ${key}:`, error.message);
    return false;
  }
}

// Process all variables
async function updateAllEnvVars() {
  console.log('\n🔧 Updating Vercel production environment variables...\n');
  
  let success = 0;
  let failed = 0;
  
  for (const [key, value] of Object.entries(envVars)) {
    const result = await setEnvVar(key, value);
    if (result) success++;
    else failed++;
  }
  
  console.log(`\n✅ Successfully updated ${success} variables`);
  if (failed > 0) {
    console.log(`⚠️  Failed to update ${failed} variables`);
  }
  
  console.log('\n🚀 Triggering new deployment...');
  execSync('npx vercel --prod', { stdio: 'inherit' });
}

updateAllEnvVars().catch(console.error);