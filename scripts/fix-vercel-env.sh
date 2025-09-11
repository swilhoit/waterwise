#!/bin/bash

# Load environment variables
source .env.local

# Function to add or update env var
add_env_var() {
  local var_name=$1
  local var_value="${!var_name}"
  
  if [ -z "$var_value" ]; then
    echo "⚠️  $var_name is empty in .env.local, skipping..."
    return
  fi
  
  echo "Setting $var_name (${#var_value} chars)..."
  
  # Remove if exists (to update)
  echo "y" | npx vercel env rm "$var_name" production 2>/dev/null || true
  
  # Add the variable
  echo "$var_value" | npx vercel env add "$var_name" production
}

echo "🔧 Fixing Vercel production environment variables..."

# Fix all Shopify variables
add_env_var "SHOPIFY_ACCESS_TOKEN"
add_env_var "SHOPIFY_SHOP_DOMAIN"  
add_env_var "SHOPIFY_API_KEY"
add_env_var "SHOPIFY_API_SECRET_KEY"
add_env_var "SHOPIFY_ADMIN_API_SECRET_KEY"

echo "✅ Environment variables updated. Triggering rebuild..."

# Trigger a new deployment
npx vercel --prod

echo "🎉 Done! Check https://greywater-website.vercel.app/blog"