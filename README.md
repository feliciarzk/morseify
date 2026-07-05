# Morseify - Morse Code Translator

Morseify is a simple web application that converts **text ↔ morse code** in real-time.  
It also supports **sound playback** and **flash light mode (mobile supported)** for Morse signals.

---

## Live Demo
https://morseify-chif-theta.vercel.app/

---

## Features

- Text → Morse Code translation
- Morse Code → Text auto detection
- Audio feedback (beep sound for Morse)
- Flashlight mode (mobile devices)
- Copy output to clipboard
- Real-time translation

---

## PWA / Offline Support

Morseify supports **Progressive Web App (PWA)** features.

- Can be installed on mobile/desktop
- Works offline after first full load
- Requires initial visit to cache assets
- Service Worker handles offline availability

Note:
After a new deployment, the app may need to be opened once again to update cache for offline mode.

---

## Tech Stack

- React (Vite)
- JavaScript (ES6+)
- CSS
- Web APIs (Audio, Clipboard, MediaDevices Flashlight)

---
## 📁 Project Structure

```
src/
├── components/
│   └── translator/
│       └── TranslatorCard.jsx
│
├── utils/
│   ├── Translator.js
│   └── MorseMap.js
│
├── App.jsx
├── main.jsx
```

---

## How It Works

- If input contains `.` or `-` → treated as Morse code
- Otherwise → treated as normal text
- Uses mapping dictionary to convert both ways automatically

---

## 📸 Preview

<img width="1521" height="777" alt="image" src="https://github.com/user-attachments/assets/f4910281-dceb-4765-ae39-a05c9e57a5b0" />

---

## Author

Built by **Felicia Rizka Putri**
