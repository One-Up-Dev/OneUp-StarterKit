import { DesignSystem } from "./types";

// Catalogue des systemes de design disponibles
export const designSystems: DesignSystem[] = [
  {
    id: "shadcn",
    name: "shadcn/ui",
    description:
      "Composants elegants et accessibles bases sur Radix UI. Le choix le plus populaire pour les projets Next.js modernes.",
    preview: "/previews/shadcn.png",
    dependencies: [
      "@radix-ui/react-accordion",
      "@radix-ui/react-alert-dialog",
      "@radix-ui/react-avatar",
      "@radix-ui/react-checkbox",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-label",
      "@radix-ui/react-popover",
      "@radix-ui/react-select",
      "@radix-ui/react-separator",
      "@radix-ui/react-slot",
      "@radix-ui/react-switch",
      "@radix-ui/react-tabs",
      "@radix-ui/react-toast",
      "@radix-ui/react-tooltip",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      "lucide-react",
    ],
    installCommand: "npx shadcn@latest init",
  },
  {
    id: "tweakcn",
    name: "tweakcn",
    description:
      "Extension de shadcn/ui avec des variantes de themes preconfigures. Parfait pour personnaliser rapidement le look.",
    preview: "/previews/tweakcn.png",
    dependencies: [
      "@radix-ui/react-accordion",
      "@radix-ui/react-alert-dialog",
      "@radix-ui/react-avatar",
      "@radix-ui/react-checkbox",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-label",
      "@radix-ui/react-popover",
      "@radix-ui/react-select",
      "@radix-ui/react-separator",
      "@radix-ui/react-slot",
      "@radix-ui/react-switch",
      "@radix-ui/react-tabs",
      "@radix-ui/react-toast",
      "@radix-ui/react-tooltip",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      "lucide-react",
    ],
    installCommand: "npx shadcn@latest init && npx tweakcn",
  },
  {
    id: "daisyui",
    name: "daisyUI",
    description:
      "Composants Tailwind CSS prets a l'emploi avec 30+ themes. Simple et rapide a implementer.",
    preview: "/previews/daisyui.png",
    dependencies: ["daisyui"],
    installCommand: "npm install daisyui",
  },
  {
    id: "nextui",
    name: "NextUI",
    description:
      "Bibliotheque de composants moderne avec animations fluides. Design elegant out-of-the-box.",
    preview: "/previews/nextui.png",
    dependencies: [
      "@nextui-org/react",
      "framer-motion",
    ],
    installCommand: "npm install @nextui-org/react framer-motion",
  },
  {
    id: "mantine",
    name: "Mantine",
    description:
      "Bibliotheque complete avec 100+ hooks et composants. Excellent pour les applications complexes.",
    preview: "/previews/mantine.png",
    dependencies: [
      "@mantine/core",
      "@mantine/hooks",
      "@mantine/form",
      "@mantine/notifications",
    ],
    installCommand: "npm install @mantine/core @mantine/hooks",
  },
  {
    id: "chakra",
    name: "Chakra UI",
    description:
      "Composants accessibles et modulaires. Systeme de theming puissant et flexibilite maximale.",
    preview: "/previews/chakra.png",
    dependencies: [
      "@chakra-ui/react",
      "@emotion/react",
      "@emotion/styled",
      "framer-motion",
    ],
    installCommand: "npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion",
  },
  {
    id: "tailwind-only",
    name: "Tailwind CSS (sans librairie)",
    description:
      "Utiliser uniquement Tailwind CSS sans bibliotheque de composants. Controle total sur le design.",
    preview: "/previews/tailwind.png",
    dependencies: [],
    installCommand: "",
  },
];

// Obtenir un design system par son ID
export function getDesignSystemById(id: string): DesignSystem | undefined {
  return designSystems.find((ds) => ds.id === id);
}

// Recommendations de design system par type de projet
export const designRecommendations: Record<string, string[]> = {
  ecommerce: ["shadcn", "nextui", "chakra"],
  saas: ["shadcn", "mantine", "tweakcn"],
  blog: ["tailwind-only", "daisyui"],
  dashboard: ["shadcn", "mantine"],
  startup: ["shadcn", "tweakcn", "nextui"],
};

// Obtenir les design systems recommandes
export function getRecommendedDesignSystems(projectType: string): DesignSystem[] {
  const recommendedIds = designRecommendations[projectType] || ["shadcn"];
  return recommendedIds
    .map((id) => getDesignSystemById(id))
    .filter((ds): ds is DesignSystem => ds !== undefined);
}
