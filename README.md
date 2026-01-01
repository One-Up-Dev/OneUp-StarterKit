<p align="center">
  <img src="public/logo.png" alt="OneUp Logo" width="150" height="150">
</p>

<h1 align="center">OneUp Starter-Kit</h1>

<p align="center">
  <strong>Lance ton projet SaaS en quelques minutes, pas en quelques semaines.</strong>
</p>

<p align="center">
  <a href="#-demarrage-rapide">Demarrage rapide</a> •
  <a href="#-fonctionnalites">Fonctionnalites</a> •
  <a href="#-configuration">Configuration</a> •
  <a href="#-personnalisation">Personnalisation</a>
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

| Outil | Version | Comment verifier | Comment installer |
|-------|---------|------------------|-------------------|
| **Node.js** | 18+ | `node --version` | [nodejs.org](https://nodejs.org/) |
| **Docker** | Latest | `docker --version` | [docker.com](https://www.docker.com/get-started/) |
| **Git** | Latest | `git --version` | [git-scm.com](https://git-scm.com/) |

> **Tu debutes ?** Docker permet de lancer PostgreSQL sans l'installer sur ton PC. C'est comme une "boite" qui contient la base de donnees.

---

## Demarrage rapide

### Etape 1 : Telecharge le projet

```bash
git clone https://github.com/One-Up-Dev/OneUp-StarterKit.git
cd OneUp-StarterKit
```

### Etape 2 : Installe les dependances

```bash
npm install
```

> Cette commande telecharge toutes les librairies necessaires. Ca peut prendre 1-2 minutes.

### Etape 3 : Configure l'environnement

```bash
cp .env.example .env
```

> Cette commande copie le fichier de configuration exemple. Tu pourras le modifier plus tard.

### Etape 4 : Lance la base de donnees

```bash
docker-compose up -d
```

> Cette commande demarre PostgreSQL en arriere-plan. Le `-d` signifie "detached" (en arriere-plan).

**Verifie que ca marche :**
```bash
docker ps
```
Tu devrais voir `oneup-starterkit-postgres` dans la liste.

### Etape 5 : Cree les tables

```bash
npm run db:push
```

> Cette commande cree toutes les tables necessaires dans la base de donnees.

### Etape 6 : Lance l'application

```bash
npm run dev
```

**Ouvre ton navigateur sur** [http://localhost:3000](http://localhost:3000)

---

## Ca y est !

Tu devrais voir le dashboard avec :
- Un tableau de statut (certains seront rouges, c'est normal)
- Une table de pricing
- Un bouton de connexion (desactive pour l'instant)

---

## Configuration

### Configuration minimale (pour tester)

Avec juste Docker et les commandes ci-dessus, tu peux deja :
- Voir l'interface
- Verifier que la base de donnees fonctionne (statut vert)

### Configuration complete (pour la production)

Edite le fichier `.env` pour activer toutes les fonctionnalites :

#### 1. Base de donnees (deja configure)
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/oneup-starterkit
```

#### 2. Authentification Google

```env
BETTER_AUTH_SECRET=une-cle-secrete-aleatoire
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=ton-client-id-google
GOOGLE_CLIENT_SECRET=ton-client-secret-google
```

<details>
<summary><strong>Comment obtenir les identifiants Google ?</strong></summary>

1. Va sur [Google Cloud Console](https://console.cloud.google.com/)
2. Cree un nouveau projet (ou selectionne un existant)
3. Va dans **APIs & Services** > **Credentials**
4. Clique **Create Credentials** > **OAuth client ID**
5. Choisis **Web application**
6. Ajoute `http://localhost:3000/api/auth/callback/google` dans **Authorized redirect URIs**
7. Copie le **Client ID** et **Client Secret**

</details>

#### 3. Paiements Polar

```env
POLAR_ACCESS_TOKEN=ton-token-polar
POLAR_ENVIRONMENT=sandbox
POLAR_WEBHOOK_SECRET=ton-webhook-secret
POLAR_PRODUCT_BASIC=id-produit-basic
POLAR_PRODUCT_PRO=id-produit-pro
POLAR_PRODUCT_ELITE=id-produit-elite
```

<details>
<summary><strong>Comment configurer Polar ?</strong></summary>

1. Cree un compte sur [polar.sh](https://polar.sh/)
2. Cree une organisation
3. Va dans **Settings** > **Developers** > **Personal Access Tokens**
4. Cree 3 produits (Basic, Pro, Elite) et copie leurs IDs

</details>

#### 4. Chatbot IA

```env
OPENROUTER_API_KEY=ta-cle-api-openrouter
OPENROUTER_MODEL=openai/gpt-3.5-turbo
```

<details>
<summary><strong>Comment obtenir une cle OpenRouter ?</strong></summary>

1. Cree un compte sur [openrouter.ai](https://openrouter.ai/)
2. Va dans **Keys** et cree une nouvelle cle API

</details>

---

## Personnalisation

### Changer le logo

Remplace le fichier `public/logo.png` par ton propre logo.

Le logo apparait :
- Dans le header de l'application (36x36px)
- Dans ce README

### Changer le nom

1. Modifie `Starter-Kit` dans `src/components/Header.tsx`
2. Modifie le titre dans `src/app/layout.tsx`

### Changer les couleurs

Les couleurs utilisent Tailwind CSS. Les principales sont :
- `blue-500` / `blue-600` - Couleur principale
- `gray-*` - Couleurs neutres

---

## Commandes utiles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de developpement |
| `npm run build` | Compile pour la production |
| `npm run start` | Lance en mode production |
| `docker-compose up -d` | Demarre PostgreSQL |
| `docker-compose down` | Arrete PostgreSQL |
| `docker-compose logs -f` | Voir les logs PostgreSQL |
| `npm run db:push` | Applique le schema a la DB |
| `npm run db:studio` | Interface web pour la DB |

---

## Structure du projet

```
OneUp-StarterKit/
├── public/
│   └── logo.png          # <- Ton logo ici
├── src/
│   ├── app/              # Pages et API routes
│   │   ├── page.tsx      # Page principale
│   │   └── api/          # Endpoints API
│   ├── components/       # Composants React
│   │   ├── Header.tsx    # <- Modifie le header ici
│   │   ├── StatusTable.tsx
│   │   ├── PricingTable.tsx
│   │   └── Chatbot.tsx
│   ├── db/               # Base de donnees
│   │   ├── index.ts      # Connexion
│   │   └── schema.ts     # Structure des tables
│   └── lib/              # Utilitaires
│       ├── auth.ts       # Configuration auth
│       └── status.ts     # Verification des services
├── drizzle/              # Migrations SQL
├── .env.example          # Template des variables
├── docker-compose.yml    # Configuration Docker
└── package.json          # Dependances
```

---

## Problemes courants

### "ECONNREFUSED" ou "Connection refused"

**Probleme** : La base de donnees n'est pas demarree.

**Solution** :
```bash
docker-compose up -d
docker ps  # Verifie que le container tourne
```

### "Port 5432 already in use"

**Probleme** : Un autre PostgreSQL tourne deja sur ce port.

**Solution** :
```bash
# Arrete l'autre instance
docker stop $(docker ps -q --filter "publish=5432")
# Puis relance
docker-compose up -d
```

### Le bouton "Se connecter" est grise

**Probleme** : Les identifiants Google ne sont pas configures.

**Solution** : Configure `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET` dans `.env`

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

## Besoin d'aide ?

- Ouvre une [issue sur GitHub](https://github.com/One-Up-Dev/OneUp-StarterKit/issues)
- Consulte la [documentation Next.js](https://nextjs.org/docs)
- Consulte la [documentation Drizzle](https://orm.drizzle.team/docs/overview)

---

<p align="center">
  <strong>Fait avec par OneUp</strong>
</p>
