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
      <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🤖</span>
          <div className="flex-1">
            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Besoin d&apos;aide pour choisir ?
            </p>
            <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
              Decrivez votre projet et l&apos;IA vous suggerera les meilleures fonctionnalites.
            </p>
            <button
              onClick={() => onAskAI("Quelles fonctionnalites me recommandes-tu ?")}
              className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
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
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Tout
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
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
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
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
