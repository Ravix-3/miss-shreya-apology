
// ==================================
// 1. LETTER INTERACTION + TYPEWRITER
// ==================================

const letterButton = document.getElementById("letterButton");
const letterContent = document.getElementById("letterContent");
const envelope = document.getElementById("envelope");
const heartsContainer = document.getElementById("heartsContainer");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const paragraphs = letterContent ? [...letterContent.querySelectorAll(".typewriter-text")] : [];
let typingSession = 0;

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function resetLetter() {
  paragraphs.forEach(paragraph => {
    paragraph.textContent = "";
    paragraph.classList.remove("typing");
  });
}

async function typeParagraph(paragraph, session) {
  const text = paragraph.dataset.text ?? "";

  paragraph.classList.add("typing");

  for (const character of text) {
    if (session !== typingSession) return;

    paragraph.textContent += character;
    await wait(18);
  }

  paragraph.classList.remove("typing");
}

async function typeLetter(session) {
  if (reducedMotion) {
    paragraphs.forEach(paragraph => {
      paragraph.textContent = paragraph.dataset.text ?? "";
    });
    return;
  }

  for (const paragraph of paragraphs) {
    if (session !== typingSession) return;

    await typeParagraph(paragraph, session);

    if (session !== typingSession) return;
    await wait(450);
  }
}

if (letterButton && letterContent && envelope) {
  letterButton.addEventListener("click", async () => {
    const isClosed = letterContent.hidden;

    if (isClosed) {
      typingSession++;
      const currentSession = typingSession;

      letterContent.hidden = false;
      envelope.classList.add("open");
      letterButton.textContent = "Close My Letter";
      letterButton.setAttribute("aria-expanded", "true");

      resetLetter();
      await typeLetter(currentSession);
    } else {
      typingSession++;

      letterContent.hidden = true;
      envelope.classList.remove("open");
      letterButton.textContent = "Open My Letter";
      letterButton.setAttribute("aria-expanded", "false");

      resetLetter();
    }
  });
}

// ==================================
// 2. FLOATING HEART ANIMATION
// ==================================

function createHeart() {
  if (reducedMotion || !heartsContainer) return;

  const heart = document.createElement("span");
  heart.classList.add("floating-heart");
  heart.textContent = "♡";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 12 + "px";
  heart.style.animationDuration = Math.random() * 4 + 5 + "s";

  heartsContainer.appendChild(heart);

  heart.addEventListener("animationend", () => {
    heart.remove();
  });
}

if (!reducedMotion && heartsContainer) {
  setInterval(createHeart, 1200);
}
