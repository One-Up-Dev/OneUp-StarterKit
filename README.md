<p align="center">
  <img src="public/logo.png" alt="OneUp Logo" width="150" height="150">
</p>

<h1 align="center">OneUp Starter-Kit</h1>

<p align="center">
  <strong>Lance ton projet SaaS en quelques minutes, pas en quelques semaines.</strong>
</p>

---

## C'est quoi ce projet ?

Ce starter-kit te donne tout ce dont tu as besoin pour lancer une application SaaS moderne :

- **Authentification** - Connexion Google en un clic
- **Base de donnees** - PostgreSQL pret a l'emploi
- **Paiements** - Integration Polar pour les abonnements
- **Chatbot IA** - Assistant propulse par OpenRouter
- **Interface** - Design moderne avec mode sombre

---

## Prerequis

Avant de commencer, assure-toi d'avoir installe :

| Outil | Version | Comment verifier |
|-------|---------|------------------|
| **Node.js** | 18+ | `node --version` |
| **Docker** | Latest | `docker --version` |
| **Git** | Latest | `git --version` |

---

## Demarrage rapide

```bash
# 1. Clone le projet
git clone https://github.com/One-Up-Dev/OneUp-StarterKit.git
cd OneUp-StarterKit

# 2. Installe les dependances
npm install

# 3. Configure l'environnement
cp .env.example .env

# 4. Lance PostgreSQL
docker-compose up -d

# 5. Cree les tables
npm run db:push

# 6. Lance l'app
npm run dev
```

Ouvre **http://localhost:3000**

---

## Commandes utiles

```bash
# === DEVELOPPEMENT ===
npm run dev              # Lance le serveur de dev
npm run build            # Compile pour la production
npm run start            # Lance en mode production

# === BASE DE DONNEES ===
npm run db:push          # Applique le schema
npm run db:studio        # Interface web pour la DB
npm run db:generate      # Genere une migration

# === DOCKER (PostgreSQL) ===
docker-compose up -d     # Demarre PostgreSQL
docker-compose down      # Arrete PostgreSQL
docker-compose logs -f   # Voir les logs

# === ARRETER / RELANCER ===
docker stop oneup-starterkit-postgres    # Arrete PostgreSQL
docker start oneup-starterkit-postgres   # Relance PostgreSQL
docker-compose down -v                   # Supprime tout (container + donnees)
```

---

## Configuration

Le fichier `.env` contient toutes les configurations. Copie `.env.example` et modifie les valeurs.

### Base de donnees (fonctionne par defaut)

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/oneup-starterkit
```

### Authentification Google

```env
BETTER_AUTH_SECRET=une-cle-secrete-aleatoire
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=ton-client-id
GOOGLE_CLIENT_SECRET=ton-client-secret
```

<details>
<summary>Comment obtenir les identifiants Google ?</summary>

1. Va sur [Google Cloud Console](https://console.cloud.google.com/)
2. Cree un nouveau projet
3. Va dans **APIs & Services** > **Credentials**
4. Clique **Create Credentials** > **OAuth client ID**
5. Ajoute `http://localhost:3000/api/auth/callback/google` dans **Authorized redirect URIs**
6. Copie le **Client ID** et **Client Secret**

</details>

### Paiements Polar

```env
POLAR_ACCESS_TOKEN=ton-token
POLAR_ENVIRONMENT=sandbox
POLAR_WEBHOOK_SECRET=ton-webhook-secret
POLAR_PRODUCT_BASIC=id-produit-basic
POLAR_PRODUCT_PRO=id-produit-pro
POLAR_PRODUCT_ELITE=id-produit-elite
```

<details>
<summary>Comment configurer Polar ?</summary>

1. Cree un compte sur [polar.sh](https://polar.sh/)
2. Cree une organisation
3. Va dans **Settings** > **Developers** > **Personal Access Tokens**
4. Cree 3 produits (Basic, Pro, Elite) et copie leurs IDs

</details>

### Chatbot IA

```env
OPENROUTER_API_KEY=ta-cle-api
OPENROUTER_MODEL=openai/gpt-3.5-turbo
```

<details>
<summary>Comment obtenir une cle OpenRouter ?</summary>

1. Cree un compte sur [openrouter.ai](https://openrouter.ai/)
2. Va dans **Keys** et cree une nouvelle cle API

</details>

---

## Personnalisation

### Changer le logo

Remplace `public/logo.png` par ton propre logo.

### Changer le nom

Modifie `Starter-Kit` dans `src/components/Header.tsx`

### Changer les couleurs

Les couleurs principales sont `blue-500` / `blue-600` (Tailwind CSS).

---

## Structure du projet

```
OneUp-StarterKit/
├── public/
│   └── logo.png              # Ton logo
├── src/
│   ├── app/                  # Pages et API
│   │   ├── page.tsx          # Page principale
│   │   └── api/              # Endpoints
│   ├── components/           # Composants React
│   │   ├── Header.tsx        # Header avec logo
│   │   ├── StatusTable.tsx   # Tableau de statut
│   │   ├── PricingTable.tsx  # Table de prix
│   │   └── Chatbot.tsx       # Assistant IA
│   ├── db/                   # Base de donnees
│   │   ├── index.ts          # Connexion
│   │   └── schema.ts         # Schema des tables
│   └── lib/                  # Utilitaires
├── drizzle/                  # Migrations SQL
├── .env.example              # Template config
├── docker-compose.yml        # Config Docker
└── package.json              # Dependances
```

---

## Problemes courants

### ECONNREFUSED (Connection refused)

```bash
# La base de donnees n'est pas demarree
docker-compose up -d
docker ps  # Verifie que le container tourne
```

### Port 5432 already in use

```bash
# Un autre PostgreSQL tourne deja
docker stop $(docker ps -q --filter "publish=5432")
docker-compose up -d
```

### Bouton "Se connecter" grise

Configure `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET` dans `.env`

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
| Infra | Docker |

---

## Liens utiles

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Drizzle](https://orm.drizzle.team/docs/overview)
- [Issues GitHub](https://github.com/One-Up-Dev/OneUp-StarterKit/issues)

---

<p align="center">
  <strong>Fait avec mass par OneUp</strong>
</p>
