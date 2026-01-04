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
    simple: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    complex: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
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
      className={`group relative flex w-full flex-col rounded-xl border-2 p-4 text-left transition-all ${
        selected
          ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
      }`}
    >
      {/* Recommended badge */}
      {recommended && (
        <span className="absolute -top-2 right-2 rounded-full bg-yellow-400 px-2 py-0.5 text-xs font-medium text-yellow-900">
          Recommande
        </span>
      )}

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{feature.icon}</span>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {feature.name}
            </h4>
          </div>
        </div>

        {/* Checkbox */}
        <div
          className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-colors ${
            selected
              ? "border-blue-500 bg-blue-500"
              : "border-gray-300 dark:border-gray-600"
          }`}
        >
          {selected && (
            <svg
              className="h-3 w-3 text-white"
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
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${complexityColors[feature.complexity]}`}
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
