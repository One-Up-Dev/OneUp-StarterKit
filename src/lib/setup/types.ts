// Types pour la configuration du projet OneUp

export interface ProjectIdentity {
  name: string;
  description: string;
  primaryColor: string;
  logo?: string;
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  category: FeatureCategory;
  icon: string;
  dependencies: string[];
  complexity: "simple" | "medium" | "complex";
  estimatedFiles: number;
}

export type FeatureCategory =
  | "core"
  | "ecommerce"
  | "content"
  | "communication"
  | "analytics"
  | "admin"
  | "integration";

export interface DesignSystem {
  id: string;
  name: string;
  description: string;
  preview: string;
  dependencies: string[];
  installCommand: string;
}

export type ProductType = "subscription" | "one-time" | "freemium" | "usage-based" | "none";

export interface PricingTier {
  name: string;
  price: number;
  interval?: "month" | "year";
  features: string[];
}

export interface ProductConfig {
  type: ProductType;
  tiers: PricingTier[];
}

export interface ProjectConfig {
  version: string;
  identity: ProjectIdentity;
  features: string[]; // Feature IDs
  designSystem: string; // DesignSystem ID
  product: ProductConfig;
  createdAt: string;
  updatedAt: string;
}

export interface WizardStep {
  id: number;
  name: string;
  description: string;
  icon: string;
  completed: boolean;
}

export interface AIMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AISuggestion {
  features: string[];
  reasoning: string;
  additionalTips: string[];
}
