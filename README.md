# Starter-Kit

A minimalist educational boilerplate for learning how to build a SaaS application. This project demonstrates a modern SaaS stack with credential verification, Google OAuth authentication, and AI chatbot integration.

## Overview

The application displays a landing page with a status table showing whether various services are correctly configured (PostgreSQL, BetterAuth, Polar, OpenRouter). Once authenticated via Google OAuth, users can access a profile page with a simple AI chatbot.

## Tech Stack

- **Frontend**: Next.js 14+ with React 18+, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: BetterAuth with Google OAuth
- **Payments**: Polar integration (via BetterAuth)
- **AI**: OpenRouter API for chatbot functionality
- **Infrastructure**: Docker + docker-compose

## Prerequisites

- Docker and Docker Compose
- Node.js 18+
- Google Cloud Console project (for OAuth credentials)
- Polar account (for payment integration)
- OpenRouter API key (for AI chatbot)

## Quick Start

1. **Clone and setup**:
   ```bash
   git clone <repository-url>
   cd starter-kit
   ./init.sh
   ```

2. **Configure environment variables**:
   Edit the `.env` file with your credentials:
   ```env
   # Database
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/starterkit

   # BetterAuth
   BETTER_AUTH_SECRET=your-secret-key
   BETTER_AUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret

   # Polar
   POLAR_ACCESS_TOKEN=your-polar-access-token

   # OpenRouter
   OPENROUTER_API_KEY=your-openrouter-api-key
   ```

3. **Access the application**:
   - Landing page: http://localhost:3000
   - Status API: http://localhost:3000/api/status

## Features

### Landing Page
- Clean, minimal design
- Credentials status table showing connection status for:
  - PostgreSQL database
  - BetterAuth (Google OAuth)
  - Polar integration
  - OpenRouter API
- Login button with disabled state when credentials missing

### Authentication
- Google OAuth via BetterAuth
- Protected routes (/profile)
- Session management (7-day expiration)
- Automatic redirect after login

### Profile Page
- User information display (name, email, avatar)
- AI chatbot powered by OpenRouter
- Logout functionality

### Chatbot
- Simple prompt input
- Single response display (no history)
- Disabled state when OpenRouter not configured
- Loading and error states

## API Endpoints

### Status
- `GET /api/status` - All services status
- `GET /api/status/database` - PostgreSQL connection
- `GET /api/status/auth` - BetterAuth configuration
- `GET /api/status/polar` - Polar configuration
- `GET /api/status/openrouter` - OpenRouter configuration

### Authentication
- `GET /api/auth/session` - Current session
- `POST /api/auth/signin/google` - Initiate Google OAuth
- `GET /api/auth/callback/google` - OAuth callback
- `POST /api/auth/signout` - Sign out

### Chat
- `POST /api/chat` - Send prompt, get AI response

## Project Structure

```
starter-kit/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── page.tsx      # Landing page
│   │   ├── profile/      # Protected profile page
│   │   └── api/          # API routes
│   ├── components/       # React components
│   ├── lib/              # Utilities and configurations
│   └── db/               # Database schema and migrations
├── docker-compose.yml    # Docker services
├── .env.example          # Environment template
├── feature_list.json     # Test cases for development
└── init.sh               # Setup script
```

## Development

```bash
# Start development server
npm run dev

# Run database migrations
npm run db:migrate

# Build for production
npm run build

# Start production server
npm start
```

## Testing

The project includes a comprehensive `feature_list.json` with 168 test cases covering:
- Security and access control
- Navigation integrity
- Real data verification
- Workflow completeness
- Error handling
- UI-backend integration
- State persistence
- Responsive design
- Accessibility
- Performance

## License

MIT
