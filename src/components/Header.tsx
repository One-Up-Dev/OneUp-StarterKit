"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useSyncExternalStore } from "react";

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

// Theme store for dark mode
const themeStore = {
  listeners: new Set<() => void>(),
  getSnapshot(): boolean {
    if (typeof window === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  },
  getServerSnapshot(): boolean {
    return false;
  },
  subscribe(listener: () => void): () => void {
    themeStore.listeners.add(listener);
    return () => themeStore.listeners.delete(listener);
  },
  toggle(): void {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    themeStore.listeners.forEach((listener) => listener());
  },
  initialize(): void {
    if (typeof window === "undefined") return;
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    }
  },
};

// Initialize on module load (client-side only)
if (typeof window !== "undefined") {
  themeStore.initialize();
}

export default function Header({
  user,
  authEnabled = false,
  onLogin,
  onLogout,
}: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const isDarkMode = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot,
  );
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showMenu]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-xl font-semibold text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
        >
          Starter-Kit
        </Link>

        <div className="flex items-center gap-3">
          {/* Theme toggle button */}
          <button
            onClick={() => themeStore.toggle()}
            className="rounded-lg p-2 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            aria-label={
              isDarkMode ? "Passer au mode clair" : "Passer au mode sombre"
            }
          >
            {isDarkMode ? (
              // Sun icon for dark mode (click to go light)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            ) : (
              // Moon icon for light mode (click to go dark)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            )}
          </button>

          <div className="relative" ref={menuRef}>
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
      </div>
    </header>
  );
}
