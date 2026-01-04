import { Feature, FeatureCategory } from "./types";

// Catalogue complet des fonctionnalites disponibles
export const features: Feature[] = [
  // === CORE ===
  {
    id: "auth-social",
    name: "Authentification sociale",
    description: "Connexion via Google, GitHub, Discord et autres providers OAuth",
    category: "core",
    icon: "🔐",
    dependencies: ["better-auth"],
    complexity: "simple",
    estimatedFiles: 3,
  },
  {
    id: "auth-magic-link",
    name: "Magic Link",
    description: "Connexion sans mot de passe via email",
    category: "core",
    icon: "✨",
    dependencies: ["better-auth", "resend"],
    complexity: "medium",
    estimatedFiles: 4,
  },
  {
    id: "user-profile",
    name: "Profil utilisateur",
    description: "Page de profil avec avatar, informations et parametres",
    category: "core",
    icon: "👤",
    dependencies: [],
    complexity: "simple",
    estimatedFiles: 3,
  },
  {
    id: "multi-tenant",
    name: "Multi-tenant",
    description: "Support pour plusieurs organisations/equipes",
    category: "core",
    icon: "🏢",
    dependencies: [],
    complexity: "complex",
    estimatedFiles: 8,
  },

  // === E-COMMERCE ===
  {
    id: "product-catalog",
    name: "Catalogue produits",
    description: "Liste de produits avec categories, filtres et recherche",
    category: "ecommerce",
    icon: "📦",
    dependencies: [],
    complexity: "medium",
    estimatedFiles: 6,
  },
  {
    id: "shopping-cart",
    name: "Panier d'achat",
    description: "Panier persistant avec gestion des quantites",
    category: "ecommerce",
    icon: "🛒",
    dependencies: ["zustand"],
    complexity: "medium",
    estimatedFiles: 5,
  },
  {
    id: "checkout",
    name: "Tunnel de paiement",
    description: "Processus de checkout complet avec Stripe/Polar",
    category: "ecommerce",
    icon: "💳",
    dependencies: ["@polar-sh/sdk"],
    complexity: "complex",
    estimatedFiles: 7,
  },
  {
    id: "order-management",
    name: "Gestion des commandes",
    description: "Suivi des commandes, historique et statuts",
    category: "ecommerce",
    icon: "📋",
    dependencies: [],
    complexity: "medium",
    estimatedFiles: 5,
  },
  {
    id: "inventory",
    name: "Gestion des stocks",
    description: "Suivi des stocks avec alertes de rupture",
    category: "ecommerce",
    icon: "📊",
    dependencies: [],
    complexity: "medium",
    estimatedFiles: 4,
  },
  {
    id: "product-reviews",
    name: "Avis produits",
    description: "Systeme d'avis et notes avec moderation",
    category: "ecommerce",
    icon: "⭐",
    dependencies: [],
    complexity: "medium",
    estimatedFiles: 5,
  },
  {
    id: "wishlist",
    name: "Liste de souhaits",
    description: "Favoris et liste d'envies pour les utilisateurs",
    category: "ecommerce",
    icon: "❤️",
    dependencies: [],
    complexity: "simple",
    estimatedFiles: 3,
  },
  {
    id: "coupons",
    name: "Codes promo",
    description: "Systeme de coupons et reductions",
    category: "ecommerce",
    icon: "🎟️",
    dependencies: [],
    complexity: "medium",
    estimatedFiles: 4,
  },
  {
    id: "shipping",
    name: "Gestion livraison",
    description: "Calcul des frais de port et suivi colis",
    category: "ecommerce",
    icon: "🚚",
    dependencies: [],
    complexity: "complex",
    estimatedFiles: 6,
  },

  // === CONTENT ===
  {
    id: "blog",
    name: "Blog",
    description: "Systeme de blog avec articles MDX et categories",
    category: "content",
    icon: "📝",
    dependencies: ["next-mdx-remote", "@next/mdx"],
    complexity: "medium",
    estimatedFiles: 6,
  },
  {
    id: "landing-pages",
    name: "Landing pages",
    description: "Templates de pages d'atterrissage optimisees",
    category: "content",
    icon: "🎯",
    dependencies: [],
    complexity: "simple",
    estimatedFiles: 4,
  },
  {
    id: "faq",
    name: "FAQ",
    description: "Page de questions frequentes avec accordeon",
    category: "content",
    icon: "❓",
    dependencies: [],
    complexity: "simple",
    estimatedFiles: 2,
  },
  {
    id: "documentation",
    name: "Documentation",
    description: "Site de documentation avec recherche",
    category: "content",
    icon: "📚",
    dependencies: ["next-mdx-remote", "fumadocs"],
    complexity: "complex",
    estimatedFiles: 8,
  },
  {
    id: "changelog",
    name: "Changelog",
    description: "Journal des mises a jour du produit",
    category: "content",
    icon: "📰",
    dependencies: [],
    complexity: "simple",
    estimatedFiles: 3,
  },

  // === COMMUNICATION ===
  {
    id: "newsletter",
    name: "Newsletter",
    description: "Capture d'emails et envoi de newsletters",
    category: "communication",
    icon: "📧",
    dependencies: ["resend"],
    complexity: "medium",
    estimatedFiles: 4,
  },
  {
    id: "notifications-email",
    name: "Emails transactionnels",
    description: "Emails automatiques (bienvenue, confirmation, etc.)",
    category: "communication",
    icon: "📬",
    dependencies: ["resend", "react-email"],
    complexity: "medium",
    estimatedFiles: 6,
  },
  {
    id: "notifications-push",
    name: "Notifications push",
    description: "Notifications navigateur en temps reel",
    category: "communication",
    icon: "🔔",
    dependencies: ["web-push"],
    complexity: "complex",
    estimatedFiles: 5,
  },
  {
    id: "chat-support",
    name: "Chat support",
    description: "Widget de chat pour le support client",
    category: "communication",
    icon: "💬",
    dependencies: [],
    complexity: "complex",
    estimatedFiles: 7,
  },
  {
    id: "contact-form",
    name: "Formulaire de contact",
    description: "Page de contact avec envoi d'email",
    category: "communication",
    icon: "✉️",
    dependencies: ["resend"],
    complexity: "simple",
    estimatedFiles: 3,
  },

  // === ANALYTICS ===
  {
    id: "analytics-basic",
    name: "Analytics de base",
    description: "Suivi des pages vues et evenements cles",
    category: "analytics",
    icon: "📈",
    dependencies: [],
    complexity: "simple",
    estimatedFiles: 3,
  },
  {
    id: "analytics-plausible",
    name: "Plausible Analytics",
    description: "Integration Plausible pour analytics respectueux de la vie privee",
    category: "analytics",
    icon: "🔒",
    dependencies: ["plausible-tracker"],
    complexity: "simple",
    estimatedFiles: 2,
  },
  {
    id: "user-tracking",
    name: "Suivi utilisateur",
    description: "Tracking des actions utilisateur et funnels",
    category: "analytics",
    icon: "👁️",
    dependencies: [],
    complexity: "medium",
    estimatedFiles: 4,
  },

  // === ADMIN ===
  {
    id: "admin-dashboard",
    name: "Dashboard admin",
    description: "Interface d'administration complete",
    category: "admin",
    icon: "🎛️",
    dependencies: ["recharts", "@tanstack/react-table"],
    complexity: "complex",
    estimatedFiles: 10,
  },
  {
    id: "user-management",
    name: "Gestion utilisateurs",
    description: "CRUD utilisateurs avec roles et permissions",
    category: "admin",
    icon: "👥",
    dependencies: [],
    complexity: "medium",
    estimatedFiles: 5,
  },
  {
    id: "content-moderation",
    name: "Moderation contenu",
    description: "Outils de moderation pour UGC",
    category: "admin",
    icon: "🛡️",
    dependencies: [],
    complexity: "medium",
    estimatedFiles: 4,
  },

  // === INTEGRATION ===
  {
    id: "api-public",
    name: "API publique",
    description: "API REST documentee pour integrations tierces",
    category: "integration",
    icon: "🔌",
    dependencies: ["swagger-ui-react"],
    complexity: "complex",
    estimatedFiles: 8,
  },
  {
    id: "webhooks",
    name: "Webhooks",
    description: "Systeme de webhooks pour evenements",
    category: "integration",
    icon: "🪝",
    dependencies: [],
    complexity: "medium",
    estimatedFiles: 5,
  },
  {
    id: "file-upload",
    name: "Upload de fichiers",
    description: "Telechargement de fichiers avec stockage cloud",
    category: "integration",
    icon: "📤",
    dependencies: ["uploadthing"],
    complexity: "medium",
    estimatedFiles: 4,
  },
  {
    id: "ai-assistant",
    name: "Assistant IA",
    description: "Chatbot IA integre pour les utilisateurs",
    category: "integration",
    icon: "🤖",
    dependencies: [],
    complexity: "medium",
    estimatedFiles: 4,
  },
];

