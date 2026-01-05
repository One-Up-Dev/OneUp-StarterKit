"use client";

import { useState } from "react";

interface KnowledgeBaseConfig {
  content: string;
  restrictToContent: boolean;
}

interface ChatbotProps {
  enabled: boolean;
  knowledgeBase?: KnowledgeBaseConfig;
}

export default function Chatbot({ enabled, knowledgeBase }: ChatbotProps) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim() || loading || !enabled) return;

    setLoading(true);
    setError(null);

    try {
      const requestBody: { prompt: string; knowledgeBase?: KnowledgeBaseConfig } = {
        prompt: prompt.trim(),
      };

      // Ajouter la knowledge base si presente
      if (knowledgeBase?.content) {
        requestBody.knowledgeBase = knowledgeBase;
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de la requete");
      }

      const data = await res.json();
      setResponse(data.response);
      setPrompt("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Une erreur s'est produite",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPrompt("");
    setResponse("");
    setError(null);
  };

  return (
    <div className="relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Disabled overlay */}
      {!enabled && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-gray-900/50 backdrop-blur-sm">
          <div className="rounded-lg bg-white p-4 text-center shadow-lg dark:bg-gray-800">
            <p className="font-medium text-gray-900 dark:text-white">
              Assistant IA desactive
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Veuillez configurer votre cle API OpenRouter dans le fichier .env
            </p>
          </div>
        </div>
      )}

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Assistant IA
        </h2>
        {knowledgeBase?.content && (
          <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Base de connaissances active
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="chat-input" className="sr-only">
            Votre message
          </label>
          <div className="flex gap-2">
            <input
              id="chat-input"
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Posez votre question..."
              disabled={!enabled || loading}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-60 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:disabled:bg-gray-800"
              aria-label="Votre message"
            />
            <button
              type="submit"
              disabled={!enabled || loading || !prompt.trim()}
              className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-60 dark:disabled:bg-gray-600"
              aria-label="Envoyer le message"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Response area */}
      {(response || error) && (
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Reponse
            </h3>
            <button
              onClick={handleClear}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Effacer la reponse"
            >
              Effacer
            </button>
          </div>
          <div
            className={`mt-2 rounded-lg p-4 ${
              error
                ? "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                : "bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white"
            }`}
            role={error ? "alert" : undefined}
            aria-live="polite"
          >
            {error || response}
          </div>
        </div>
      )}
    </div>
  );
}
