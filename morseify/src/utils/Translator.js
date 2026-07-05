import { MORSE_MAP } from "./MorseMap";

const REVERSE_MAP = Object.fromEntries(
  Object.entries(MORSE_MAP).map(([key, value]) => [value, key])
);

export function textToMorse(text) {
  return text
    .toUpperCase()
    .split("")
    .map((char) => MORSE_MAP[char] || "")
    .join(" ")
    .trim();
}

export function morseToText(morse) {
  return morse
    .split(" ")
    .map((code) => REVERSE_MAP[code] || "")
    .join("")
    .trim();
}

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