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
    simple: "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30",
    medium: "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30",
    complex: "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30",
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
      <div className="mb-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
        {/* Header with branding */}
        <div
          className="p-6"
          style={{ backgroundColor: config.identity.primaryColor }}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/20 text-3xl font-bold text-white backdrop-blur-sm">
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
            <span className={`rounded-full px-3 py-1 text-sm font-medium ${complexityColors[complexity]}`}>
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
                  className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm dark:bg-gray-700"
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
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
        <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">
          Fonctionnalites selectionnees
        </h4>
        <div className="grid gap-2 sm:grid-cols-2">
          {selectedFeatures.map((feature) => (
            <div
              key={feature!.id}
              className="flex items-center gap-2 rounded-lg bg-gray-50 p-2 dark:bg-gray-700/50"
            >
              <span className="text-lg">{feature!.icon}</span>
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
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
          <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">
            Dependances a installer
          </h4>
          <div className="flex flex-wrap gap-2">
            {allDependencies.map((dep) => (
              <span
                key={dep}
                className="rounded-full bg-blue-100 px-3 py-1 font-mono text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
              >
                {dep}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* What will happen */}
      <div className="mb-8 rounded-xl border border-green-200 bg-green-50 p-5 dark:border-green-800 dark:bg-green-900/20">
        <h4 className="mb-3 flex items-center gap-2 font-semibold text-green-800 dark:text-green-200">
          <span>🚀</span> Ce qui va se passer
        </h4>
        <ol className="space-y-2 text-sm text-green-700 dark:text-green-300">
          <li className="flex items-start gap-2">
            <span className="font-medium">1.</span>
            Claude Code va analyser votre configuration
          </li>
          <li className="flex items-start gap-2">
            <span className="font-medium">2.</span>
            Les dependances seront installees automatiquement
          </li>
          <li className="flex items-start gap-2">
            <span className="font-medium">3.</span>
            Les fichiers et composants seront generes
          </li>
          <li className="flex items-start gap-2">
            <span className="font-medium">4.</span>
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
          className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Generation en cours...
            </>
          ) : (
            <>
              <span>🎉</span>
              Generer mon projet
            </>
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
