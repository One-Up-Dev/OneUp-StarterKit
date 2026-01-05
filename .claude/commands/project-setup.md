# Configuration et Generation de Projet OneUp

Tu es un agent specialise dans la generation de code pour le starter-kit OneUp.
L'utilisateur a configure son projet via l'interface web `/setup` et la configuration est sauvegardee dans `oneup.config.json`.

---

## ETAPE 0: Validation initiale

Avant toute action, verifie que tout est en ordre:

```
1. Verifier que oneup.config.json existe
2. Valider la structure JSON
3. Verifier que les features IDs existent dans le catalogue
4. Verifier que le design system est valide
```

**Si le fichier n'existe pas ou est invalide:**
- Informe l'utilisateur
- Suggere d'aller sur `/setup` pour configurer le projet
- STOP - ne pas continuer

---

## ETAPE 1: Progress Tracking

**Cree ou lis le fichier `SETUP-PROGRESS.md` a la racine du projet.**

Ce fichier permet de:
- Suivre l'avancement de la generation
- Reprendre si le processus est interrompu
- Documenter ce qui a ete fait

### Format du fichier:

```markdown
# Progress de generation OneUp

Projet: [NOM]
Date debut: [DATE]
Derniere mise a jour: [DATE]

## Checklist

### Installation
- [ ] Design system installe
- [ ] Dependances features installees

### Features
- [ ] feature-id-1: Nom de la feature
- [ ] feature-id-2: Nom de la feature
...

### Finalisation
- [ ] Branding applique
- [ ] Pricing configure
- [ ] Build verifie
- [ ] Tests passes

## Notes
[Notes et observations]
```

**IMPORTANT:**
- Au demarrage, lis ce fichier s'il existe pour voir ce qui est deja fait
- Apres chaque etape completee, mets a jour le fichier ([ ] -> [x])
- Si une erreur survient, note-la dans la section "Notes"

---

## ETAPE 2: Recherche de documentation

Quand tu as besoin d'informations sur une librairie:

### Priorite 1: MCP Context7 (si disponible)
```
Utilise mcp__context7__resolve pour obtenir la documentation
Avantage: Documentation precise et a jour
```

### Priorite 2: Fallback WebSearch/WebFetch
```
1. WebSearch pour trouver la documentation officielle
2. WebFetch pour lire la page de documentation
3. Adapte le code selon les bonnes pratiques
```

---

## ETAPE 3: Installation du design system

Selon le `designSystem` dans la config:

| Design System | Commande |
|--------------|----------|
| shadcn | `npx shadcn@latest init -y && npx shadcn@latest add button card input label select textarea checkbox switch tabs dialog dropdown-menu avatar toast` |
| tweakcn | `npx shadcn@latest init -y && npx tweakcn` |
| daisyui | `npm install daisyui` + ajouter aux plugins Tailwind |
| nextui | `npm install @nextui-org/react framer-motion` |
| mantine | `npm install @mantine/core @mantine/hooks` |
| chakra | `npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion` |
| headless | `npm install @headlessui/react` |

**Apres installation:** Met a jour SETUP-PROGRESS.md

---

## ETAPE 4: Generation des features

Pour chaque feature dans `config.features`, genere les fichiers necessaires.

### Structure recommandee:
```
src/
├── app/
│   └── [feature]/           # Pages de la fonctionnalite
│       └── page.tsx
├── components/
│   └── [feature]/           # Composants specifiques
├── lib/
│   └── [feature].ts         # Logique metier
└── api/
    └── [feature]/           # API routes
```

### Workflow recommande avec agents (si disponibles):

Si tu as acces aux agents `coder`, `tester`, `stuck`:

```
Pour chaque feature:
1. Appelle l'agent `coder` pour implementer
2. Appelle l'agent `tester` pour valider visuellement
3. Si probleme → l'agent `stuck` demande a l'humain
4. Met a jour SETUP-PROGRESS.md
```

Sans agents, implemente directement en suivant les templates ci-dessous.

---

## CATALOGUE COMPLET DES FEATURES

### CORE

