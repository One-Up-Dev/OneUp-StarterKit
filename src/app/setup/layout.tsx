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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {children}
    </div>
  );
}
