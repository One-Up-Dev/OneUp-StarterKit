"use client";

import { useState, useEffect } from "react";
import { ProjectConfig, WizardStep, AIMessage } from "@/lib/setup/types";
import { getDefaultConfig } from "@/lib/setup/config";
import WizardStepper from "./components/WizardStepper";
import StepIdentity from "./components/StepIdentity";
import StepFeatures from "./components/StepFeatures";
import StepProducts from "./components/StepProducts";
import StepDesign from "./components/StepDesign";
import StepSummary from "./components/StepSummary";
import AIAssistant from "./components/AIAssistant";

const WIZARD_STEPS: WizardStep[] = [
  { id: 1, name: "Identite", description: "Nom et branding", icon: "🎨", completed: false },
  { id: 2, name: "Fonctionnalites", description: "Choisir les features", icon: "⚡", completed: false },
  { id: 3, name: "Produit", description: "Type et tarification", icon: "💰", completed: false },
  { id: 4, name: "Design", description: "Systeme UI", icon: "🎯", completed: false },
  { id: 5, name: "Resume", description: "Valider et generer", icon: "🚀", completed: false },
];

export default function SetupWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState<ProjectConfig>(getDefaultConfig());
  const [steps, setSteps] = useState<WizardStep[]>(WIZARD_STEPS);
  const [showAI, setShowAI] = useState(false);
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [recommendedFeatures, setRecommendedFeatures] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);

  // Load saved config on mount
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const res = await fetch("/api/setup/config");
        if (res.ok) {
          const data = await res.json();
          if (data.config) {
            setConfig(data.config);
          }
        }
      } catch (error) {
        console.error("Erreur lors du chargement de la configuration:", error);
      }
    };
    loadConfig();
  }, []);

  // Save config on change
  useEffect(() => {
    const saveConfig = async () => {
      try {
        await fetch("/api/setup/config", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ config: { ...config, updatedAt: new Date().toISOString() } }),
        });
      } catch (error) {
        console.error("Erreur lors de la sauvegarde:", error);
      }
    };

    const timeoutId = setTimeout(saveConfig, 500);
    return () => clearTimeout(timeoutId);
  }, [config]);

  const updateStepCompletion = (stepId: number, completed: boolean) => {
    setSteps((prev) =>
      prev.map((step) => (step.id === stepId ? { ...step, completed } : step))
    );
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= 5) {
      // Mark current step as completed if moving forward
      if (step > currentStep) {
        updateStepCompletion(currentStep, true);
      }
      setCurrentStep(step);
    }
  };

  const handleNext = () => {
    updateStepCompletion(currentStep, true);
    goToStep(currentStep + 1);
  };

  const handlePrevious = () => {
    goToStep(currentStep - 1);
  };

  const handleAISendMessage = async (message: string) => {
    setAiMessages((prev) => [...prev, { role: "user", content: message }]);
    setAiLoading(true);

    try {
      const res = await fetch("/api/setup/ai-suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          context: {
            identity: config.identity,
            currentFeatures: config.features,
            currentStep,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setAiMessages((prev) => [...prev, { role: "assistant", content: data.response }]);

        // If AI suggested features, update recommendations
        if (data.suggestedFeatures) {
          setRecommendedFeatures(data.suggestedFeatures);
        }
      } else {
        setAiMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Desole, une erreur s'est produite. Veuillez reessayer." },
        ]);
      }
    } catch {
      setAiMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Erreur de connexion. Verifiez votre connexion internet." },
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      const res = await fetch("/api/setup/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config }),
      });

      if (res.ok) {
        setGenerationComplete(true);
      } else {
        alert("Erreur lors de la generation. Veuillez reessayer.");
      }
    } catch {
      alert("Erreur de connexion.");
    } finally {
      setIsGenerating(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return config.identity.name.trim().length > 0;
      case 2:
        return true; // Features are optional
      case 3:
        return config.product.tiers.length > 0;
      case 4:
        return config.designSystem.length > 0;
      case 5:
        return config.identity.name.trim().length > 0;
      default:
        return true;
    }
  };

  if (generationComplete) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="max-w-lg text-center">
          <div className="mb-6 text-6xl">🎉</div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            Configuration terminee !
          </h1>
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            Votre configuration a ete sauvegardee dans <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">oneup.config.json</code>.
            Utilisez maintenant Claude Code avec la commande <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">/project-setup</code> pour generer votre projet.
          </p>
          <div className="space-y-4">
            <div className="rounded-xl bg-gray-900 p-4 text-left font-mono text-sm text-green-400">
              <p className="text-gray-500"># Dans votre terminal Claude Code:</p>
              <p>/project-setup</p>
            </div>
            <a
              href="/"
              className="inline-block rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600"
            >
              Retour a l&apos;accueil
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Main content */}
      <div className={`flex-1 transition-all ${showAI ? "mr-80" : ""}`}>
        <div className="mx-auto max-w-5xl px-4 py-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a
                href="/"
                className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Retour
              </a>
            </div>
            <button
              onClick={() => setShowAI(!showAI)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                showAI
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              <span>🤖</span>
              Assistant IA
            </button>
          </div>

          {/* Stepper */}
          <WizardStepper steps={steps} currentStep={currentStep} onStepClick={goToStep} />

          {/* Step content */}
          <div className="mb-8 min-h-[400px]">
            {currentStep === 1 && (
              <StepIdentity
                identity={config.identity}
                onChange={(identity) => setConfig({ ...config, identity })}
              />
            )}
            {currentStep === 2 && (
              <StepFeatures
                selectedFeatures={config.features}
                recommendedFeatures={recommendedFeatures}
                onChange={(features) => setConfig({ ...config, features })}
                onAskAI={(question) => {
                  setShowAI(true);
                  handleAISendMessage(question);
                }}
              />
            )}
            {currentStep === 3 && (
              <StepProducts
                product={config.product}
                onChange={(product) => setConfig({ ...config, product })}
              />
            )}
            {currentStep === 4 && (
              <StepDesign
                selectedDesignSystem={config.designSystem}
                onChange={(designSystem) => setConfig({ ...config, designSystem })}
              />
            )}
            {currentStep === 5 && (
              <StepSummary
                config={config}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
              />
            )}
          </div>

          {/* Navigation */}
          {currentStep < 5 && (
            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Precedent
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Suivant
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* AI Assistant sidebar */}
      {showAI && (
        <div className="fixed right-0 top-0 h-screen w-80 border-l border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
              <span className="font-semibold text-gray-900 dark:text-white">Assistant</span>
              <button
                onClick={() => setShowAI(false)}
                className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <AIAssistant
                messages={aiMessages}
                onSendMessage={handleAISendMessage}
                isLoading={aiLoading}
                context={`Etape ${currentStep}: ${steps[currentStep - 1].name}`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
