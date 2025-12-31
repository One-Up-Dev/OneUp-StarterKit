"use client";

import { useEffect, useState } from "react";

interface ServiceStatus {
  connected: boolean;
  message?: string;
}

interface AllServicesStatus {
  database: ServiceStatus;
  auth: ServiceStatus;
  polar: ServiceStatus;
  openrouter: ServiceStatus;
}

interface StatusTableProps {
  onAuthStatusChange?: (enabled: boolean) => void;
}

export default function StatusTable({ onAuthStatusChange }: StatusTableProps) {
  const [statuses, setStatuses] = useState<AllServicesStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStatuses() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/status");
        if (!response.ok) {
          throw new Error("Failed to fetch statuses");
        }
        const data = await response.json();
        setStatuses(data);
        onAuthStatusChange?.(data.auth.connected);
      } catch (err) {
        console.error("Error fetching statuses:", err);
        setError("Impossible de recuperer les statuts des services");
      } finally {
        setLoading(false);
      }
    }

    fetchStatuses();
  }, [onAuthStatusChange]);

  const services = [
    { key: "database", name: "PostgreSQL" },
    { key: "auth", name: "BetterAuth" },
    { key: "polar", name: "Polar" },
    { key: "openrouter", name: "OpenRouter" },
  ] as const;

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <table className="w-full" role="grid" aria-label="Status des services">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white"
            >
              Service
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white"
            >
              Statut
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={2} className="px-6 py-8 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                  <span className="text-gray-500 dark:text-gray-400">
                    Chargement...
                  </span>
                </div>
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td
                colSpan={2}
                className="px-6 py-8 text-center text-red-500 dark:text-red-400"
              >
                {error}
              </td>
            </tr>
          ) : (
            services.map((service, index) => {
              const status = statuses?.[service.key];
              const isConnected = status?.connected ?? false;

              return (
                <tr
                  key={service.key}
                  className={`border-b border-gray-200 last:border-b-0 dark:border-gray-700 ${
                    index % 2 === 1
                      ? "bg-gray-50 dark:bg-gray-900/50"
                      : "bg-white dark:bg-gray-800"
                  }`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {service.name}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                        isConnected
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                      aria-label={
                        isConnected
                          ? `${service.name} connecte`
                          : `${service.name} non configure`
                      }
                    >
                      {isConnected ? (
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {isConnected ? "Connecte" : "Non configure"}
                    </span>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