#### auth-social
**Authentification sociale** - Connexion via Google, GitHub, Discord
```
Fichiers:
- src/lib/auth.ts (modifier pour ajouter providers)
- src/app/api/auth/[...all]/route.ts (deja present)
- src/components/AuthButtons.tsx (boutons de connexion)

Dependances: better-auth (deja installe)

Implementation:
1. Ajouter les providers dans src/lib/auth.ts
2. Configurer les variables d'env (GOOGLE_CLIENT_ID, etc.)
3. Creer les boutons de connexion sociale
```

#### auth-magic-link
**Magic Link** - Connexion sans mot de passe via email
```
Fichiers:
- src/lib/auth.ts (ajouter plugin magicLink)
- src/app/auth/magic-link/page.tsx
- src/emails/MagicLinkEmail.tsx

Dependances: better-auth, resend

Implementation:
1. Ajouter le plugin magicLink dans auth.ts
2. Creer la page de saisie d'email
3. Creer le template d'email avec react-email
```

#### user-profile
**Profil utilisateur** - Page avec avatar, informations et parametres
```
Fichiers:
- src/app/profile/page.tsx
- src/components/profile/ProfileForm.tsx
- src/components/profile/AvatarUpload.tsx

Implementation:
1. Page de profil avec formulaire
2. Upload d'avatar (optionnel: uploadthing)
3. Sauvegarde en base via API
```

#### multi-tenant
**Multi-tenant** - Support pour plusieurs organisations/equipes
```
Fichiers:
- src/lib/db/schema.ts (ajouter table organizations)
- src/app/org/[orgId]/page.tsx
- src/components/org/OrgSwitcher.tsx
- src/lib/org.ts
- src/middleware.ts (gestion du tenant)

Implementation:
1. Schema DB pour organizations et memberships
2. Middleware pour detecter l'organisation
3. Context provider pour l'organisation active
4. Composant de changement d'organisation
```

---

### E-COMMERCE

#### product-catalog
**Catalogue produits** - Liste avec categories, filtres et recherche
```
Fichiers:
- src/lib/db/schema.ts (tables products, categories)
- src/app/products/page.tsx
- src/app/products/[id]/page.tsx
- src/components/products/ProductCard.tsx
- src/components/products/ProductFilters.tsx
- src/lib/products.ts

Implementation:
1. Schema DB pour products et categories
2. Page liste avec filtres (categorie, prix, recherche)
3. Page detail produit
4. Composant ProductCard reutilisable
```

#### shopping-cart
**Panier d'achat** - Panier persistant avec gestion des quantites
```
Fichiers:
- src/store/cart.ts (Zustand store)
- src/components/cart/CartDrawer.tsx
- src/components/cart/CartItem.tsx
- src/components/cart/CartButton.tsx
- src/lib/cart.ts

Dependances: zustand

Implementation:
1. Store Zustand avec persistance localStorage
2. Actions: add, remove, updateQuantity, clear
3. Drawer lateral pour afficher le panier
4. Bouton avec badge du nombre d'articles
```

#### checkout
**Tunnel de paiement** - Processus de checkout complet
```
Fichiers:
- src/app/checkout/page.tsx
- src/app/checkout/success/page.tsx
- src/components/checkout/CheckoutForm.tsx
- src/components/checkout/OrderSummary.tsx
- src/app/api/checkout/route.ts
- src/lib/checkout.ts

Dependances: @polar-sh/sdk (ou stripe)

Implementation:
1. Formulaire multi-etapes (adresse, livraison, paiement)
2. Integration Polar/Stripe pour le paiement
3. Page de confirmation
4. Webhook pour confirmer la commande
```

#### order-management
**Gestion des commandes** - Suivi, historique et statuts
```
Fichiers:
- src/lib/db/schema.ts (table orders, order_items)
- src/app/orders/page.tsx
- src/app/orders/[id]/page.tsx
- src/components/orders/OrderCard.tsx
- src/components/orders/OrderStatus.tsx
- src/lib/orders.ts

Implementation:
1. Schema DB pour orders avec statuts
2. Page liste des commandes de l'utilisateur
3. Page detail avec timeline de statut
4. Envoi d'email a chaque changement de statut
```

#### inventory
**Gestion des stocks** - Suivi avec alertes de rupture
```
Fichiers:
- src/lib/db/schema.ts (champ stock dans products)
- src/app/admin/inventory/page.tsx
- src/components/inventory/StockAlert.tsx
- src/lib/inventory.ts

Implementation:
1. Champ stock dans la table products
2. Decrementation auto lors de commande
3. Alertes admin si stock < seuil
4. Page admin de gestion des stocks
```

