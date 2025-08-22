# Water Wise Group Website Setup Guide

## Shopify Storefront API Setup

To connect your Shopify store to this Next.js website, you need to create a Storefront API access token:

### Steps to Create Storefront API Access Token:

1. **Log in to your Shopify Admin**
   - Go to https://waterwisegroup.myshopify.com/admin

2. **Navigate to Apps**
   - In your Shopify admin, go to Settings → Apps and sales channels

3. **Create a Custom App**
   - Click "Develop apps"
   - Click "Create an app"
   - Give your app a name (e.g., "Water Wise Website")

4. **Configure Storefront API Access**
   - In your app, go to "Configuration"
   - Under "Storefront API", click "Configure"
   - Select the following scopes:
     - ✅ Read products
     - ✅ Read product listings
     - ✅ Read collection listings
     - ✅ Read inventory
     - ✅ Manage checkouts
     - ✅ Read customer details

5. **Install the App**
   - Click "Install app"

6. **Get Your Storefront API Access Token**
   - After installation, go to "API credentials"
   - Under "Storefront API access token", click "Reveal token once"
   - Copy this token - you won't be able to see it again!

7. **Update Your .env.local File**
   ```env
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_copied_token_here
   ```

## Sanity CMS Setup

To set up Sanity:

1. **Create a Sanity Project**
   ```bash
   cd sanity
   npx sanity@latest init
   ```
   Follow the prompts to create a new project

2. **Get Your Project ID**
   - After creation, your project ID will be shown
   - Or visit https://www.sanity.io/manage

3. **Update .env.local**
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

4. **Deploy Sanity Studio**
   ```bash
   cd sanity
   npm run deploy
   ```

## Running the Website

1. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## Important Notes

- The Storefront API token is different from Admin API credentials
- Storefront API tokens are public and safe to use in frontend code
- Admin API credentials should NEVER be exposed in frontend code
- Keep your .env.local file private and never commit it to git