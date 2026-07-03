import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { detectAndTranslate } from "../../utils/Translator";

export default function TranslatorCard() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [flashMode, setFlashMode] = useState(false);

  // ===== REALTIME TRANSLATE (DEBOUNCE) =====
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!input.trim()) {
        setOutput("");
        return;
      }

      const { result } = detectAndTranslate(input);
      setOutput(result);
    }, 300); // debounce biar gak spam CPU

    return () => clearTimeout(timeout);
  }, [input]);

  // ===== AUDIO MORSE =====
  const playMorse = async (morse) => {
    if (!morse) return;

    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    const beep = (duration, freq = 700) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.value = 0.1;

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      setTimeout(() => osc.stop(), duration);
    };

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    const unit = 150;

    for (let i = 0; i < morse.length; i++) {
      const s = morse[i];

      if (s === ".") {
        beep(unit);
        await sleep(unit);
        await flash(unit);
      }

      if (s === "-") {
        beep(unit * 3);
        await sleep(unit * 3);
        await flash(unit * 3);
      }

      if (s === " ") await sleep(unit * 2);
      if (s === "/") await sleep(unit * 6);

      await sleep(unit);
    }
  };

  // ===== FLASH =====
  const flash = async (time) => {
    if (!flashMode) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      const track = stream.getVideoTracks()[0];

      if (track?.applyConstraints) {
        await track.applyConstraints({
          advanced: [{ torch: true }],
        });
      }

      setTimeout(() => track.stop(), time);
    } catch {
      document.body.style.background = "white";
      setTimeout(() => {
        document.body.style.background = "#09090B";
      }, time);
    }
  };

  const handleCopy = () => navigator.clipboard.writeText(output);

  const handlePlay = async () => {
    setLoading(true);
    await playMorse(output);
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-16 w-full max-w-3xl mx-auto bg-[#18181B] border border-gray-800 rounded-2xl p-6 shadow-lg"
    >
      <h2 className="text-xl font-semibold mb-4">
        Morse Translator (Realtime)
      </h2>

      {/* INPUT */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type text or Morse code..."
        className="w-full h-28 p-4 rounded-xl bg-[#09090B] border border-gray-800 text-white outline-none resize-none"
      />

      {/* OUTPUT */}
      <div className="mt-4">
        <div className="text-sm text-gray-400 mb-2">Output</div>
        <div className="w-full min-h-[100px] p-4 rounded-xl bg-[#09090B] border border-gray-800 text-gray-300">
          {output || "Translation will appear in realtime..."}
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex flex-wrap gap-3 mt-5">
        <button
          onClick={handleCopy}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700"
        >
          Copy
        </button>

        <button
          onClick={() => setInput("")}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700"
        >
          Clear
        </button>

        <button
          onClick={handlePlay}
          className="px-4 py-2 rounded-lg bg-green-500 text-black font-semibold hover:bg-green-600"
        >
          {loading ? "Playing..." : "Play"}
        </button>

        {/* FLASH MODE */}
        <button
          onClick={() => setFlashMode(!flashMode)}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            flashMode
              ? "bg-yellow-400 text-black"
              : "bg-gray-800 text-white"
          }`}
        >
          Flash: {flashMode ? "ON" : "OFF"}
        </button>
      </div>
    </motion.div>
  );
}
