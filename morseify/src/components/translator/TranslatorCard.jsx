import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { detectAndTranslate } from "../../utils/translator";

export default function TranslatorCard() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  // CLEAN AUTO TRANSLATE (STABLE + NO BUG SCROLL / JITTER)
  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    const { result } = detectAndTranslate(input);
    setOutput(result);
  }, [input]);

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-3xl mx-auto mt-20 bg-[#18181B] border border-gray-800 rounded-2xl p-6 shadow-lg"
    >
      {/* TITLE */}
      <h2 className="text-xl font-semibold text-white mb-4">
        Morse Translator
      </h2>

      {/* INPUT */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type text or Morse code..."
        className="w-full h-28 p-4 rounded-xl bg-[#0A0A0A] border border-gray-800 text-white outline-none resize-none"
      />

      {/* OUTPUT */}
      <div className="mt-4">
        <div className="text-sm text-gray-400 mb-2">Output</div>

        <div className="w-full min-h-[100px] p-4 rounded-xl bg-[#0A0A0A] border border-gray-800 text-gray-300 whitespace-pre-wrap">
          {output ? (
            output
          ) : (
            <span className="text-gray-600 italic">
              Start typing to see translation...
            </span>
          )}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-3 mt-5">
        <button
          onClick={handleCopy}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
        >
          Copy
        </button>

        <button
          onClick={handleClear}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
        >
          Clear
        </button>
      </div>
    </motion.div>
  );
}