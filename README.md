# OneUp Starter-Kit

**Lance ton projet SaaS en quelques minutes, pas en quelques semaines.**

---

## Fonctionnalites

- **Authentification** - Google OAuth en un clic
- **Base de donnees** - PostgreSQL + Drizzle ORM
- **Paiements** - Integration Polar (optionnel)
- **Chatbot IA** - Assistant OpenRouter
- **Interface** - Tailwind CSS + mode sombre
- **Wizard de configuration** - Interface web pour configurer ton projet
- **Agents Claude** - Workflow automatise pour generer du code

---

## Prerequis

| Outil | Version |
|-------|---------|
| Node.js | 18+ |
| Docker | Latest |
| Git | Latest |
| Claude Code | Latest |

### Installer Claude Code

```bash
# macOS / Linux
curl -fsSL https://claude.ai/install.sh | sh

# Windows (PowerShell)
irm https://claude.ai/install.ps1 | iex

# Ou via npm
npm install -g @anthropic-ai/claude-code
```

Verifie l'installation :
```bash
claude --version
```

Documentation : https://docs.anthropic.com/claude-code

---

## Demarrage rapide

```bash
# Clone et installe
git clone https://github.com/One-Up-Dev/OneUp-StarterKit.git
cd OneUp-StarterKit
npm install

# Configure
cp .env.example .env

# Lance PostgreSQL
docker-compose up -d

# Cree les tables
npm run db:push

# Lance l'app
npm run dev
```

Ouvre **http://localhost:3000**

---

## Configurer ton projet

### Option 1: Interface web (recommande)

1. Connecte-toi sur l'app
2. Clique sur **"Configurer mon projet"**
3. Suis le wizard en 6 etapes:
   - Identite (nom, couleur, logo, image hero)
   - Fonctionnalites (35+ disponibles)
   - Produit (pricing ou pas de paiement)
   - Contexte (Q&A pour personnaliser)
   - Design system (shadcn, daisyui, etc.)
   - Resume et generation

4. Utilise la commande Claude Code:
```
/project-setup
```

### Option 2: Claude Code directement

Lance `/project-setup` et laisse l'agent te guider.

---

## Agents disponibles

Le starter-kit inclut 4 agents pour automatiser le developpement:

| Agent | Role | Modele |
|-------|------|--------|
| `frontend-design` | Design system et composants UI | sonnet |
| `coder` | Implemente le code | opus |
| `tester` | Tests visuels Playwright | sonnet |
| `stuck` | Escalade vers humain | sonnet |

### Workflow

```
frontend-design (specs) -> coder (implemente) -> tester (valide) -> stuck (si probleme)
```

### frontend-design

Deux modes:
- **Mode 1**: Genere le design system complet (couleurs, typo, spacing)
- **Mode 2**: Genere specs + code pour un composant specifique

Utilise le catalogue `.claude/design-patterns/catalog.md`.

Les agents sont dans `.claude/agents/`.

---

## Commandes Claude Code

| Commande | Description |
|----------|-------------|
| `/project-setup` | Genere le projet depuis oneup.config.json |
| `/clean-up` | Nettoie les fichiers de test et screenshots |

---

## Commandes

```bash
# Developpement
npm run dev              # Serveur de dev
npm run build            # Build production
npm run start            # Mode production

# Base de donnees
npm run db:push          # Applique le schema
npm run db:studio        # Interface web DB

# Docker
docker-compose up -d     # Demarre PostgreSQL
docker-compose down      # Arrete PostgreSQL
```

---

## Configuration (.env)

### Base de donnees (fonctionne par defaut)

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/oneup-starterkit
```

### Authentification Google

```env
BETTER_AUTH_SECRET=une-cle-secrete
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=ton-client-id
GOOGLE_CLIENT_SECRET=ton-client-secret
```

[Console Google Cloud](https://console.cloud.google.com/) > APIs & Services > Credentials

### Paiements Polar (optionnel)

```env
POLAR_ACCESS_TOKEN=ton-token
POLAR_ENVIRONMENT=sandbox
```

[polar.sh](https://polar.sh/) > Settings > Developers

### Chatbot IA

```env
OPENROUTER_API_KEY=ta-cle-api
OPENROUTER_MODEL=openai/gpt-3.5-turbo
```

[openrouter.ai](https://openrouter.ai/) > Keys

---

## Structure

```
OneUp-StarterKit/
├── .claude/
│   ├── agents/              # Agents (frontend-design, coder, tester, stuck)
│   ├── commands/            # Slash commands (/project-setup)
│   └── design-patterns/     # Catalogue UI (layouts, components, sections)
├── src/
│   ├── app/                 # Pages et API
│   │   └── setup/           # Wizard de configuration
│   ├── components/          # Composants React
│   ├── lib/
│   │   ├── setup/           # Config wizard (features, types)
│   │   ├── auth.ts          # BetterAuth config
│   │   └── db/              # Drizzle schema
│   └── store/               # Zustand stores
├── docker-compose.yml
└── oneup.config.json        # Config generee par le wizard
```

---

## Tech Stack

| Categorie | Technologie |
|-----------|-------------|
| Frontend | Next.js 16, React 19, Tailwind CSS 4 |
| Backend | Next.js API Routes |
| Database | PostgreSQL 16 + Drizzle ORM |
| Auth | BetterAuth + Google OAuth |
| Paiements | Polar |
| IA | OpenRouter API |

---

## Problemes courants

**Connection refused**
```bash
docker-compose up -d
```

**Port 5432 deja utilise**
```bash
docker stop $(docker ps -q --filter "publish=5432")
docker-compose up -d
```

**Bouton connexion grise**
Configure `GOOGLE_CLIENT_ID` dans `.env`

---

## Liens

- [Next.js](https://nextjs.org/docs)
- [Drizzle ORM](https://orm.drizzle.team/docs/overview)
- [BetterAuth](https://www.better-auth.com/docs)
- [Polar](https://polar.sh/docs)

---

**Fait par OneUp**
