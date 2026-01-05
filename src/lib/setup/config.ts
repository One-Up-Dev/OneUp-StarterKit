import { ProjectConfig, ProductType, PricingTier, ContextQuestion } from "./types";

// Configuration par defaut du projet
export function getDefaultConfig(): ProjectConfig {
  return {
    version: "1.0.0",
    identity: {
      name: "",
      description: "",
      primaryColor: "#3b82f6",
      logo: undefined,
    },
    features: [],
    designSystem: "shadcn",
    product: {
      type: "subscription",
      tiers: [
        {
          name: "Basic",
          price: 9,
          interval: "month",
          features: ["Fonctionnalite 1", "Fonctionnalite 2"],
        },
        {
          name: "Pro",
          price: 29,
          interval: "month",
          features: ["Tout Basic", "Fonctionnalite 3", "Fonctionnalite 4"],
        },
        {
          name: "Enterprise",
          price: 99,
          interval: "month",
          features: ["Tout Pro", "Support prioritaire", "API illimitee"],
        },
      ],
    },
    assets: {},
    context: {
      enabled: false,
      answers: [],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// Questions contextuelles pour le Q&A
export const contextQuestions: ContextQuestion[] = [
  // Questions generales (toujours)
  {
    id: "target-audience",
    question: "Qui est votre audience cible ?",
    placeholder: "Ex: Developpeurs, PME, etudiants, freelances...",
    triggers: [{ type: "always" }],
  },
  {
    id: "unique-value",
    question: "Quelle est votre proposition de valeur unique ?",
    placeholder: "Ex: Le seul outil qui combine X et Y en un seul endroit...",
    triggers: [{ type: "always" }],
  },

  // Landing page / Portfolio
  {
    id: "your-skills",
    question: "Quelles sont vos competences principales ?",
    placeholder: "Ex: Developpement web, design UI/UX, marketing digital...",
    triggers: [
      { type: "feature", value: "landing-pages" },
      { type: "productType", value: "none" },
    ],
  },
  {
    id: "social-links",
    question: "Quels sont vos liens professionnels (GitHub, LinkedIn, Twitter) ?",
    placeholder: "Ex: github.com/user, linkedin.com/in/user...",
    triggers: [
      { type: "feature", value: "landing-pages" },
      { type: "productType", value: "none" },
    ],
  },
  {
    id: "contact-email",
    question: "Quel email de contact voulez-vous afficher ?",
    placeholder: "Ex: contact@monsite.com",
    triggers: [
      { type: "feature", value: "contact-form" },
      { type: "feature", value: "landing-pages" },
    ],
  },

  // E-commerce
  {
    id: "product-types",
    question: "Quels types de produits allez-vous vendre ?",
    placeholder: "Ex: Vetements, ebooks, formations, logiciels...",
    triggers: [
      { type: "feature", value: "product-catalog" },
      { type: "feature", value: "shopping-cart" },
    ],
  },
  {
    id: "price-range",
    question: "Quelle est la fourchette de prix de vos produits ?",
    placeholder: "Ex: 10-50 EUR, 100-500 EUR...",
    triggers: [
      { type: "feature", value: "product-catalog" },
      { type: "feature", value: "checkout" },
    ],
  },
  {
    id: "shipping-zones",
    question: "Dans quelles zones geographiques livrez-vous ?",
    placeholder: "Ex: France uniquement, Europe, Monde entier...",
    triggers: [{ type: "feature", value: "shipping" }],
  },

  // Blog / Content
  {
    id: "content-topics",
    question: "Quels sujets allez-vous aborder dans vos contenus ?",
    placeholder: "Ex: Tech, business, lifestyle, tutoriels...",
    triggers: [
      { type: "feature", value: "blog" },
      { type: "feature", value: "documentation" },
    ],
  },
  {
    id: "publish-frequency",
    question: "A quelle frequence prevoyez-vous de publier ?",
    placeholder: "Ex: 1 article/semaine, 2 articles/mois...",
    triggers: [{ type: "feature", value: "blog" }],
  },

  // SaaS specifique
  {
    id: "user-roles",
    question: "Quels roles d'utilisateurs prevoyez-vous ?",
    placeholder: "Ex: Admin, Manager, User, Guest...",
    triggers: [
      { type: "feature", value: "user-management" },
      { type: "feature", value: "multi-tenant" },
    ],
  },
  {
    id: "data-retention",
    question: "Quelle politique de retention des donnees souhaitez-vous ?",
    placeholder: "Ex: 30 jours, 1 an, illimite...",
    triggers: [{ type: "feature", value: "analytics-basic" }],
  },
];

// Templates de pricing par type de produit
export const pricingTemplates: Record<ProductType, PricingTier[]> = {
  subscription: [
    {
      name: "Starter",
      price: 9,
      interval: "month",
      features: ["1 utilisateur", "100 Mo stockage", "Support email"],
    },
    {
      name: "Pro",
      price: 29,
      interval: "month",
      features: ["5 utilisateurs", "1 Go stockage", "Support prioritaire", "API access"],
    },
    {
      name: "Enterprise",
      price: 99,
      interval: "month",
      features: ["Utilisateurs illimites", "10 Go stockage", "Support 24/7", "API illimitee", "SSO"],
    },
  ],
  "one-time": [
    {
      name: "Licence Standard",
      price: 49,
      features: ["Acces a vie", "Mises a jour 1 an", "Support email"],
    },
    {
      name: "Licence Pro",
      price: 149,
      features: ["Acces a vie", "Mises a jour a vie", "Support prioritaire", "Sources incluses"],
    },
  ],
  freemium: [
    {
      name: "Gratuit",
      price: 0,
      features: ["Fonctionnalites de base", "Publicites", "Support communaute"],
    },
    {
      name: "Premium",
      price: 19,
      interval: "month",
      features: ["Toutes les fonctionnalites", "Sans publicites", "Support email"],
    },
  ],
  "usage-based": [
    {
      name: "Pay as you go",
      price: 0,
      features: ["0.01 EUR par requete", "Pas de minimum", "API access"],
    },
    {
      name: "Volume",
      price: 99,
      interval: "month",
      features: ["10 000 requetes incluses", "0.005 EUR au-dela", "Support prioritaire"],
    },
  ],
  none: [],
};

// Labels des types de produits en francais
export const productTypeLabels: Record<ProductType, { name: string; description: string }> = {
  subscription: {
    name: "Abonnement",
    description: "Paiement recurrent mensuel ou annuel",
  },
  "one-time": {
    name: "Paiement unique",
    description: "Achat unique avec acces permanent",
  },
  freemium: {
    name: "Freemium",
    description: "Version gratuite + options payantes",
  },
  "usage-based": {
    name: "A l'usage",
    description: "Facturation basee sur la consommation",
  },
  none: {
    name: "Pas de paiement",
    description: "Landing page, portfolio, site vitrine",
  },
};

// Couleurs predefinies pour le branding
export const brandColors = [
  { name: "Bleu", value: "#3b82f6" },
  { name: "Violet", value: "#8b5cf6" },
  { name: "Rose", value: "#ec4899" },
  { name: "Rouge", value: "#ef4444" },
  { name: "Orange", value: "#f97316" },
  { name: "Jaune", value: "#eab308" },
  { name: "Vert", value: "#22c55e" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Indigo", value: "#6366f1" },
  { name: "Gris", value: "#6b7280" },
];
