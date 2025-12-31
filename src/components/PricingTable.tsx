"use client";

import { useEffect, useState } from "react";

interface ProductStatus {
  id: string;
  name: string;
  slug: string;
  configured: boolean;
  verified: boolean;
  price?: string;
  error?: string;
}

interface PolarProductsStatus {
  polarConnected: boolean;
  products: ProductStatus[];
}

const planFeatures: Record<string, string[]> = {
  basic: ["5 projets", "Support email", "1 utilisateur"],
  pro: ["20 projets", "Support prioritaire", "5 utilisateurs", "API access"],
  elite: [
    "Projets illimites",
    "Support 24/7",
    "Utilisateurs illimites",
    "API access",
    "Custom integrations",
  ],
};

export default function PricingTable() {
  const [status, setStatus] = useState<PolarProductsStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const response = await fetch("/api/status/polar-products");
        if (response.ok) {
          const data = await response.json();
          setStatus(data);
        }
      } catch {
        console.error("Failed to fetch polar products status");
      } finally {
        setLoading(false);
      }
    }
    fetchStatus();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="mb-6 text-center text-xl font-semibold text-gray-900 dark:text-white">
        Configuration des Produits Polar
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        {status?.products.map((product) => (
          <div
            key={product.slug}
            className={`rounded-xl border p-6 ${
              product.verified
                ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                : product.configured
                  ? "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20"
                  : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
            }`}
          >
            {/* Header with status */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {product.name}
              </h3>
              <StatusBadge product={product} />
            </div>

            {/* Price */}
            <div className="mb-4">
              {product.verified && product.price ? (
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {product.price}
                </p>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Prix non configure
                </p>
              )}
            </div>

            {/* Product ID */}
            <div className="mb-4 rounded-lg bg-gray-100 p-3 dark:bg-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Product ID:
              </p>
              <p className="truncate font-mono text-xs text-gray-700 dark:text-gray-300">
                {product.id || "Non configure"}
              </p>
            </div>

            {/* Features */}
            <ul className="space-y-2">
              {planFeatures[product.slug]?.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                >
                  <span className="mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>

            {/* Error message */}
            {product.error && !product.verified && (
              <p className="mt-4 text-xs text-red-500 dark:text-red-400">
                {product.error}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Polar connection status */}
      <div className="mt-6 flex items-center justify-center gap-2 text-sm">
        <span className="text-gray-500 dark:text-gray-400">
          Connexion Polar:
        </span>
        {status?.polarConnected ? (
          <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Connecte
          </span>
        ) : (
          <span className="flex items-center gap-1 text-red-600 dark:text-red-400">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            Non connecte
          </span>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ product }: { product: ProductStatus }) {
  if (product.verified) {
    return (
      <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-800 dark:text-green-300">
        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        Verifie
      </span>
    );
  }

  if (product.configured) {
    return (
      <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300">
        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        Invalide
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
      Non configure
    </span>
  );
}
