"use client";

import { WizardStep } from "@/lib/setup/types";

interface WizardStepperProps {
  steps: WizardStep[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export default function WizardStepper({
  steps,
  currentStep,
  onStepClick,
}: WizardStepperProps) {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-center justify-center space-x-2 md:space-x-4">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = step.completed;
          const isPast = step.id < currentStep;
          const isClickable = isCompleted || isPast || step.id <= currentStep;

          return (
            <li key={step.id} className="flex items-center">
              {/* Connector line */}
              {index > 0 && (
                <div
                  className={`hidden h-0.5 w-8 md:block md:w-12 ${
                    isPast || isCompleted
                      ? "bg-blue-500"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              )}

              {/* Step button */}
              <button
                onClick={() => isClickable && onStepClick(step.id)}
                disabled={!isClickable}
                className={`group flex flex-col items-center ${
                  isClickable ? "cursor-pointer" : "cursor-not-allowed"
                }`}
                aria-current={isActive ? "step" : undefined}
              >
                {/* Step circle */}
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-medium transition-all ${
                    isActive
                      ? "bg-blue-500 text-white ring-4 ring-blue-100 dark:ring-blue-900"
                      : isCompleted || isPast
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                  } ${
                    isClickable && !isActive
                      ? "group-hover:ring-2 group-hover:ring-blue-200 dark:group-hover:ring-blue-800"
                      : ""
                  }`}
                >
                  {isCompleted || isPast ? (
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <span>{step.icon}</span>
                  )}
                </span>

                {/* Step label */}
                <span
                  className={`mt-2 text-xs font-medium md:text-sm ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : isCompleted || isPast
                        ? "text-gray-700 dark:text-gray-300"
                        : "text-gray-500 dark:text-gray-500"
                  }`}
                >
                  {step.name}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
