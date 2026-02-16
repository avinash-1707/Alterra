"use client";

import LandingButton from "@/components/landing/LandingButton";
import { useState, useRef } from "react";
import { motion } from "motion/react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";

interface ContextUploadProps {
  onExtract: (file: File) => Promise<void>;
}

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex shrink-0 scale-105 flex-wrap items-center justify-center gap-x-px gap-y-px bg-zinc-900">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`flex h-10 w-10 shrink-0 rounded-xs ${
                index % 2 === 0
                  ? "bg-zinc-950"
                  : "bg-zinc-950 shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        }),
      )}
    </div>
  );
}

export default function ContextUpload({ onExtract }: ContextUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: File[]) => {
    const file = files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFileSelect(files);
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

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    onDrop: handleFileSelect,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="space-y-6">
      {/* File Input Area */}
      <div className="w-full" {...getRootProps()}>
        <motion.div
          onClick={handleClick}
          whileHover="animate"
          className="group/file relative block w-full cursor-pointer overflow-hidden rounded-lg p-10"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />

          <div className="absolute inset-0 mask-[radial-gradient(ellipse_at_center,white,transparent)]">
            <GridPattern />
          </div>

          <div className="flex flex-col items-center justify-center">
            <p className="relative z-20 font-sans text-base font-bold text-white">
              Upload Image
            </p>
            <p className="relative z-20 mt-2 font-sans text-base font-normal text-zinc-400">
              Drag or drop your image here or click to upload
            </p>
            <p className="relative z-20 mt-1 font-sans text-sm text-zinc-500">
              PNG, JPG, WEBP up to 10MB
            </p>

            <div className="relative mx-auto mt-10 w-full max-w-xl">
              {selectedFile ? (
                <motion.div
                  layoutId="file-upload"
                  className={cn(
                    "relative z-40 mx-auto mt-4 flex w-full flex-col items-start justify-start overflow-hidden rounded-md bg-zinc-900 p-4 md:h-24",
                    "shadow-sm border border-zinc-800",
                  )}
                >
                  <div className="flex w-full items-center justify-between gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="max-w-xs truncate text-base text-white flex items-center gap-2"
                    >
                      <svg
                        className="w-5 h-5 text-orange-400 shrink-0"
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
                      {selectedFile.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="w-fit shrink-0 rounded-lg px-2 py-1 text-sm text-zinc-400 bg-zinc-800"
                    >
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>

                  <div className="mt-2 flex w-full flex-col items-start justify-between text-sm text-zinc-500 md:flex-row md:items-center">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded-md bg-zinc-800 px-2 py-0.5"
                    >
                      {selectedFile.type}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                    >
                      modified{" "}
                      {new Date(selectedFile.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>

                  {/* Clear Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClear();
                    }}
                    className="absolute top-4 right-4 w-8 h-8 bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 rounded-full flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/50 transition-all"
                  >
                    <svg
                      className="w-4 h-4 text-zinc-400 hover:text-red-400"
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
                </motion.div>
              ) : (
                <>
                  <motion.div
                    layoutId="file-upload"
                    variants={mainVariant}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className={cn(
                      "relative z-40 mx-auto mt-4 flex h-32 w-full max-w-32 items-center justify-center rounded-md bg-zinc-900 group-hover/file:shadow-2xl border border-zinc-800",
                      "shadow-[0px_10px_50px_rgba(0,0,0,0.3)]",
                    )}
                  >
                    {isDragActive ? (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center text-orange-400"
                      >
                        Drop it
                        <svg
                          className="w-8 h-8 mt-2"
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
                      </motion.p>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-linear-to-br from-orange-500/20 to-purple-500/20 border border-orange-500/30 flex items-center justify-center group-hover/file:scale-110 transition-transform">
                        <svg
                          className="w-6 h-6 text-orange-400"
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
                    )}
                  </motion.div>

                  <motion.div
                    variants={secondaryVariant}
                    className="absolute inset-0 z-30 mx-auto mt-4 flex h-32 w-full max-w-32 items-center justify-center rounded-md border border-dashed border-orange-500/50 bg-transparent opacity-0"
                  ></motion.div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Preview Section */}
      {preview && (
        <div className="w-full max-w-2xl mx-auto">
          <div className="relative group">
            <div className="aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Extract Button */}
      {selectedFile && (
        <div className="w-full max-w-2xl mx-auto">
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
  );
}
