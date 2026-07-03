let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

// beep function
function beep(duration, frequency = 700) {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;

  gain.gain.value = 0.1;

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start();

  setTimeout(() => {
    oscillator.stop();
  }, duration);
}

// sleep helper
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// MAIN PLAY FUNCTION
export async function playMorse(morse, speed = 1) {
  const unit = 200 / speed;

  for (let i = 0; i < morse.length; i++) {
    const symbol = morse[i];

    if (symbol === ".") {
      beep(unit);
      await sleep(unit);
    }

    if (symbol === "-") {
      beep(unit * 3);
      await sleep(unit * 3);
    }

    if (symbol === " ") {
      await sleep(unit * 2);
    }

    if (symbol === "/") {
      await sleep(unit * 6);
    }

    await sleep(unit);
  }
}