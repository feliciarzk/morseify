import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#09090B]/80 backdrop-blur-md sticky top-0 z-50"
    >
      {/* LOGO */}
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>

        <h1 className="ml-2 font-bold text-lg text-white">
          Morseify
        </h1>
      </div>

      {/* NAV */}
      <div className="flex items-center gap-6 text-sm text-gray-300">
        <a href="#home" className="hover:text-white transition">
          Home
        </a>
        <a href="#about" className="hover:text-white transition">
          About
        </a>
      </div>
    </motion.nav>
  );
}