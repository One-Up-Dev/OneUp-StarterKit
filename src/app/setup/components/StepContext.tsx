"use client";

import { ProjectContext, ProjectConfig, ContextQuestion, ContextAnswer } from "@/lib/setup/types";
import { contextQuestions } from "@/lib/setup/config";
import { useMemo } from "react";

interface StepContextProps {
  context: ProjectContext;
  config: ProjectConfig;
  onChange: (context: ProjectContext) => void;
}

export default function StepContext({ context, config, onChange }: StepContextProps) {
  // Filtrer les questions pertinentes selon les features et le type de produit
  const relevantQuestions = useMemo(() => {
    return contextQuestions.filter((q) => {
      return q.triggers.some((trigger) => {
        switch (trigger.type) {
          case "always":
            return true;
          case "feature":
            return config.features.includes(trigger.value || "");
          case "productType":
            return config.product.type === trigger.value;
          default:
            return false;
        }
      });
    });
  }, [config.features, config.product.type]);

  const handleToggle = () => {
    onChange({
      ...context,
      enabled: !context.enabled,
    });
  };

  const handleAnswerChange = (question: ContextQuestion, answer: string) => {
    const existingIndex = context.answers.findIndex((a) => a.questionId === question.id);
    const newAnswer: ContextAnswer = {
      questionId: question.id,
      question: question.question,
      answer,
    };

    let newAnswers: ContextAnswer[];
    if (existingIndex >= 0) {
      newAnswers = [...context.answers];
      newAnswers[existingIndex] = newAnswer;
    } else {
      newAnswers = [...context.answers, newAnswer];
    }

    onChange({
      ...context,
      answers: newAnswers,
    });
  };

  const getAnswer = (questionId: string): string => {
    return context.answers.find((a) => a.questionId === questionId)?.answer || "";
  };

  const answeredCount = context.answers.filter((a) => a.answer.trim().length > 0).length;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Contexte du projet
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Donnez plus de details pour une generation personnalisee
        </p>
      </div>

      {/* Toggle activation */}
      <div className="mb-8 border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
        <label className="flex cursor-pointer items-center justify-between">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Activer le questionnaire
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              L&apos;IA utilisera ces informations pour personnaliser le code genere
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={context.enabled}
            onClick={handleToggle}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center transition-colors ${
              context.enabled
                ? "bg-gray-900 dark:bg-white"
                : "bg-gray-200 dark:bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform transition-transform ${
                context.enabled
                  ? "translate-x-5 bg-white dark:bg-gray-900"
                  : "translate-x-0.5 bg-white dark:bg-gray-300"
              }`}
            />
          </button>
        </label>
      </div>

      {context.enabled && (
        <>
          {/* Progress */}
          <div className="mb-6 flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              {answeredCount} / {relevantQuestions.length} questions repondues
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              {relevantQuestions.length === 0 ? "Aucune question" : "Optionnel"}
            </span>
          </div>

          {/* Questions */}
          {relevantQuestions.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>Selectionnez des fonctionnalites pour voir les questions pertinentes.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {relevantQuestions.map((question, index) => (
                <div key={question.id}>
                  <label
                    htmlFor={`question-${question.id}`}
                    className="flex items-start gap-3"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-gray-100 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {question.question}
                    </span>
                  </label>
                  <div className="mt-2 ml-9">
                    <textarea
                      id={`question-${question.id}`}
                      value={getAnswer(question.id)}
                      onChange={(e) => handleAnswerChange(question, e.target.value)}
                      placeholder={question.placeholder}
                      rows={2}
                      className="w-full border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Info box */}
          <div className="mt-8 flex gap-3 border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center border border-gray-300 text-xs font-bold text-gray-500 dark:border-gray-600 dark:text-gray-400">
              i
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p className="font-medium text-gray-900 dark:text-white">
                Comment ces informations sont utilisees
              </p>
              <ul className="mt-2 list-disc pl-4 space-y-1">
                <li>Pre-remplissage des textes (hero, about, footer)</li>
                <li>Configuration des liens sociaux</li>
                <li>Personnalisation des emails et notifications</li>
                <li>Adaptation des composants e-commerce</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
