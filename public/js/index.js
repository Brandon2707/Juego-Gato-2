// Obtener elementos
const music = document.getElementById("bgMusic");
const toggleBtn = document.getElementById("toggleMusic");
const volumeSlider = document.getElementById("volumeControl");

// Alternar reproducción/pausa
toggleBtn.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        toggleBtn.textContent = "Pausar Música";
    } else {
        music.pause();
        toggleBtn.textContent = "Reanudar Música";
    }
});

// Cambiar volumen
volumeSlider.addEventListener("input", () => {
    music.volume = volumeSlider.value;
});
