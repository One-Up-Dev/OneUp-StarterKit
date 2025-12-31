"use client";

import Link from "next/link";
import Header from "@/components/Header";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header authEnabled={false} />
      <main className="flex flex-col items-center justify-center px-4 py-24">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
            404
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Cette page n&apos;a pas ete trouvee.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-600"
          >
            Retour a l&apos;accueil
          </Link>
        </div>
      </main>
    </div>
  );
}
