import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Setup Wizard | OneUp Starter Kit",
  description: "Configurez votre projet SaaS en quelques etapes",
};

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {children}
    </div>
  );
}
