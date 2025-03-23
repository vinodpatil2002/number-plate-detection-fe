"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-[#121212] text-gray-400 py-4 text-center flex justify-between items-center px-8"
    >
      {/* Left Section - Copyright */}
      <p className="text-sm whitespace-nowrap">
        © {new Date().getFullYear()} Number Plate Detection
      </p>

      {/* Middle Section - Creator */}
      <p className="text-sm whitespace-nowrap">
        Created by{" "}
        <Link
          href="https://github.com/vinodpatil2002"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4ADE80] hover:underline"
        >
          vinodpatil2002
        </Link>
      </p>

      {/* Right Section - Social Icons */}
      <div className="flex gap-4">
        <Link
          href="https://github.com/vinodpatil2002"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition"
        >
          <Github className="w-6 h-6" />
        </Link>

        <Link
          href="https://twitter.com/vinodcodes"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition"
        >
          <Twitter className="w-6 h-6" />
        </Link>
      </div>
    </motion.footer>
  );
}
