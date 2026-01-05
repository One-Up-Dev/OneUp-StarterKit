"use client";

import { Feature } from "@/lib/setup/types";

interface FeatureCardProps {
  feature: Feature;
  selected: boolean;
  recommended?: boolean;
  onToggle: () => void;
}

export default function FeatureCard({
  feature,
  selected,
  recommended,
  onToggle,
}: FeatureCardProps) {
  const complexityColors = {
    simple: "border-green-600 text-green-700 dark:border-green-400 dark:text-green-400",
    medium: "border-yellow-600 text-yellow-700 dark:border-yellow-400 dark:text-yellow-400",
    complex: "border-red-600 text-red-700 dark:border-red-400 dark:text-red-400",
  };

  const complexityLabels = {
    simple: "Simple",
    medium: "Moyen",
    complex: "Complexe",
  };

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`group relative flex w-full flex-col border p-4 text-left transition-all ${
        selected
          ? "border-gray-900 bg-gray-50 dark:border-white dark:bg-gray-800"
          : "border-gray-200 bg-white hover:border-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-500"
      }`}
    >
      {/* Recommended badge */}
      {recommended && (
        <span className="absolute -top-2 right-2 border border-gray-900 bg-gray-900 px-2 py-0.5 text-xs font-medium text-white dark:border-white dark:bg-white dark:text-gray-900">
          Recommande
        </span>
      )}

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {feature.name}
          </h4>
        </div>

        {/* Checkbox */}
        <div
          className={`flex h-5 w-5 items-center justify-center border transition-colors ${
            selected
              ? "border-gray-900 bg-gray-900 dark:border-white dark:bg-white"
              : "border-gray-300 dark:border-gray-600"
          }`}
        >
          {selected && (
            <svg
              className="h-3 w-3 text-white dark:text-gray-900"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {feature.description}
      </p>

      {/* Meta */}
      <div className="mt-3 flex items-center gap-2">
        <span
          className={`border px-2 py-0.5 text-xs font-medium ${complexityColors[feature.complexity]}`}
        >
          {complexityLabels[feature.complexity]}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-500">
          ~{feature.estimatedFiles} fichiers
        </span>
        {feature.dependencies.length > 0 && (
          <span className="text-xs text-gray-500 dark:text-gray-500">
            +{feature.dependencies.length} deps
          </span>
        )}
      </div>
    </button>
  );
}