// Grouper les features par categorie
export function getFeaturesByCategory(): Record<FeatureCategory, Feature[]> {
  const grouped: Record<FeatureCategory, Feature[]> = {
    core: [],
    ecommerce: [],
    content: [],
    communication: [],
    analytics: [],
    admin: [],
    integration: [],
  };

  for (const feature of features) {
    grouped[feature.category].push(feature);
  }

  return grouped;
}

// Labels des categories en francais
export const categoryLabels: Record<FeatureCategory, string> = {
  core: "Fonctionnalites de base",
  ecommerce: "E-commerce",
  content: "Contenu",
  communication: "Communication",
  analytics: "Analytics",
  admin: "Administration",
  integration: "Integrations",
};

// Obtenir une feature par son ID
export function getFeatureById(id: string): Feature | undefined {
  return features.find((f) => f.id === id);
}

// Calculer les dependances totales pour une liste de features
export function calculateDependencies(featureIds: string[]): string[] {
  const deps = new Set<string>();

  for (const id of featureIds) {
    const feature = getFeatureById(id);
    if (feature) {
      for (const dep of feature.dependencies) {
        deps.add(dep);
      }
    }
  }

  return Array.from(deps);
}

// Calculer la complexite totale du projet
export function calculateProjectComplexity(featureIds: string[]): {
  totalFiles: number;
  complexity: "simple" | "medium" | "complex";
} {
  let totalFiles = 0;
  let complexCount = 0;
  let mediumCount = 0;

  for (const id of featureIds) {
    const feature = getFeatureById(id);
    if (feature) {
      totalFiles += feature.estimatedFiles;
      if (feature.complexity === "complex") complexCount++;
      else if (feature.complexity === "medium") mediumCount++;
    }
  }

  let complexity: "simple" | "medium" | "complex" = "simple";
  if (complexCount >= 2 || (complexCount >= 1 && mediumCount >= 3)) {
    complexity = "complex";
  } else if (mediumCount >= 2 || complexCount >= 1) {
    complexity = "medium";
  }

  return { totalFiles, complexity };
}
