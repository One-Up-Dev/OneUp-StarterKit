"use client";

import { useState } from "react";
import { AIMessage } from "@/lib/setup/types";

interface AIAssistantProps {
  messages: AIMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  context?: string;
}

export default function AIAssistant({
  messages,
  onSendMessage,
  isLoading,
  context,
}: AIAssistantProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  const suggestedQuestions = [
    "Quelles fonctionnalites pour un SaaS de reservation ?",
    "Quel design system me recommandes-tu ?",
    "Comment monetiser efficacement ?",
  ];

  return (
    <div className="flex h-full flex-col border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center border border-gray-900 dark:border-white">
            <span className="text-sm font-bold text-gray-900 dark:text-white">IA</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Assistant IA
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {context || "Je vous aide a configurer votre projet"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Bonjour ! Je suis la pour vous aider a configurer votre projet.
              Posez-moi vos questions !
            </p>

            {/* Suggested questions */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Questions suggeres:
              </p>
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => onSendMessage(question)}
                  className="block w-full border border-gray-200 p-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2 ${
                    message.role === "user"
                      ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                      : "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-3 dark:bg-gray-700">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 animate-bounce bg-gray-400" style={{ animationDelay: "0ms" }} />
                    <div className="h-2 w-2 animate-bounce bg-gray-400" style={{ animationDelay: "150ms" }} />
                    <div className="h-2 w-2 animate-bounce bg-gray-400" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 dark:border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question..."
            disabled={isLoading}
            className="flex-1 border border-gray-300 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-white"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-gray-900 px-4 py-2 text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
