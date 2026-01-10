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

## GCloud Configuration
The gcloud CLI is configured at `~/.config/gcloud` and has access to manage the Chatwoot server.
