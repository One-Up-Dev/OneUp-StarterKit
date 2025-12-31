#!/bin/bash
# Starter-Kit Development Environment Setup
# This script sets up and runs the development environment

set -e

echo "🚀 Starter-Kit Development Environment Setup"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo -e "${RED}❌ Docker is not running. Please start Docker first.${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ Docker is running${NC}"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+${NC}"
        exit 1
    fi
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        echo -e "${RED}❌ Node.js version must be 18 or higher. Current: $(node -v)${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ Node.js $(node -v) installed${NC}"
}

# Create .env file if it doesn't exist
setup_env() {
    if [ ! -f .env ]; then
        echo -e "${YELLOW}📝 Creating .env file from .env.example...${NC}"
        if [ -f .env.example ]; then
            cp .env.example .env
            echo -e "${GREEN}✓ .env file created. Please edit it with your credentials.${NC}"
        else
            echo -e "${YELLOW}Creating default .env file...${NC}"
            cat > .env << 'EOF'
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/starterkit

# BetterAuth
BETTER_AUTH_SECRET=your-secret-key-change-in-production
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Polar
POLAR_ACCESS_TOKEN=your-polar-access-token

# OpenRouter
OPENROUTER_API_KEY=your-openrouter-api-key
EOF
            echo -e "${GREEN}✓ Default .env file created. Please edit it with your credentials.${NC}"
        fi
    else
        echo -e "${GREEN}✓ .env file exists${NC}"
    fi
}

# Start PostgreSQL with Docker
start_postgres() {
    echo -e "${YELLOW}🐘 Starting PostgreSQL...${NC}"

    # Check if docker-compose.yml exists
    if [ -f docker-compose.yml ]; then
        docker compose up -d postgres 2>/dev/null || docker-compose up -d postgres
    else
        # Start PostgreSQL directly with Docker
        if ! docker ps | grep -q starterkit-postgres; then
            docker run -d \
                --name starterkit-postgres \
                -e POSTGRES_USER=postgres \
                -e POSTGRES_PASSWORD=postgres \
                -e POSTGRES_DB=starterkit \
                -p 5432:5432 \
                postgres:15-alpine
            echo -e "${YELLOW}⏳ Waiting for PostgreSQL to be ready...${NC}"
            sleep 5
        fi
    fi

    echo -e "${GREEN}✓ PostgreSQL is running on port 5432${NC}"
}

# Install dependencies
install_deps() {
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"

    if [ -f package.json ]; then
        npm install
        echo -e "${GREEN}✓ Dependencies installed${NC}"
    else
        echo -e "${YELLOW}⚠ No package.json found. Skipping dependency installation.${NC}"
    fi
}

# Run database migrations
run_migrations() {
    echo -e "${YELLOW}🗄️ Running database migrations...${NC}"

    if [ -f package.json ] && grep -q "db:migrate" package.json; then
        npm run db:migrate 2>/dev/null || npm run db:push 2>/dev/null || echo -e "${YELLOW}⚠ No migration script found${NC}"
    else
        echo -e "${YELLOW}⚠ No migration script found. Skipping.${NC}"
    fi
}

# Start the development server
start_dev() {
    echo -e "${YELLOW}🌐 Starting development server...${NC}"

    if [ -f package.json ]; then
        echo ""
        echo -e "${GREEN}=============================================="
        echo -e "🎉 Setup complete! Starting Next.js dev server..."
        echo -e "=============================================="
        echo ""
        echo -e "📱 Application: ${YELLOW}http://localhost:3000${NC}"
        echo -e "📊 Status API:  ${YELLOW}http://localhost:3000/api/status${NC}"
        echo ""
        echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
        echo ""
        npm run dev
    else
        echo -e "${RED}❌ No package.json found. Cannot start dev server.${NC}"
        exit 1
    fi
}

# Main execution
main() {
    echo ""
    check_docker
    check_node
    echo ""

    setup_env
    echo ""

    start_postgres
    echo ""

    install_deps
    echo ""

    run_migrations
    echo ""

    start_dev
}

# Run main function
main
