"use client";

import { designSystems } from "@/lib/setup/design-systems";

interface StepDesignProps {
  selectedDesignSystem: string;
  onChange: (designSystemId: string) => void;
}

export default function StepDesign({ selectedDesignSystem, onChange }: StepDesignProps) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Systeme de design
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Choisissez la bibliotheque de composants pour votre interface
        </p>
      </div>

      {/* Info box */}
      <div className="mb-6 border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex gap-3">
          <div className="flex h-6 w-6 items-center justify-center border border-gray-900 dark:border-white">
            <span className="text-xs font-bold text-gray-900 dark:text-white">i</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Conseil
            </p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              shadcn/ui est recommande pour la plupart des projets. Il offre des composants
              elegants, accessibles et hautement personnalisables.
            </p>
          </div>
        </div>
      </div>

      {/* Design systems grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {designSystems.map((ds) => (
          <button
            key={ds.id}
            type="button"
            onClick={() => onChange(ds.id)}
            className={`relative border p-5 text-left transition-all ${
              selectedDesignSystem === ds.id
                ? "border-gray-900 bg-gray-50 dark:border-white dark:bg-gray-800"
                : "border-gray-200 bg-white hover:border-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-500"
            }`}
          >
            {/* Selected indicator */}
            {selectedDesignSystem === ds.id && (
              <div className="absolute right-3 top-3">
                <div className="flex h-6 w-6 items-center justify-center bg-gray-900 dark:bg-white">
                  <svg
                    className="h-4 w-4 text-white dark:text-gray-900"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            )}

            {/* Content */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {ds.name}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {ds.description}
            </p>

            {/* Dependencies count */}
            <div className="mt-4 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
              {ds.dependencies.length > 0 ? (
                <span className="flex items-center gap-1">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                  {ds.dependencies.length} dependances
                </span>
              ) : (
                <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Aucune dependance
                </span>
              )}

              {ds.installCommand && (
                <span className="flex items-center gap-1">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Installation auto
                </span>
              )}
            </div>

            {/* Popular badge for shadcn */}
            {ds.id === "shadcn" && (
              <span className="absolute -top-2 left-4 border border-gray-900 bg-gray-900 px-2 py-0.5 text-xs font-medium text-white dark:border-white dark:bg-white dark:text-gray-900">
                Populaire
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Selected preview */}
      {selectedDesignSystem && (
        <div className="mt-8 border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800/50">
          <h4 className="mb-3 font-medium text-gray-900 dark:text-white">
            Commande d&apos;installation
          </h4>
          <div className="flex items-center gap-2 bg-gray-900 p-3 font-mono text-sm text-green-400">
            <span className="text-gray-500">$</span>
            <code>
              {designSystems.find((ds) => ds.id === selectedDesignSystem)?.installCommand ||
                "Aucune installation requise"}
            </code>
          </div>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Cette commande sera executee automatiquement lors de la generation du projet.
          </p>
        </div>
      )}
    </div>
  );
}