#### product-reviews
**Avis produits** - Systeme d'avis et notes avec moderation
```
Fichiers:
- src/lib/db/schema.ts (table reviews)
- src/components/reviews/ReviewForm.tsx
- src/components/reviews/ReviewList.tsx
- src/components/reviews/StarRating.tsx
- src/app/api/reviews/route.ts
- src/lib/reviews.ts

Implementation:
1. Schema DB pour reviews (user, product, rating, comment)
2. Formulaire de soumission d'avis
3. Liste des avis avec pagination
4. Calcul de la moyenne des notes
5. Moderation admin optionnelle
```

#### wishlist
**Liste de souhaits** - Favoris pour les utilisateurs
```
Fichiers:
- src/lib/db/schema.ts (table wishlist)
- src/components/wishlist/WishlistButton.tsx
- src/app/wishlist/page.tsx
- src/lib/wishlist.ts

Implementation:
1. Table wishlist (user_id, product_id)
2. Bouton coeur sur les produits
3. Page liste des favoris
```

#### coupons
**Codes promo** - Systeme de coupons et reductions
```
Fichiers:
- src/lib/db/schema.ts (table coupons)
- src/components/checkout/CouponInput.tsx
- src/app/api/coupons/validate/route.ts
- src/lib/coupons.ts

Implementation:
1. Table coupons (code, discount_type, value, expiry)
2. Input de saisie dans le checkout
3. Validation et application de la reduction
4. Admin pour creer/gerer les coupons
```

#### shipping
**Gestion livraison** - Calcul des frais et suivi colis
```
Fichiers:
- src/lib/db/schema.ts (table shipping_methods, shipments)
- src/components/checkout/ShippingSelector.tsx
- src/app/api/shipping/calculate/route.ts
- src/lib/shipping.ts

Implementation:
1. Methodes de livraison configurables
2. Calcul des frais selon poids/destination
3. Integration transporteur optionnelle
4. Suivi du colis avec numero de tracking
```

---

### CONTENT

#### blog
**Blog** - Systeme avec articles MDX et categories
```
Fichiers:
- src/app/blog/page.tsx
- src/app/blog/[slug]/page.tsx
- src/components/blog/BlogCard.tsx
- src/components/blog/BlogContent.tsx
- src/lib/blog.ts
- content/blog/*.mdx (articles)

Dependances: next-mdx-remote, @next/mdx

Implementation:
1. Dossier content/blog pour les articles MDX
2. Page liste avec pagination
3. Page article avec MDX render
4. Metadata SEO automatique
```

#### landing-pages
**Landing pages** - Templates de pages d'atterrissage
```
Fichiers:
- src/components/landing/Hero.tsx
- src/components/landing/Features.tsx
- src/components/landing/Testimonials.tsx
- src/components/landing/CTA.tsx
- src/components/landing/Pricing.tsx

Implementation:
1. Composants modulaires pour landing
2. Hero avec headline et CTA
3. Section features avec icones
4. Temoignages clients
5. Section pricing
```

#### faq
**FAQ** - Questions frequentes avec accordeon
```
Fichiers:
- src/app/faq/page.tsx
- src/components/faq/FAQAccordion.tsx
- src/lib/faq.ts (donnees FAQ)

Implementation:
1. Page FAQ avec accordeon
2. Donnees FAQ en JSON ou MDX
3. Recherche optionnelle
```

#### documentation
**Documentation** - Site de docs avec recherche
```
Fichiers:
- src/app/docs/[[...slug]]/page.tsx
- src/components/docs/DocsSidebar.tsx
- src/components/docs/DocsContent.tsx
- content/docs/*.mdx

Dependances: next-mdx-remote, fumadocs

Implementation:
1. Structure fumadocs
2. Sidebar avec navigation
3. Recherche full-text
4. Versioning optionnel
```

#### changelog
**Changelog** - Journal des mises a jour
```
Fichiers:
- src/app/changelog/page.tsx
- src/components/changelog/ChangelogEntry.tsx
- content/changelog/*.mdx

Implementation:
1. Page liste des versions
2. Entrees avec date, version, type (feature, fix, etc.)
3. Format MDX pour le contenu
```

