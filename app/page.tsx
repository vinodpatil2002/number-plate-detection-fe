"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex-grow flex flex-col items-center justify-center relative overflow-hidden bg-[#121212]">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#121212] via-[#1e1e1e] to-[#121212] opacity-50" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="z-10 flex flex-col items-center justify-center gap-8 px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-5xl font-bold tracking-tight sm:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Number Plate <span className="text-[#4ADE80]">Detection</span>
        </motion.h1>

        <motion.p
          className="max-w-md text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Upload an image and our AI will detect and extract license plate
          information instantly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Button
            onClick={() => router.push("/detect")}
            className="bg-[#4ADE80] hover:bg-[#3cbe6c] text-black font-medium px-8 py-6 text-lg rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Detect Plates
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="mt-4">
              <Link
                href="/about"
                className="text-muted-foreground hover:text-[#4ADE80] transition-colors"
              >
                About & Privacy
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
}
