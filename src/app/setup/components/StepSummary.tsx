"use client";

import { ProjectConfig } from "@/lib/setup/types";
import { getFeatureById, calculateDependencies, calculateProjectComplexity } from "@/lib/setup/features";
import { getDesignSystemById } from "@/lib/setup/design-systems";
import { productTypeLabels } from "@/lib/setup/config";

interface StepSummaryProps {
  config: ProjectConfig;
  onGenerate: () => void;
  isGenerating: boolean;
}

export default function StepSummary({ config, onGenerate, isGenerating }: StepSummaryProps) {
  const selectedFeatures = config.features.map((id) => getFeatureById(id)).filter(Boolean);
  const designSystem = getDesignSystemById(config.designSystem);
  const dependencies = calculateDependencies(config.features);
  const { totalFiles, complexity } = calculateProjectComplexity(config.features);

  // Add design system dependencies
  const allDependencies = [...new Set([...dependencies, ...(designSystem?.dependencies || [])])];

  const complexityColors = {
    simple: "text-green-600 border-green-600 dark:text-green-400 dark:border-green-400",
    medium: "text-yellow-600 border-yellow-600 dark:text-yellow-400 dark:border-yellow-400",
    complex: "text-red-600 border-red-600 dark:text-red-400 dark:border-red-400",
  };

  const complexityLabels = {
    simple: "Projet simple",
    medium: "Projet moyen",
    complex: "Projet complexe",
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Resume de votre projet
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Verifiez la configuration avant de lancer la generation
        </p>
      </div>

      {/* Project card */}
      <div className="mb-6 overflow-hidden border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        {/* Header with branding */}
        <div
          className="p-6"
          style={{ backgroundColor: config.identity.primaryColor }}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center bg-white/20 text-3xl font-bold text-white backdrop-blur-sm">
              {config.identity.name ? config.identity.name.charAt(0).toUpperCase() : "?"}
            </div>
            <div className="text-white">
              <h3 className="text-2xl font-bold">
                {config.identity.name || "Mon Projet"}
              </h3>
              <p className="mt-1 opacity-90">
                {config.identity.description || "Description du projet"}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 divide-x divide-gray-200 border-b border-gray-200 dark:divide-gray-700 dark:border-gray-700">
          <div className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedFeatures.length}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Fonctionnalites</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ~{totalFiles}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Fichiers</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {allDependencies.length}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Dependances</p>
          </div>
        </div>

        {/* Details */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {/* Complexity */}
          <div className="flex items-center justify-between p-4">
            <span className="text-gray-600 dark:text-gray-400">Complexite</span>
            <span className={`border px-3 py-1 text-sm font-medium ${complexityColors[complexity]}`}>
              {complexityLabels[complexity]}
            </span>
          </div>

          {/* Design System */}
          <div className="flex items-center justify-between p-4">
            <span className="text-gray-600 dark:text-gray-400">Systeme de design</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {designSystem?.name || "Non defini"}
            </span>
          </div>

          {/* Product Type */}
          <div className="flex items-center justify-between p-4">
            <span className="text-gray-600 dark:text-gray-400">Type de produit</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {productTypeLabels[config.product.type].name}
            </span>
          </div>

          {/* Pricing Tiers */}
          <div className="p-4">
            <span className="text-gray-600 dark:text-gray-400">Plans tarifaires</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {config.product.tiers.map((tier, index) => (
                <span
                  key={index}
                  className="border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm dark:border-gray-600 dark:bg-gray-700"
                >
                  <span className="font-medium text-gray-900 dark:text-white">
                    {tier.name}
                  </span>
                  <span className="ml-2 text-gray-500 dark:text-gray-400">
                    {tier.price}EUR{tier.interval ? `/${tier.interval === "month" ? "mois" : "an"}` : ""}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features list */}
      <div className="mb-6 border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
        <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">
          Fonctionnalites selectionnees
        </h4>
        <div className="grid gap-2 sm:grid-cols-2">
          {selectedFeatures.map((feature) => (
            <div
              key={feature!.id}
              className="flex items-center gap-2 border border-gray-100 bg-gray-50 p-2 dark:border-gray-600 dark:bg-gray-700/50"
            >
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {feature!.name}
              </span>
            </div>
          ))}
          {selectedFeatures.length === 0 && (
            <p className="col-span-2 text-sm text-gray-500 dark:text-gray-400">
              Aucune fonctionnalite selectionnee
            </p>
          )}
        </div>
      </div>

      {/* Dependencies list */}
      {allDependencies.length > 0 && (
        <div className="mb-6 border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
          <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">
            Dependances a installer
          </h4>
          <div className="flex flex-wrap gap-2">
            {allDependencies.map((dep) => (
              <span
                key={dep}
                className="border border-gray-300 bg-gray-50 px-3 py-1 font-mono text-xs text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
              >
                {dep}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* What will happen */}
      <div className="mb-8 border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800">
        <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
          Ce qui va se passer
        </h4>
        <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-start gap-2">
            <span className="font-medium text-gray-900 dark:text-white">1.</span>
            Claude Code va analyser votre configuration
          </li>
          <li className="flex items-start gap-2">
            <span className="font-medium text-gray-900 dark:text-white">2.</span>
            Les dependances seront installees automatiquement
          </li>
          <li className="flex items-start gap-2">
            <span className="font-medium text-gray-900 dark:text-white">3.</span>
            Les fichiers et composants seront generes
          </li>
          <li className="flex items-start gap-2">
            <span className="font-medium text-gray-900 dark:text-white">4.</span>
            Vous pourrez ameliorer le design avec le plugin frontend-design
          </li>
        </ol>
      </div>

      {/* Generate button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating || !config.identity.name}
          className="flex items-center gap-3 bg-gray-900 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
        >
          {isGenerating ? (
            <>
              <div className="h-5 w-5 animate-spin border-2 border-white border-t-transparent dark:border-gray-900 dark:border-t-transparent" />
              Generation en cours...
            </>
          ) : (
            <>Generer mon projet</>
          )}
        </button>
      </div>

      {!config.identity.name && (
        <p className="mt-4 text-center text-sm text-red-500">
          Veuillez renseigner le nom du projet avant de continuer
        </p>
      )}
    </div>
  );
}
