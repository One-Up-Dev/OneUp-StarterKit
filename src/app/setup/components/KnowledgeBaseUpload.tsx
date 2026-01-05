"use client";

import { useState, useRef, useCallback } from "react";
import { KnowledgeBase, KnowledgeFile } from "@/lib/setup/types";

interface KnowledgeBaseUploadProps {
  knowledgeBase: KnowledgeBase;
  onChange: (knowledgeBase: KnowledgeBase) => void;
}

const ACCEPTED_TYPES = [
  "text/plain",
  "text/markdown",
  "application/json",
  "text/csv",
  "application/pdf",
];

const ACCEPTED_EXTENSIONS = [".txt", ".md", ".json", ".csv", ".pdf"];

export default function KnowledgeBaseUpload({
  knowledgeBase,
  onChange,
}: KnowledgeBaseUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const extractTextContent = async (file: File): Promise<string> => {
    // Pour les fichiers texte simples
    if (file.type === "text/plain" || file.type === "text/markdown" || file.type === "text/csv") {
      return await file.text();
    }

    // Pour JSON
    if (file.type === "application/json") {
      const text = await file.text();
      try {
        const json = JSON.parse(text);
        return JSON.stringify(json, null, 2);
      } catch {
        return text;
      }
    }

    // Pour PDF - extraction basique (dans un vrai projet, utiliser pdf.js)
    if (file.type === "application/pdf") {
      // Retourne un placeholder - en production, utiliser une vraie lib PDF
      return `[Contenu PDF: ${file.name}]\n\nNote: L'extraction PDF complete necessite une configuration serveur.`;
    }

    return await file.text();
  };

  const processFile = useCallback(
    async (file: File) => {
      setError(null);
      setIsProcessing(true);

      try {
        // Verifier la taille (max 5 Mo)
        if (file.size > 5 * 1024 * 1024) {
          setError("Le fichier doit faire moins de 5 Mo");
          return;
        }

        // Verifier le type
        const isAcceptedType = ACCEPTED_TYPES.includes(file.type);
        const isAcceptedExt = ACCEPTED_EXTENSIONS.some((ext) =>
          file.name.toLowerCase().endsWith(ext)
        );

        if (!isAcceptedType && !isAcceptedExt) {
          setError("Format non supporte. Utilisez: TXT, MD, JSON, CSV, PDF");
          return;
        }

        // Extraire le contenu textuel
        const content = await extractTextContent(file);

        // Verifier que le contenu n'est pas vide
        if (!content.trim()) {
          setError("Le fichier semble vide");
          return;
        }

        const knowledgeFile: KnowledgeFile = {
          name: file.name,
          type: file.type || "text/plain",
          size: file.size,
          content: content,
          uploadedAt: new Date().toISOString(),
        };

        onChange({
          ...knowledgeBase,
          enabled: true,
          file: knowledgeFile,
        });
      } catch (err) {
        console.error("Erreur traitement fichier:", err);
        setError("Erreur lors de la lecture du fichier");
      } finally {
        setIsProcessing(false);
      }
    },
    [knowledgeBase, onChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        processFile(files[0]);
      }
    },
    [processFile]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        processFile(files[0]);
      }
    },
    [processFile]
  );

  const handleRemove = useCallback(() => {
    onChange({
      ...knowledgeBase,
      enabled: false,
      file: undefined,
    });
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [knowledgeBase, onChange]);

  const handleToggleRestrict = useCallback(() => {
    onChange({
      ...knowledgeBase,
      restrictToContent: !knowledgeBase.restrictToContent,
    });
  }, [knowledgeBase, onChange]);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} o`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
  };

  const getContentPreview = (content: string): string => {
    const maxLength = 200;
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  return (
    <div className="mt-6 border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 dark:text-white">
          Base de connaissances (RAG)
        </h4>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Uploadez un fichier pour que le chatbot reponde uniquement a partir de son contenu
        </p>
      </div>

      {knowledgeBase.file ? (
        // Fichier uploade
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4 border border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-700">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="truncate font-medium text-gray-900 dark:text-white">
                  {knowledgeBase.file.name}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {formatFileSize(knowledgeBase.file.size)} - {knowledgeBase.file.content.length} caracteres
              </p>
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-300 font-mono bg-gray-100 dark:bg-gray-600 p-2">
                {getContentPreview(knowledgeBase.file.content)}
              </p>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              title="Supprimer"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>

          {/* Option restriction */}
          <label className="flex cursor-pointer items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Restreindre au contenu du fichier
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Le chatbot refusera de repondre aux questions hors sujet
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={knowledgeBase.restrictToContent}
              onClick={handleToggleRestrict}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center transition-colors ${
                knowledgeBase.restrictToContent
                  ? "bg-gray-900 dark:bg-white"
                  : "bg-gray-200 dark:bg-gray-600"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform transition-transform ${
                  knowledgeBase.restrictToContent
                    ? "translate-x-5 bg-white dark:bg-gray-900"
                    : "translate-x-0.5 bg-white dark:bg-gray-300"
                }`}
              />
            </button>
          </label>

          {/* Avertissement securite */}
          <div className="flex gap-2 bg-yellow-50 border border-yellow-200 p-3 dark:bg-yellow-900/20 dark:border-yellow-800">
            <svg
              className="h-5 w-5 text-yellow-600 dark:text-yellow-400 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-xs text-yellow-700 dark:text-yellow-300">
              Protection anti-injection activee. Le chatbot ignorera les tentatives de manipulation du prompt.
            </p>
          </div>
        </div>
      ) : (
        // Zone d'upload
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center border-2 border-dashed p-6 transition-colors ${
            isDragging
              ? "border-gray-900 bg-gray-100 dark:border-white dark:bg-gray-700"
              : "border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 animate-spin border-2 border-gray-400 border-t-transparent" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Traitement en cours...
              </span>
            </div>
          ) : (
            <>
              <svg
                className="h-10 w-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium text-gray-900 dark:text-white">
                  Cliquez pour telecharger
                </span>{" "}
                ou glissez-deposez
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                TXT, MD, JSON, CSV, PDF (max 5 Mo)
              </p>
            </>
          )}
        </div>
      )}

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.md,.json,.csv,.pdf"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
