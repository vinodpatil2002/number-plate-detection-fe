"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#121212] text-white p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto"
      >
        <Link
          href="/"
          className="inline-flex items-center text-muted-foreground hover:text-white transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <motion.h1 className="text-4xl font-bold mt-6 mb-4">
          About & Privacy
        </motion.h1>

        <motion.p className="text-lg text-muted-foreground leading-relaxed">
          Welcome to our{" "}
          <span className="text-[#4ADE80]">Number Plate Detection</span>{" "}
          application. This tool allows users to upload images of vehicles, and
          our AI-powered system will detect and extract the license plate
          information.
        </motion.p>

        <motion.h2 className="text-2xl font-semibold mt-6">
          Privacy Policy
        </motion.h2>
        <motion.p className="text-lg text-muted-foreground leading-relaxed mt-2">
          - We do not store any uploaded images or extracted license plate data.{" "}
          <br />
          - All processing happens locally in real-time without saving user
          data. <br />- Your privacy is important to us, and we ensure that no
          personal data is retained.
        </motion.p>

        <motion.h2 className="text-2xl font-semibold mt-6">
          How It Works
        </motion.h2>
        <motion.p className="text-lg text-muted-foreground leading-relaxed mt-2">
          1. Upload an image of a vehicle with a visible license plate. <br />
          2. Our AI model detects the plate and extracts the text. <br />
          3. The result is displayed instantly without saving any data.
        </motion.p>

        <motion.div className="mt-8">
          <Link href="/detect">
            <button className="bg-[#4ADE80] hover:bg-[#3cbe6c] text-black px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105">
              Try Plate Detection
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
