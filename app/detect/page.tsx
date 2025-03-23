"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, Trash2, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function DetectPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ plateText: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setResult(null);
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };

  const handleDetect = async () => {
    if (!file) return;

    setIsProcessing(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/detect/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to detect plate");
      }

      const data = await response.json();
      setResult({ plateText: data.number_plate });
    } catch (error) {
      console.error("Error detecting plate:", error);
      alert("Error detecting plate. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="flex-grow flex flex-col items-center justify-center relative overflow-hidden bg-[#121212]">
      {/* Content Wrapper (Push Footer Down) */}
      <div className="flex-grow p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-muted-foreground hover:text-white transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <motion.h1 className="text-3xl font-bold mb-6">
            Detect License Plates
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div className="flex flex-col gap-4">
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 h-64 flex flex-col items-center justify-center cursor-pointer relative",
                  preview
                    ? "border-[#4ADE80]"
                    : "border-gray-700 hover:border-gray-500"
                )}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
                {!preview ? (
                  <>
                    <Upload className="h-10 w-10 mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground text-center">
                      Drag and drop an image here, or click to select
                    </p>
                  </>
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      className="object-contain rounded-md"
                    />
                    <button
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>

              <Button
                onClick={handleDetect}
                disabled={!file || isProcessing}
                className="bg-[#4ADE80] hover:bg-[#3cbe6c] text-black"
              >
                {isProcessing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Detect Plate"
                )}
              </Button>
            </motion.div>

            <motion.div className="border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Results</h2>
              <AnimatePresence mode="wait">
                {isProcessing ? (
                  <motion.div className="flex flex-col items-center justify-center h-64">
                    <Loader2 className="h-10 w-10 animate-spin text-[#4ADE80] mb-4" />
                    <p className="text-muted-foreground">Analyzing image...</p>
                  </motion.div>
                ) : result ? (
                  <motion.div className="space-y-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">
                        Detected plate:
                      </p>
                      <p className="text-2xl font-mono text-[#4ADE80] text-center">
                        {result.plateText}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div className="flex items-center justify-center h-64 text-muted-foreground">
                    Upload an image and click "Detect Plate" to see results
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
