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
                  className={`hidden h-px w-8 md:block md:w-12 ${
                    isPast || isCompleted
                      ? "bg-gray-900 dark:bg-white"
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
                {/* Step square */}
                <span
                  className={`flex h-10 w-10 items-center justify-center text-sm font-medium transition-all ${
                    isActive
                      ? "border-2 border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-gray-900"
                      : isCompleted || isPast
                        ? "border-2 border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-gray-900"
                        : "border border-gray-300 bg-transparent text-gray-500 dark:border-gray-600 dark:text-gray-400"
                  } ${
                    isClickable && !isActive
                      ? "group-hover:border-gray-900 group-hover:text-gray-900 dark:group-hover:border-white dark:group-hover:text-white"
                      : ""
                  }`}
                >
                  {isCompleted || isPast ? (
                    <svg
                      className="h-4 w-4"
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
                    <span>{step.id}</span>
                  )}
                </span>

                {/* Step label */}
                <span
                  className={`mt-2 text-xs font-medium md:text-sm ${
                    isActive
                      ? "text-gray-900 dark:text-white"
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
