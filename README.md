# OneUp-StarterKit

A minimalist SaaS boilerplate for building modern web applications. Features authentication, payments, and AI chatbot integration out of the box.

## Overview

A single-page application with:
- **Status Dashboard** - Real-time verification of all service connections
- **Pricing Table** - 3 configurable plans (Basic/Pro/Elite) with Polar integration
- **AI Chatbot** - OpenRouter-powered assistant (visible when logged in)
- **Google OAuth** - One-click authentication via BetterAuth

## Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | Next.js 16+, React 18+, Tailwind CSS |
| Backend | Next.js API Routes |
| Database | PostgreSQL + Drizzle ORM |
| Auth | BetterAuth + Google OAuth |
| Payments | Polar (checkout, portal, webhooks) |
| AI | OpenRouter API |
| Infra | Docker + docker-compose |

## Quick Start

```bash
# Clone the repo
git clone https://github.com/One-Up-Dev/OneUp-StarterKit.git
cd OneUp-StarterKit

# Run setup script
./init.sh

# Or manually:
docker-compose up -d
npm install
npm run dev
```

Open http://localhost:3000

## Environment Variables

Create a `.env` file (copy from `.env.example`):

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5434/starterkit

# BetterAuth
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Polar
POLAR_ACCESS_TOKEN=your-polar-access-token
POLAR_ENVIRONMENT=sandbox
POLAR_WEBHOOK_SECRET=your-polar-webhook-secret

# Polar Product IDs (from Polar Dashboard)
POLAR_PRODUCT_BASIC=your-basic-product-id
POLAR_PRODUCT_PRO=your-pro-product-id
POLAR_PRODUCT_ELITE=your-elite-product-id

# OpenRouter
OPENROUTER_API_KEY=your-openrouter-api-key
OPENROUTER_MODEL=openai/gpt-3.5-turbo
```

## Features

### Status Dashboard
Real-time connection status for all services:
- PostgreSQL database
- BetterAuth (Google OAuth)
- Polar payments
- OpenRouter API

### Pricing Table
Three configurable plans with live verification:
- **Basic** - Entry tier
- **Pro** - Professional tier
- **Elite** - Enterprise tier

Each plan shows:
- Configuration status (green checkmark if verified on Polar)
- Product ID
- Price (fetched from Polar)

### Authentication
- Google OAuth via BetterAuth
- Avatar display in header when logged in
- Session management (7-day expiration)
- Dark mode support

### AI Chatbot
- Visible only when authenticated
- Powered by OpenRouter API
- Configurable model
- Disabled state when not configured

## API Endpoints

### Status
| Endpoint | Description |
|----------|-------------|
| `GET /api/status` | All services status |
| `GET /api/status/database` | PostgreSQL connection |
| `GET /api/status/auth` | BetterAuth config |
| `GET /api/status/polar` | Polar config |
| `GET /api/status/openrouter` | OpenRouter config |
| `GET /api/status/polar-products` | Verify all 3 products |

### Authentication (BetterAuth)
| Endpoint | Description |
|----------|-------------|
| `GET /api/auth/get-session` | Current session |
| `POST /api/auth/sign-in/social` | Initiate OAuth |
| `POST /api/auth/sign-out` | Sign out |

### Payments (Polar via BetterAuth)
| Endpoint | Description |
|----------|-------------|
| `GET /api/auth/checkout/:slug` | Start checkout (basic/pro/elite) |
| `GET /api/auth/portal` | Customer portal |

### Chat
| Endpoint | Description |
|----------|-------------|
| `POST /api/chat` | Send prompt, get AI response |

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main page (status + pricing + chatbot)
│   └── api/
│       ├── auth/[...all]/    # BetterAuth routes
│       ├── chat/             # OpenRouter chat
│       └── status/           # Service status endpoints
├── components/
│   ├── Header.tsx            # Navigation + user avatar
│   ├── StatusTable.tsx       # Service status display
│   ├── PricingTable.tsx      # 3 plans with verification
│   └── Chatbot.tsx           # AI assistant
├── lib/
│   ├── auth.ts               # BetterAuth + Polar config
│   ├── auth-client.ts        # Client-side auth
│   └── status.ts             # Status check utilities
└── db/
    ├── index.ts              # Drizzle client
    └── schema.ts             # Database schema
```

## Development

```bash
# Start dev server
npm run dev

# Generate migrations
npx drizzle-kit generate

# Push schema to DB
npx drizzle-kit push

# Build for production
npm run build
```

## Obtaining Credentials

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add `http://localhost:3000/api/auth/callback/google` as authorized redirect URI

### Polar
1. Create account at [polar.sh](https://polar.sh/)
2. Create an organization
3. Go to Settings > Developers > Personal Access Tokens
4. Create 3 products (Basic, Pro, Elite) and copy their IDs

### OpenRouter
1. Create account at [openrouter.ai](https://openrouter.ai/)
2. Go to Keys and create an API key

## License

MIT
