"use client";

import { ProjectIdentity, ProjectAssets } from "@/lib/setup/types";
import { brandColors } from "@/lib/setup/config";
import AssetUpload from "./AssetUpload";

interface StepIdentityProps {
  identity: ProjectIdentity;
  assets: ProjectAssets;
  onChange: (identity: ProjectIdentity) => void;
  onAssetsChange: (assets: ProjectAssets) => void;
}

export default function StepIdentity({ identity, assets, onChange, onAssetsChange }: StepIdentityProps) {
  const handleChange = (field: keyof ProjectIdentity, value: string) => {
    onChange({ ...identity, [field]: value });
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Identite de votre SaaS
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Donnez vie a votre projet avec un nom et une identite visuelle
        </p>
      </div>

      <div className="space-y-6">
        {/* Nom du projet */}
        <div>
          <label
            htmlFor="project-name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Nom du projet *
          </label>
          <input
            type="text"
            id="project-name"
            value={identity.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Ex: MonSaaS, AppFlow, DataHub..."
            className="mt-1 block w-full border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-white"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Ce nom apparaitra dans le header et le titre de votre application
          </p>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="project-description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Description courte *
          </label>
          <textarea
            id="project-description"
            value={identity.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Decrivez votre projet en quelques phrases. Ex: Une plateforme de gestion de reservations pour restaurants..."
            rows={3}
            className="mt-1 block w-full border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-white"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Cette description aidera l&apos;IA a vous suggerer les meilleures fonctionnalites
          </p>
        </div>

        {/* Couleur principale */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Couleur principale
          </label>
          <div className="mt-3 flex flex-wrap gap-3">
            {brandColors.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => handleChange("primaryColor", color.value)}
                className={`group relative h-10 w-10 transition-transform hover:scale-110 ${
                  identity.primaryColor === color.value
                    ? "ring-2 ring-gray-900 ring-offset-2 dark:ring-white"
                    : ""
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              >
                {identity.primaryColor === color.value && (
                  <svg
                    className="absolute inset-0 m-auto h-5 w-5 text-white drop-shadow-md"
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
              </button>
            ))}

            {/* Custom color picker */}
            <div className="relative">
              <input
                type="color"
                value={identity.primaryColor}
                onChange={(e) => handleChange("primaryColor", e.target.value)}
                className="h-10 w-10 cursor-pointer appearance-none border-2 border-dashed border-gray-300 bg-transparent dark:border-gray-600"
                title="Couleur personnalisee"
              />
            </div>
          </div>
        </div>

        {/* Assets upload */}
        <div className="grid gap-6 md:grid-cols-2">
          <AssetUpload
            label="Logo"
            description="Logo de votre projet (PNG, SVG recommande)"
            accept=".png,.jpg,.jpeg,.svg,.webp,image/*"
            maxSize={1}
            value={assets.logo}
            onChange={(logo) => onAssetsChange({ ...assets, logo })}
          />
          <AssetUpload
            label="Image Hero"
            description="Image pour la section hero de la landing page"
            accept=".png,.jpg,.jpeg,.webp,image/*"
            maxSize={2}
            value={assets.heroImage}
            onChange={(heroImage) => onAssetsChange({ ...assets, heroImage })}
          />
        </div>

        {/* Preview */}
        <div className="border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <p className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">
            Apercu
          </p>
          <div className="flex items-center gap-3">
            {assets.logo ? (
              <img
                src={assets.logo.dataUrl}
                alt="Logo"
                className="h-12 w-12 object-contain"
              />
            ) : (
              <div
                className="flex h-12 w-12 items-center justify-center text-xl font-bold text-white"
                style={{ backgroundColor: identity.primaryColor }}
              >
                {identity.name ? identity.name.charAt(0).toUpperCase() : "?"}
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {identity.name || "Nom du projet"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {identity.description || "Description de votre projet"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
