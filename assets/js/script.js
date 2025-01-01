"use strict";

document.querySelectorAll("button[data-target]").forEach((button) => {
  button.addEventListener("click", function () {
    const targetId = this.getAttribute("data-target");
    const targetElement = document.getElementById(targetId);

    // Закриваємо всі інші підказки
    document.querySelectorAll(".hint").forEach((hint) => {
      if (hint !== targetElement) {
        hint.style.display = "none";
      }
    });

    // Отримуємо фактичне значення display через getComputedStyle
    const currentDisplay = window.getComputedStyle(targetElement).display;

    // Перемикаємо відображення вибраної підказки
    targetElement.style.display = currentDisplay === "none" ? "block" : "none";
  });
});

// Player
const playButton = document.querySelector(".play-button");
const playIcon = playButton.querySelector("i");
const audioPlayer = document.getElementById("backgroundAudio");

audioPlayer.loop = true;

let isPlaying = false;

function updateIcon() {
  if (isPlaying) {
    playIcon.classList.replace("fa-play", "fa-pause");
  } else {
    playIcon.classList.replace("fa-pause", "fa-play");
  }
}

function togglePlay() {
  if (isPlaying) {
    audioPlayer.pause();
  } else {
    audioPlayer
      .play()
      .catch((error) =>
        console.error("Відтворення заблоковане браузером:", error)
      );
  }
  isPlaying = !isPlaying;
  updateIcon();
}

function resizePlayButton() {
  if (window.innerWidth < 900) {
    playButton.style.padding = "12px 15px";
    playIcon.style.fontSize = "16px";
  } else {
    playButton.style.padding = "25px 28px";
    playIcon.style.fontSize = "24px";
  }
}

let resizeTimeout;
function debounceResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(resizePlayButton, 200);
}

playButton.addEventListener("click", togglePlay);
window.addEventListener("resize", debounceResize);

resizePlayButton();
updateIcon();
