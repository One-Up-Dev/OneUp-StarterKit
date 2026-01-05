"use client";

import { useState } from "react";
import { FeatureCategory } from "@/lib/setup/types";
import { getFeaturesByCategory, categoryLabels } from "@/lib/setup/features";
import FeatureCard from "./FeatureCard";

interface StepFeaturesProps {
  selectedFeatures: string[];
  recommendedFeatures: string[];
  onChange: (features: string[]) => void;
  onAskAI: (question: string) => void;
}

export default function StepFeatures({
  selectedFeatures,
  recommendedFeatures,
  onChange,
  onAskAI,
}: StepFeaturesProps) {
  const [activeCategory, setActiveCategory] = useState<FeatureCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const featuresByCategory = getFeaturesByCategory();
  const categories = Object.keys(featuresByCategory) as FeatureCategory[];

  const toggleFeature = (featureId: string) => {
    if (selectedFeatures.includes(featureId)) {
      onChange(selectedFeatures.filter((id) => id !== featureId));
    } else {
      onChange([...selectedFeatures, featureId]);
    }
  };

  // Filter features
  const getFilteredFeatures = () => {
    let features =
      activeCategory === "all"
        ? Object.values(featuresByCategory).flat()
        : featuresByCategory[activeCategory];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      features = features.filter(
        (f) =>
          f.name.toLowerCase().includes(query) ||
          f.description.toLowerCase().includes(query)
      );
    }

    return features;
  };

  const filteredFeatures = getFilteredFeatures();

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Fonctionnalites
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Selectionnez les fonctionnalites que vous souhaitez integrer
        </p>
      </div>

      {/* AI suggestion bar */}
      <div className="mb-6 border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 items-center justify-center border border-gray-900 dark:border-white">
            <span className="text-sm font-bold text-gray-900 dark:text-white">IA</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Besoin d&apos;aide pour choisir ?
            </p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Decrivez votre projet et l&apos;IA vous suggerera les meilleures fonctionnalites.
            </p>
            <button
              onClick={() => onAskAI("Quelles fonctionnalites me recommandes-tu ?")}
              className="mt-2 bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
            >
              Demander a l&apos;IA
            </button>
          </div>
        </div>
      </div>

      {/* Search and filter */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une fonctionnalite..."
            className="w-full border border-gray-300 py-2 pl-10 pr-4 text-gray-900 focus:border-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-white"
          />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`border px-3 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === "all"
                ? "border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-gray-900"
                : "border-gray-300 text-gray-700 hover:border-gray-900 dark:border-gray-600 dark:text-gray-300 dark:hover:border-white"
            }`}
          >
            Tout
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`border px-3 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-gray-900"
                  : "border-gray-300 text-gray-700 hover:border-gray-900 dark:border-gray-600 dark:text-gray-300 dark:hover:border-white"
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Selected count */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {filteredFeatures.length} fonctionnalites disponibles
        </span>
        <span className="border border-gray-900 px-3 py-1 text-sm font-medium text-gray-900 dark:border-white dark:text-white">
          {selectedFeatures.length} selectionnees
        </span>
      </div>

      {/* Features grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredFeatures.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            selected={selectedFeatures.includes(feature.id)}
            recommended={recommendedFeatures.includes(feature.id)}
            onToggle={() => toggleFeature(feature.id)}
          />
        ))}
      </div>

      {filteredFeatures.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Aucune fonctionnalite ne correspond a votre recherche
          </p>
        </div>
      )}
    </div>
  );
}
