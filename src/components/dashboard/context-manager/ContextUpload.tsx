"use client";

import LandingButton from "@/components/landing/LandingButton";
import { useState, useRef } from "react";

interface ContextUploadProps {
  onExtract: (file: File) => Promise<void>;
}

export default function ContextUpload({ onExtract }: ContextUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExtract = async () => {
    if (!selectedFile) return;

    setIsExtracting(true);
    try {
      await onExtract(selectedFile);
      setSelectedFile(null);
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } finally {
      setIsExtracting(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      {/* File Input Area */}
      <div className="flex flex-col items-center justify-center">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="context-file-input"
        />

        {!preview ? (
          <label
            htmlFor="context-file-input"
            className="w-full max-w-2xl cursor-pointer"
          >
            <div className="relative group">
              <div className="aspect-video bg-zinc-900/50 border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-orange-500/50 hover:bg-zinc-900/80 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-orange-500/20 to-purple-500/20 border border-orange-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-8 h-8 text-orange-400"
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
                </div>
                <div className="text-center">
                  <p className="text-lg font-medium text-white mb-1">
                    Click to upload an image
                  </p>
                  <p className="text-sm text-zinc-500">
                    PNG, JPG, WEBP up to 10MB
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 to-purple-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
          </label>
        ) : (
          <div className="w-full max-w-2xl space-y-4">
            {/* Preview */}
            <div className="relative group">
              <div className="aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Clear Button */}
              <button
                onClick={handleClear}
                className="absolute top-4 right-4 w-10 h-10 bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 rounded-full flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/50 transition-all"
              >
                <svg
                  className="w-5 h-5 text-zinc-400 hover:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* File Info */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-white truncate max-w-xs">
                    {selectedFile?.name}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {selectedFile &&
                      (selectedFile.size / 1024 / 1024).toFixed(2)}{" "}
                    MB
                  </p>
                </div>
              </div>
            </div>

            {/* Extract Button */}
            <LandingButton
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleExtract}
              type="button"
            >
              {isExtracting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Extracting Context...
                </span>
              ) : (
                "Extract Context"
              )}
            </LandingButton>
          </div>
        )}
      </div>
    </div>
  );
}