---

### COMMUNICATION

#### newsletter
**Newsletter** - Capture d'emails et envoi
```
Fichiers:
- src/components/newsletter/NewsletterForm.tsx
- src/app/api/newsletter/subscribe/route.ts
- src/lib/db/schema.ts (table subscribers)
- src/lib/newsletter.ts

Dependances: resend

Implementation:
1. Formulaire de capture d'email
2. Table subscribers en DB
3. Double opt-in optionnel
4. Integration Resend pour envoi
```

#### notifications-email
**Emails transactionnels** - Emails automatiques
```
Fichiers:
- src/emails/WelcomeEmail.tsx
- src/emails/OrderConfirmation.tsx
- src/emails/PasswordReset.tsx
- src/lib/email.ts

Dependances: resend, react-email

Implementation:
1. Templates react-email
2. Fonction d'envoi centralisee
3. Emails: bienvenue, confirmation commande, reset password
```

#### notifications-push
**Notifications push** - Notifications navigateur
```
Fichiers:
- src/app/api/push/subscribe/route.ts
- src/lib/push.ts
- src/components/push/PushPermission.tsx
- public/sw.js (service worker)

Dependances: web-push

Implementation:
1. Service worker pour recevoir les push
2. Demande de permission
3. Stockage des subscriptions
4. Envoi de notifications
```

#### chat-support
**Chat support** - Widget de chat pour support client
```
Fichiers:
- src/components/chat/ChatWidget.tsx
- src/components/chat/ChatMessage.tsx
- src/app/api/chat/route.ts
- src/lib/chat.ts

Implementation:
1. Widget flottant en bas a droite
2. Interface de conversation
3. Integration IA ou humain
4. Historique des conversations
```

#### contact-form
**Formulaire de contact** - Page de contact
```
Fichiers:
- src/app/contact/page.tsx
- src/components/contact/ContactForm.tsx
- src/app/api/contact/route.ts

Dependances: resend

Implementation:
1. Page avec formulaire (nom, email, message)
2. Envoi d'email a l'admin
3. Confirmation a l'utilisateur
```

---

### ANALYTICS

#### analytics-basic
**Analytics de base** - Suivi des pages vues
```
Fichiers:
- src/components/analytics/Analytics.tsx
- src/lib/analytics.ts
- src/app/api/analytics/track/route.ts

Implementation:
1. Composant a ajouter dans layout
2. Tracking des pages vues
3. Evenements personnalises
4. Dashboard admin basique
```

#### analytics-plausible
**Plausible Analytics** - Analytics respectueux de la vie privee
```
Fichiers:
- src/components/analytics/PlausibleAnalytics.tsx
- src/lib/plausible.ts

Dependances: plausible-tracker

Implementation:
1. Script Plausible dans le head
2. Helper pour events personnalises
3. Configuration du domaine
```

#### user-tracking
**Suivi utilisateur** - Tracking des actions et funnels
```
Fichiers:
- src/lib/tracking.ts
- src/components/tracking/TrackingProvider.tsx
- src/app/api/tracking/route.ts

Implementation:
1. Provider de tracking
2. Hook useTrack pour les evenements
3. Funnels de conversion
4. Dashboard admin
```

---

### ADMIN

#### admin-dashboard
**Dashboard admin** - Interface d'administration complete
```
Fichiers:
- src/app/admin/page.tsx
- src/app/admin/layout.tsx
- src/components/admin/AdminSidebar.tsx
- src/components/admin/StatsCard.tsx
- src/components/admin/Charts.tsx

Dependances: recharts, @tanstack/react-table

Implementation:
1. Layout admin avec sidebar
2. Dashboard avec KPIs
3. Graphiques (ventes, utilisateurs)
4. Tables de donnees
5. Protection par role
```

#### user-management
**Gestion utilisateurs** - CRUD avec roles et permissions
```
Fichiers:
- src/app/admin/users/page.tsx
- src/app/admin/users/[id]/page.tsx
- src/components/admin/UserTable.tsx
- src/lib/admin/users.ts

Implementation:
1. Liste des utilisateurs avec filtres
2. Page detail/edition
3. Gestion des roles
4. Actions (ban, delete, etc.)
```

