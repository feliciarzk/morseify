import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 mt-20">
      
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-7xl font-bold text-white"
      >
        Morseify
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-gray-400 text-lg md:text-xl"
      >
        Translate • Listen • Flash
      </motion.p>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 max-w-xl text-gray-500"
      >
        Convert text to Morse code and back instantly.  
        Listen to real Morse audio and simulate signals using your device flashlight.
      </motion.p>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-xl"
      >
        Start Translating
      </motion.button>

    </div>
  );
}