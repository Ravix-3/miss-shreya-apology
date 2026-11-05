
/* ==================================
   1. LETTER INTERACTION
================================== */

const letterButton = document.getElementById("letterButton");
const letterContent = document.getElementById("letterContent");
const envelope = document.getElementById("envelope");

letterButton.addEventListener("click", () => {

  // Check whether the letter is currently closed
  const isClosed = letterContent.hidden;

  if (isClosed) {

    // Open the letter
    letterContent.hidden = false;

    envelope.classList.add("open");

    letterButton.textContent = "Close My Letter";

    letterButton.setAttribute("aria-expanded", "true");

  } else {

    // Close the letter
    letterContent.hidden = true;

    envelope.classList.remove("open");

    letterButton.textContent = "Open My Letter";

    letterButton.setAttribute("aria-expanded", "false");

  }

});


/* ==================================
   2. FLOATING HEART ANIMATION
================================== */

const heartsContainer = document.getElementById("heartsContainer");

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

function createHeart() {

  // Don't animate if the visitor prefers reduced motion
  if (reducedMotion) return;

  const heart = document.createElement("span");

  heart.classList.add("floating-heart");

  heart.textContent = "♡";

  // Random horizontal position
  heart.style.left = Math.random() * 100 + "vw";

  // Random size
  heart.style.fontSize =
    Math.random() * 20 + 12 + "px";

  // Random animation duration
  heart.style.animationDuration =
    Math.random() * 4 + 5 + "s";

  heartsContainer.appendChild(heart);

  // Remove the heart after its animation
  heart.addEventListener("animationend", () => {
    heart.remove();
  });

}


// Create a new heart every 1200 milliseconds
if (!reducedMotion) {
  setInterval(createHeart, 1200);
}
