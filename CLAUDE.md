# Water Wise Group Website - Claude Context

## Project Overview
This is the Water Wise Group website built with Next.js, featuring a Chatwoot live chat integration.

## Infrastructure

### Chatwoot Server (GCP)
- **Instance Name**: `chatwoot-server`
- **Zone**: `us-west1-b`
- **External IP**: `34.53.43.15`
- **URL**: `https://34-53-43-15.nip.io`
- **Website Token**: `dbs2VnN4mNJSPpgFxmHGmZrC`

#### Accessing Chatwoot Server
```bash
# SSH into the server
gcloud compute ssh chatwoot-server --zone=us-west1-b

# Run Rails commands
sudo su - chatwoot -c 'cd ~/chatwoot && RAILS_ENV=production bundle exec rails runner /path/to/script.rb'

# Restart Chatwoot services
sudo systemctl restart chatwoot.target

# View Chatwoot logs
sudo journalctl -u chatwoot.target -f
```

#### Chatwoot Admin Access
- Admin URL: `https://34-53-43-15.nip.io/super_admin`
- App URL: `https://34-53-43-15.nip.io/app`

#### Feature Flags
The following features have been enabled for the Water Wise Group account:
- `disable_branding` - Hides "Powered by Chatwoot" branding
- `inbound_emails`, `channel_email`, `channel_facebook`, `channel_twitter`
- `help_center`, `agent_bots`, `macros`
- `campaigns`, `reports`, `crm`, `automations`

To enable/disable features via Rails:
```ruby
# Enable a feature
Account.first.enable_features!("feature_name")

# Disable a feature
Account.first.disable_features!("feature_name")

# View enabled features
Account.first.enabled_features
```

### Local Development
```bash
# Start the Next.js dev server
npm run dev
# or
pnpm dev
```

## Chat Widget Configuration
The Chatwoot widget is configured in `app/layout.tsx`. Key settings:
- Position: right
- Locale: en
- Type: standard

## AI Chatbot Architecture

### Overview
The chatbot uses a webhook-based architecture:
1. User sends message via Chatwoot widget
2. Chatwoot sends webhook to `/api/chatwoot`
3. Bot queries knowledge base and generates AI response
4. Bot sends response + product cards back to Chatwoot

### Key Files
- `app/api/chatwoot/route.ts` - Main webhook handler
- `lib/knowledge-base.ts` - Product info, pricing, FAQs
- `lib/chat-content-catalog.ts` - Product cards with images/links

### Environment Variables (Vercel)
```
CHATWOOT_URL=https://34-53-43-15.nip.io
CHATWOOT_BOT_TOKEN=<bot API token from Chatwoot>
CHATWOOT_WEBHOOK_SECRET=<optional, for signature verification>
OPENAI_API_KEY=<OpenAI API key>
```

### Product Pricing (keep in sync)
Update prices in THREE places if they change:
1. `lib/knowledge-base.ts` - Detailed product sections
2. `lib/chat-content-catalog.ts` - Card display prices
3. `app/api/chatwoot/route.ts` - System prompt pricing

Current prices:
- GWDD Gravity: $625
- GWDD with Pump: $945
- Aqua2use Pro: $2,695
- Replacement Filters: $219.95
- Replacement Pump: $389
- Drip Irrigation Kit: $199.95

### Debugging
```bash
# Check Vercel function logs
npx vercel logs greywater-website.vercel.app

# Test webhook endpoint
curl https://greywater-website.vercel.app/api/chatwoot
```

## GCloud Configuration
The gcloud CLI is configured at `~/.config/gcloud` and has access to manage the Chatwoot server.
