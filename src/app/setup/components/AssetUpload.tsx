"use client";

import { useState, useRef, useCallback } from "react";
import { AssetFile } from "@/lib/setup/types";

interface AssetUploadProps {
  label: string;
  description: string;
  accept: string;
  maxSize?: number; // in MB
  value?: AssetFile;
  onChange: (asset: AssetFile | undefined) => void;
}

export default function AssetUpload({
  label,
  description,
  accept,
  maxSize = 2,
  value,
  onChange,
}: AssetUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    async (file: File) => {
      setError(null);

      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        setError(`Le fichier doit faire moins de ${maxSize} Mo`);
        return;
      }

      // Check file type
      const acceptedTypes = accept.split(",").map((t) => t.trim());
      const isAccepted = acceptedTypes.some((type) => {
        if (type.startsWith(".")) {
          return file.name.toLowerCase().endsWith(type);
        }
        if (type.endsWith("/*")) {
          return file.type.startsWith(type.replace("/*", ""));
        }
        return file.type === type;
      });

      if (!isAccepted) {
        setError("Type de fichier non supporte");
        return;
      }

      // Convert to base64
      const reader = new FileReader();
      reader.onload = () => {
        const asset: AssetFile = {
          name: file.name,
          type: file.type,
          size: file.size,
          dataUrl: reader.result as string,
        };
        onChange(asset);
      };
      reader.onerror = () => {
        setError("Erreur lors de la lecture du fichier");
      };
      reader.readAsDataURL(file);
    },
    [accept, maxSize, onChange]
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
    onChange(undefined);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [onChange]);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} o`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{description}</p>

      {value ? (
        // Preview mode
        <div className="mt-2 flex items-center gap-4 border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          {value.type.startsWith("image/") && (
            <img
              src={value.dataUrl}
              alt={value.name}
              className="h-16 w-16 object-contain"
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
              {value.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formatFileSize(value.size)}
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
      ) : (
        // Upload mode
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`mt-2 flex cursor-pointer flex-col items-center justify-center border-2 border-dashed p-6 transition-colors ${
            isDragging
              ? "border-gray-900 bg-gray-100 dark:border-white dark:bg-gray-800"
              : "border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
          }`}
        >
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
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-900 dark:text-white">
              Cliquez pour telecharger
            </span>{" "}
            ou glissez-deposez
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {accept.replace(/\./g, "").toUpperCase()} (max {maxSize} Mo)
          </p>
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
