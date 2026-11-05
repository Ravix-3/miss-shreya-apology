// Select the elements we need from the HTML document.
const openLetterBtn = document.getElementById("openLetterBtn");
const letter = document.getElementById("letter");
const heartsContainer = document.getElementById("heartsContainer");

// Show or hide the letter when the button is clicked.
openLetterBtn.addEventListener("click", () => {
    const isHidden = letter.classList.toggle("hidden");

    // Keep the button label and accessibility state in sync.
    openLetterBtn.textContent = isHidden
        ? "Open My Little Letter ❤️"
        : "Close My Letter 💌";

    openLetterBtn.setAttribute("aria-expanded", String(!isHidden));
    letter.setAttribute("aria-hidden", String(isHidden));

    if (!isHidden) {
        letter.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    }
});

// Create one decorative floating heart.
function createHeart() {
    const heart = document.createElement("span");

    heart.classList.add("floating-heart");
    heart.textContent = "♥";
    heart.setAttribute("aria-hidden", "true");

    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${Math.random() * 20 + 12}px`;
    heart.style.animationDuration = `${Math.random() * 5 + 5}s`;

    heartsContainer.appendChild(heart);

    // Remove the element after its animation to prevent DOM clutter.
    heart.addEventListener("animationend", () => {
        heart.remove();
    }, { once: true });
}

// Avoid continuously animating hearts when reduced motion is preferred.
const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

let heartIntervalId;

function startHeartAnimation() {
    if (prefersReducedMotion.matches || heartIntervalId) return;

    heartIntervalId = window.setInterval(createHeart, 700);
}

function stopHeartAnimation() {
    if (!heartIntervalId) return;

    window.clearInterval(heartIntervalId);
    heartIntervalId = undefined;
}

startHeartAnimation();
prefersReducedMotion.addEventListener("change", () => {
    if (prefersReducedMotion.matches) {
        stopHeartAnimation();
        heartsContainer.replaceChildren();
    } else {
        startHeartAnimation();
    }
});
