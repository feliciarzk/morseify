import { MORSE_MAP } from "./MorseMap";

// REVERSE MAP (Morse -> Text)
const REVERSE_MAP = Object.fromEntries(
  Object.entries(MORSE_MAP).map(([key, value]) => [value, key])
);

// TEXT -> MORSE
export function textToMorse(text) {
  return text
    .toUpperCase()
    .split("")
    .map((char) => MORSE_MAP[char] || "")
    .join(" ")
    .trim();
}

// MORSE -> TEXT
export function morseToText(morse) {
  return morse
    .split(" ")
    .map((code) => REVERSE_MAP[code] || "")
    .join("")
    .trim();
}

// AUTO DETECT
export function detectAndTranslate(input) {
  const isMorse = /^[.\-\/\s]+$/.test(input.trim());

  if (isMorse) {
    return {
      type: "morse",
      result: morseToText(input),
    };
  }

  return {
    type: "text",
    result: textToMorse(input),
  };
}
