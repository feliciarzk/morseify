import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { detectAndTranslate } from "../../utils/Translator";

export default function TranslatorCard() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [flashMode, setFlashMode] = useState(false);

  const audioCtx = useRef(null);
  const streamRef = useRef(null);
  const trackRef = useRef(null);

  // ======================
  // REALTIME TRANSLATE
  // ======================
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!input.trim()) {
        setOutput("");
        return;
      }

      const { result } = detectAndTranslate(input);
      setOutput(result);
    }, 250);

    return () => clearTimeout(timeout);
  }, [input]);

  // ======================
  // AUDIO INIT
  // ======================
  const getAudioContext = async () => {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    if (audioCtx.current.state === "suspended") {
      await audioCtx.current.resume();
    }

    return audioCtx.current;
  };

  // ======================
  // FLASH INIT
  // ======================
  const initFlash = async () => {
    if (trackRef.current) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      streamRef.current = stream;
      trackRef.current = stream.getVideoTracks()[0];
    } catch {
      console.log("Torch not supported");
    }
  };

  // ======================
  // FLASH
  // ======================
  const flash = async (duration) => {
    if (!flashMode) return;
    if (!trackRef.current) return;

    try {
      await trackRef.current.applyConstraints({
        advanced: [{ torch: true }],
      });

      await new Promise((r) => setTimeout(r, duration));

      await trackRef.current.applyConstraints({
        advanced: [{ torch: false }],
      });
    } catch {
      document.body.style.filter = "brightness(2)";
      await new Promise((r) => setTimeout(r, duration));
      document.body.style.filter = "";
    }
  };

  // ======================
  // PLAY MORSE
  // ======================
  const playMorse = async (morse) => {
    if (!morse) return;

    const ctx = await getAudioContext();
    if (flashMode) await initFlash();

    const unit = 150;

    for (const symbol of morse) {
      if (symbol === "." || symbol === "-") {
        const duration = symbol === "." ? unit : unit * 3;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.value = 700;
        gain.gain.value = 0.12;

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();

        flash(duration);

        await new Promise((r) => setTimeout(r, duration));
        osc.stop();

        await new Promise((r) => setTimeout(r, unit));
      }

      if (symbol === " ") await new Promise((r) => setTimeout(r, unit * 2));
      if (symbol === "/") await new Promise((r) => setTimeout(r, unit * 6));
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      trackRef.current = null;
    }
  };

  // ======================
  // ACTIONS
  // ======================
  const handleCopy = () => {
    navigator.clipboard.writeText(output || "");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

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
      <h2 className="text-xl font-semibold text-white mb-4">
        Morse Translator (Realtime)
      </h2>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type text or Morse code..."
        className="w-full h-28 p-4 rounded-xl bg-[#09090B] border border-gray-800 text-white outline-none resize-none"
      />

      <div className="mt-4">
        <div className="text-sm text-gray-400 mb-2">Output</div>
        <div className="w-full min-h-[100px] p-4 rounded-xl bg-[#09090B] border border-gray-800 text-gray-300 whitespace-pre-wrap">
          {output || "Translation will appear in realtime..."}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-5">
        <button
          onClick={handleCopy}
          className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white"
        >
          Copy
        </button>

        <button
          onClick={handleClear}
          className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white"
        >
          Clear
        </button>

        <button
          onClick={handlePlay}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-green-500 text-black font-semibold hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? "Playing..." : "Play"}
        </button>

        <button
          onClick={() => setFlashMode(!flashMode)}
          className={`px-4 py-2 rounded-lg font-semibold ${
            flashMode
              ? "bg-yellow-400 text-black"
              : "bg-gray-800 text-white"
          }`}
        >
          Flash {flashMode ? "ON" : "OFF"}
        </button>
      </div>
    </motion.div>
  );
}