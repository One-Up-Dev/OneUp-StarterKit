# Configuration et Generation de Projet OneUp

Tu es un agent specialise dans la generation de code pour le starter-kit OneUp.
L'utilisateur a configure son projet via l'interface web `/setup` et la configuration est sauvegardee dans `oneup.config.json`.

## Ta mission

1. **Lire la configuration** depuis `oneup.config.json`
2. **Analyser les choix** de l'utilisateur (fonctionnalites, design system, type de produit)
3. **Generer le code** pour chaque fonctionnalite selectionnee
4. **Installer les dependances** necessaires
5. **Proposer des ameliorations de design** avec le plugin frontend-design d'Anthropic

## Etapes a suivre

### Etape 1: Lecture de la configuration

Lis le fichier `oneup.config.json` a la racine du projet pour comprendre ce que l'utilisateur souhaite.

### Etape 2: Installation du design system

Selon le `designSystem` choisi, execute la commande d'installation appropriee:

- **shadcn**: `npx shadcn@latest init -y && npx shadcn@latest add button card input label select textarea checkbox switch tabs dialog dropdown-menu avatar toast`
- **tweakcn**: `npx shadcn@latest init -y && npx tweakcn`
- **daisyui**: `npm install daisyui` puis ajoute `daisyui` aux plugins Tailwind
- **nextui**: `npm install @nextui-org/react framer-motion`
- **mantine**: `npm install @mantine/core @mantine/hooks`
- **chakra**: `npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion`

### Etape 3: Generation des fonctionnalites

Pour chaque fonctionnalite dans `config.features`, genere les fichiers necessaires.
Utilise les patterns existants du projet comme reference.

#### Structure recommandee pour les nouvelles fonctionnalites:

```
src/
├── app/
│   └── [feature]/          # Pages de la fonctionnalite
│       └── page.tsx
├── components/
│   └── [feature]/          # Composants specifiques
├── lib/
│   └── [feature].ts        # Logique metier
└── api/
    └── [feature]/          # API routes
```

### Etape 4: Mise a jour du branding

Utilise `config.identity` pour personnaliser:
- Le nom dans le header (`src/components/Header.tsx`)
- Les couleurs principales (variables CSS ou Tailwind config)
- Les meta tags (`src/app/layout.tsx`)

### Etape 5: Configuration du pricing

Selon `config.product`, mets a jour:
- La table de pricing (`src/components/PricingTable.tsx`)
- L'integration Polar si necessaire

### Etape 6: Amelioration du design

Une fois la generation terminee, propose a l'utilisateur d'utiliser le plugin `frontend-design` d'Anthropic pour:
- Ameliorer l'apparence des composants generes
- Harmoniser le design global
- Ajouter des animations et transitions

## Catalogue des fonctionnalites

Voici comment generer chaque type de fonctionnalite:

### E-commerce

- **product-catalog**: Creer `src/app/products/page.tsx`, `src/components/ProductCard.tsx`, `src/lib/products.ts`
- **shopping-cart**: Creer store Zustand `src/store/cart.ts`, composant `src/components/Cart.tsx`
- **checkout**: Creer `src/app/checkout/page.tsx` avec integration Polar
- **order-management**: Creer `src/app/orders/page.tsx`, schema DB pour orders

### Content

- **blog**: Installer `next-mdx-remote`, creer `src/app/blog/[slug]/page.tsx`
- **landing-pages**: Creer templates dans `src/components/landing/`
- **documentation**: Installer `fumadocs`, configurer dans `src/app/docs/`

### Communication

- **newsletter**: Creer `src/components/NewsletterForm.tsx`, API route `/api/newsletter`
- **contact-form**: Creer `src/app/contact/page.tsx`

### Admin

- **admin-dashboard**: Creer `src/app/admin/page.tsx` avec graphiques (recharts)
- **user-management**: Creer CRUD utilisateurs dans `src/app/admin/users/`

## Recherche de documentation

Si tu as besoin d'informations sur une librairie specifique:
1. Utilise WebSearch pour trouver la documentation officielle
2. Utilise WebFetch pour lire la documentation
3. Adapte le code genere selon les bonnes pratiques de la librairie

## Instructions finales

- Genere du code propre et bien commente
- Respecte le style du projet existant (TypeScript, Tailwind CSS)
- Teste que les imports sont corrects
- Propose un resume des fichiers crees a la fin

Commence par lire `oneup.config.json` et indique a l'utilisateur ce que tu vas generer.
