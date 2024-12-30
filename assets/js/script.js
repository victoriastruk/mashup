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

const playButton = document.querySelector(".play-button");
const playIcon = playButton.querySelector("i");
const audioPlayer = document.getElementById("backgroundAudio");

// Початковий статус
let isPlaying = false;

playButton.addEventListener("click", () => {
  if (isPlaying) {
    // Якщо грає, ставимо на паузу
    audioPlayer.pause();
    playIcon.classList.replace("fa-pause", "fa-play"); // Змінюємо іконку
  } else {
    // Якщо не грає, запускаємо відтворення
    audioPlayer.play().catch((error) => {
      console.error("Відтворення заблоковане браузером:", error);
    });
    playIcon.classList.replace("fa-play", "fa-pause"); // Змінюємо іконку
  }
  isPlaying = !isPlaying; // Перемикаємо статус
});
