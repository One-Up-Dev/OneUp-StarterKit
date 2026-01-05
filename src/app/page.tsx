"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import StatusTable from "@/components/StatusTable";
import PricingTable from "@/components/PricingTable";
import Chatbot from "@/components/Chatbot";
import { signIn, signOut, useSession } from "@/lib/auth-client";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const [authEnabled, setAuthEnabled] = useState(false);
  const [openRouterEnabled, setOpenRouterEnabled] = useState(false);

  const handleAuthStatusChange = useCallback((enabled: boolean) => {
    setAuthEnabled(enabled);
  }, []);

  // Check Auth status directly (more reliable than callback)
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/status/auth");
        if (response.ok) {
          const data = await response.json();
          setAuthEnabled(data.connected);
        }
      } catch {
        setAuthEnabled(false);
      }
    }
    checkAuth();
  }, []);

  // Check OpenRouter status
  useEffect(() => {
    async function checkOpenRouter() {
      try {
        const response = await fetch("/api/status/openrouter");
        if (response.ok) {
          const data = await response.json();
          setOpenRouterEnabled(data.connected);
        }
      } catch {
        setOpenRouterEnabled(false);
      }
    }
    checkOpenRouter();
  }, []);

  const handleLogin = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  const handleLogout = async () => {
    await signOut();
    router.refresh();
  };

  // Map session user to Header user format
  const user = session?.user
    ? {
        name: session.user.name || "",
        email: session.user.email || "",
        avatarUrl: session.user.image || undefined,
      }
    : null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header
        user={user}
        authEnabled={authEnabled}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-semibold text-gray-900 dark:text-white">
            Starter-Kit
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {user
              ? `Bienvenue, ${user.name || "Utilisateur"}`
              : "Verifiez la configuration de vos services"}
          </p>
          {user && (
            <a
              href="/setup"
              className="mt-4 inline-flex items-center gap-2 border border-gray-900 bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-gray-800 dark:border-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
            >
              Configurer mon projet
            </a>
          )}
        </div>

        <div className="mx-auto mb-12 w-full max-w-lg">
          <StatusTable onAuthStatusChange={handleAuthStatusChange} />
        </div>

        <PricingTable />

        {/* Chatbot - visible only when logged in */}
        {user && (
          <div className="mx-auto mt-12 max-w-2xl">
            <Chatbot enabled={openRouterEnabled} />
          </div>
        )}
      </main>
    </div>
  );
}
