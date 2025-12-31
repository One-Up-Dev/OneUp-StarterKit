"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import Chatbot from "@/components/Chatbot";

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface SessionData {
  user: User | null;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [openRouterEnabled, setOpenRouterEnabled] = useState(false);

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetch("/api/auth/get-session");
        if (response.ok) {
          const data: SessionData = await response.json();
          if (data.user) {
            setUser(data.user);
          } else {
            router.push("/");
          }
        } else {
          router.push("/");
        }
      } catch {
        router.push("/");
      } finally {
        setLoading(false);
      }
    }

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

    checkSession();
    checkOpenRouter();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/sign-out", { method: "POST" });
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-900">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header user={user} authEnabled={true} onLogout={handleLogout} />

      <main className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Bonjour, {user.name || "Utilisateur"}!
          </h1>
        </div>

        {/* User Info Card */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Informations du profil
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              {user.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  alt={user.name || "Avatar"}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-xl font-medium text-white">
                  {user.name?.charAt(0) || user.email.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {user.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chatbot Section */}
        <Chatbot enabled={openRouterEnabled} />
      </main>
    </div>
  );
}
