function playSound(key) {
    const pad = document.querySelector(`.drum-pad[data-key="${key}"]`);

    if (!pad) {
        return;
    }

    const audio = new Audio(pad.dataset.sound);
    audio.play();

    pad.classList.add('active');

    setTimeout(() => {
        pad.classList.remove('active');
    }, 100);
}
window.addEventListener("keydown", (e) => {
    if (e.repeat) {
        return;
    }

    playSound(e.key);
});