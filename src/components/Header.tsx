"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface User {
  name: string;
  email: string;
  avatarUrl?: string;
}

interface HeaderProps {
  user?: User | null;
  authEnabled?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
}

export default function Header({
  user,
  authEnabled = false,
  onLogin,
  onLogout,
}: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-xl font-semibold text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
        >
          Starter-Kit
        </Link>

        <div className="relative">
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="User menu"
              >
                {user.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    alt={user.name || "User avatar"}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white">
                    {user.name?.charAt(0) || user.email.charAt(0)}
                  </div>
                )}
              </button>

              {showMenu && (
                <div className="absolute right-0 top-12 min-w-[200px] rounded-lg border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                  <div className="border-b border-gray-200 px-3 py-2 dark:border-gray-700">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onLogout?.();
                    }}
                    className="mt-2 w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    Se deconnecter
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="relative group">
              <button
                onClick={authEnabled ? onLogin : undefined}
                disabled={!authEnabled}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  authEnabled
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "cursor-not-allowed bg-gray-300 text-gray-500 opacity-60"
                }`}
                aria-label={
                  authEnabled
                    ? "Se connecter avec Google"
                    : "Connexion desactivee - configuration Google OAuth manquante"
                }
              >
                Se connecter
              </button>
              {!authEnabled && (
                <div className="invisible absolute right-0 top-full mt-2 w-64 rounded-lg bg-gray-900 p-3 text-sm text-white opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 dark:bg-gray-700">
                  <p>
                    La connexion est desactivee. Veuillez configurer les
                    identifiants Google OAuth dans le fichier .env
                  </p>
                  <div className="absolute -top-2 right-4 border-8 border-transparent border-b-gray-900 dark:border-b-gray-700" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