#### content-moderation
**Moderation contenu** - Outils pour UGC
```
Fichiers:
- src/app/admin/moderation/page.tsx
- src/components/admin/ModerationQueue.tsx
- src/lib/moderation.ts

Implementation:
1. Queue de moderation
2. Actions (approve, reject, flag)
3. Filtres par type de contenu
4. Historique des decisions
```

---

### INTEGRATION

#### api-public
**API publique** - API REST documentee
```
Fichiers:
- src/app/api/v1/[...path]/route.ts
- src/app/api-docs/page.tsx
- src/lib/api/openapi.ts

Dependances: swagger-ui-react

Implementation:
1. Routes API versionnees
2. Authentification par API key
3. Rate limiting
4. Documentation Swagger/OpenAPI
```

#### webhooks
**Webhooks** - Systeme de webhooks pour evenements
```
Fichiers:
- src/lib/db/schema.ts (table webhooks, webhook_logs)
- src/app/admin/webhooks/page.tsx
- src/lib/webhooks.ts

Implementation:
1. Table webhooks (url, events, secret)
2. Interface admin de configuration
3. Envoi avec retry
4. Logs des appels
```

#### file-upload
**Upload de fichiers** - Telechargement avec stockage cloud
```
Fichiers:
- src/app/api/upload/route.ts
- src/components/upload/FileUpload.tsx
- src/lib/upload.ts

Dependances: uploadthing

Implementation:
1. Composant d'upload (drag & drop)
2. Integration uploadthing
3. Validation des fichiers
4. Preview et progression
```

#### ai-assistant
**Assistant IA** - Chatbot IA integre
```
Fichiers:
- src/components/ai/AIChat.tsx (deja present)
- src/app/api/ai/chat/route.ts (deja present)
- Personnaliser selon le contexte du projet

Implementation:
1. Le chatbot existe deja dans le projet
2. Personnaliser le system prompt
3. Ajouter des connaissances specifiques
4. Integrer dans les pages pertinentes
```

---

## ETAPE 5: Branding et personnalisation

Selon `config.identity`:

### Nom et description
```
- src/app/layout.tsx: mettre a jour metadata (title, description)
- src/components/Header.tsx: nom dans le header
- src/components/Footer.tsx: copyright avec le nom
```

### Couleur principale
```
- tailwind.config.ts: ajouter la couleur en tant que 'primary'
- OU src/app/globals.css: variables CSS custom
```

---

## ETAPE 6: Configuration du pricing

Selon `config.product`:

### Si type !== "none"
```
- src/components/pricing/PricingTable.tsx: generer les plans
- Integrer avec Polar si necessaire
- Lier les boutons aux checkouts
```

### Si type === "none"
```
- Ne pas generer de composants de pricing
- Supprimer les references au pricing si presentes
```

---

## ETAPE 7: Tests et verification

### Build verification
```bash
npm run build
```

### Tests si configures
```bash
npm test
```

**Si erreurs:**
- Note les erreurs dans SETUP-PROGRESS.md
- Corrige les problemes
- Re-teste

---

## ETAPE 8: Rapport final

Une fois termine:

1. **Met a jour SETUP-PROGRESS.md** avec toutes les cases cochees
2. **Resume** les fichiers crees
3. **Liste** les prochaines etapes manuelles si necessaires
4. **Propose** d'utiliser le plugin `frontend-design` pour ameliorer le design

### Format du rapport:
```
## Generation terminee

### Fichiers crees
- [liste des fichiers]

### Dependances installees
- [liste des packages]

### Prochaines etapes
1. Configurer les variables d'environnement manquantes
2. Personnaliser les textes et contenus
3. Utiliser /frontend-design pour ameliorer le design
4. Tester manuellement les fonctionnalites
```

---

## Instructions importantes

- **Genere du code propre** et bien commente
- **Respecte le style** du projet (TypeScript, Tailwind CSS)
- **Teste les imports** sont corrects
- **Met a jour SETUP-PROGRESS.md** apres chaque etape
- **Ne continue pas** si une erreur bloquante survient
- **Documente** les problemes rencontres

---

## Demarrage

Commence par:
1. Lire `oneup.config.json`
2. Creer/lire `SETUP-PROGRESS.md`
3. Indiquer a l'utilisateur ce que tu vas generer
4. Demander confirmation avant de commencer
