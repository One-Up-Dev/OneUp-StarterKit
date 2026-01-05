"use client";

import { ProductConfig, ProductType, PricingTier } from "@/lib/setup/types";
import { productTypeLabels, pricingTemplates } from "@/lib/setup/config";

interface StepProductsProps {
  product: ProductConfig;
  onChange: (product: ProductConfig) => void;
}

export default function StepProducts({ product, onChange }: StepProductsProps) {
  const productTypes = Object.keys(productTypeLabels) as ProductType[];

  const handleTypeChange = (type: ProductType) => {
    onChange({
      type,
      tiers: pricingTemplates[type],
    });
  };

  const handleTierChange = (index: number, field: keyof PricingTier, value: string | number | string[]) => {
    const newTiers = [...product.tiers];
    newTiers[index] = { ...newTiers[index], [field]: value };
    onChange({ ...product, tiers: newTiers });
  };

  const addTier = () => {
    onChange({
      ...product,
      tiers: [
        ...product.tiers,
        {
          name: "Nouveau plan",
          price: 0,
          interval: product.type === "subscription" || product.type === "freemium" ? "month" : undefined,
          features: ["Fonctionnalite 1"],
        },
      ],
    });
  };

  const removeTier = (index: number) => {
    if (product.tiers.length > 1) {
      onChange({
        ...product,
        tiers: product.tiers.filter((_, i) => i !== index),
      });
    }
  };

  const addFeature = (tierIndex: number) => {
    const newTiers = [...product.tiers];
    newTiers[tierIndex] = {
      ...newTiers[tierIndex],
      features: [...newTiers[tierIndex].features, "Nouvelle fonctionnalite"],
    };
    onChange({ ...product, tiers: newTiers });
  };

  const removeFeature = (tierIndex: number, featureIndex: number) => {
    const newTiers = [...product.tiers];
    newTiers[tierIndex] = {
      ...newTiers[tierIndex],
      features: newTiers[tierIndex].features.filter((_, i) => i !== featureIndex),
    };
    onChange({ ...product, tiers: newTiers });
  };

  const updateFeature = (tierIndex: number, featureIndex: number, value: string) => {
    const newTiers = [...product.tiers];
    const newFeatures = [...newTiers[tierIndex].features];
    newFeatures[featureIndex] = value;
    newTiers[tierIndex] = { ...newTiers[tierIndex], features: newFeatures };
    onChange({ ...product, tiers: newTiers });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Type de produit et tarification
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Definissez comment vous allez monetiser votre SaaS
        </p>
      </div>

      {/* Product type selection */}
      <div className="mb-8">
        <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Type de monetisation
        </label>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {productTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleTypeChange(type)}
              className={`border p-4 text-left transition-all ${
                product.type === type
                  ? "border-gray-900 bg-gray-50 dark:border-white dark:bg-gray-800"
                  : "border-gray-200 bg-white hover:border-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-500"
              }`}
            >
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {productTypeLabels[type].name}
              </h4>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {productTypeLabels[type].description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Pricing tiers */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Plans tarifaires
          </label>
          <button
            type="button"
            onClick={addTier}
            className="flex items-center gap-1 border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-900 dark:border-gray-600 dark:text-gray-300 dark:hover:border-white"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Ajouter un plan
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {product.tiers.map((tier, tierIndex) => (
            <div
              key={tierIndex}
              className="relative border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800"
            >
              {/* Remove button */}
              {product.tiers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTier(tierIndex)}
                  className="absolute right-2 top-2 p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              {/* Tier name */}
              <input
                type="text"
                value={tier.name}
                onChange={(e) => handleTierChange(tierIndex, "name", e.target.value)}
                className="mb-4 w-full border-b border-gray-200 bg-transparent pb-2 text-lg font-semibold text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:text-white"
                placeholder="Nom du plan"
              />

              {/* Price */}
              <div className="mb-4 flex items-end gap-2">
                <div className="flex-1">
                  <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">
                    Prix
                  </label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={tier.price}
                      onChange={(e) => handleTierChange(tierIndex, "price", parseFloat(e.target.value) || 0)}
                      className="w-24 border border-gray-300 px-3 py-2 text-xl font-bold text-gray-900 focus:border-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-white"
                      min="0"
                    />
                    <span className="ml-2 text-gray-600 dark:text-gray-400">EUR</span>
                  </div>
                </div>

                {(product.type === "subscription" || product.type === "freemium" || product.type === "usage-based") && tier.price > 0 && (
                  <select
                    value={tier.interval || "month"}
                    onChange={(e) => handleTierChange(tierIndex, "interval", e.target.value as "month" | "year")}
                    className="border border-gray-300 px-3 py-2 text-gray-700 focus:border-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:focus:border-white"
                  >
                    <option value="month">/mois</option>
                    <option value="year">/an</option>
                  </select>
                )}
              </div>

              {/* Features */}
              <div>
                <label className="mb-2 block text-xs text-gray-500 dark:text-gray-400">
                  Fonctionnalites incluses
                </label>
                <div className="space-y-2">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(tierIndex, featureIndex, e.target.value)}
                        className="flex-1 rounded border border-transparent bg-transparent px-2 py-1 text-sm text-gray-700 focus:border-gray-300 focus:outline-none dark:text-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => removeFeature(tierIndex, featureIndex)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addFeature(tierIndex)}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
