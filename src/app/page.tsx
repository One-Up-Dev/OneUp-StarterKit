"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import StatusTable from "@/components/StatusTable";
import { signIn } from "@/lib/auth-client";

export default function Home() {
  const [authEnabled, setAuthEnabled] = useState(false);

  const handleAuthStatusChange = useCallback((enabled: boolean) => {
    setAuthEnabled(enabled);
  }, []);

  const handleLogin = async () => {
    // Use BetterAuth client signIn for Google OAuth
    await signIn.social({
      provider: "google",
      callbackURL: "/profile",
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header authEnabled={authEnabled} onLogin={handleLogin} />

      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-2xl flex-col items-center justify-center px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-semibold text-gray-900 dark:text-white">
            Starter-Kit
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Verifiez la configuration de vos services
          </p>
        </div>

        <div className="w-full max-w-lg">
          <StatusTable onAuthStatusChange={handleAuthStatusChange} />
        </div>
      </main>
    </div>
  );
}
