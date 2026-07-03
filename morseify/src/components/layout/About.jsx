import { motion } from "framer-motion";

export default function About() {
  return (
    <div id="about" className="mt-24 px-6 max-w-4xl mx-auto">

      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-white text-center"
      >
        About Morseify
      </motion.h2>

      {/* DESCRIPTION */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-6 text-center text-gray-400 leading-relaxed"
      >
        Morseify is a modern web application that converts text to Morse code and vice versa in real-time.
        It also simulates real Morse communication through audio signals and device flashlight.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-center text-gray-500"
      >
        Built as a portfolio project to demonstrate frontend skills, API usage, and interactive UI design.
      </motion.p>

      {/* TECH STACK */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 flex flex-wrap justify-center gap-3"
      >
        {[
          "React",
          "Vite",
          "Tailwind CSS",
          "Framer Motion",
          "Web Audio API",
          "Local Storage",
        ].map((tech) => (
          <span
            key={tech}
            className="px-4 py-2 bg-[#18181B] border border-gray-800 rounded-full text-sm text-gray-300"
          >
            {tech}
          </span>
        ))}
      </motion.div>

    </div>
  );
}