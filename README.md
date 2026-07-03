# Morseify - Morse Code Translator

Morseify is a simple web application that converts **text ↔ morse code** in real-time.  
It also supports **sound playback** and **flash light mode (mobile supported)** for Morse signals.

---

## Live Demo
https://morseify.vercel.app](https://morseify-chif-theta.vercel.app/)

---

## Features

- Text → Morse Code translation
- Morse Code → Text auto detection
- Audio feedback (beep sound for Morse)
- Flashlight mode (mobile devices)
- Copy output to clipboard
- Real-time translation

---

## 🛠️ Tech Stack

- React (Vite)
- JavaScript (ES6+)
- CSS
- Web APIs (Audio + Clipboard + Flashlight)

---

## 📁 Project Structure
src/
├── components/
│ ├── translator/
│ ├── layout/
├── utils/
│ ├── Translator.js
│ ├── MorseMap.js
│ ├── audio.js


---

## 💡 How It Works

- If input contains `.` or `-` → treated as Morse code
- Otherwise → treated as normal text
- Uses mapping dictionary to convert both ways automatically

---

## 📸 Preview



---

## 📌 Future Improvements

- Dark theme toggle
- Voice input (speech-to-text)
- PWA support (installable app)
- History feature

---

## 👩‍💻 Author

Built by **Felicia**  
Frontend + UI/UX practice project
