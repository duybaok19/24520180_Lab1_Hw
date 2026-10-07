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

class BeatRecorder {
    constructor() {
        this.records = [];
        this.startTime = null;
        this.isRecording = false;
    }

    start() {
        this.records = [];
        this.startTime = performance.now();
        this.isRecording = true;
    }

    record(key) {
        if (!this.isRecording || this.startTime === null) {
            return;
        }

        const timestamp = performance.now() - this.startTime;

        this.records.push({
            key,
            timestamp
        });
    }

    stop() {
        this.isRecording = false;
        this.startTime = null;

        return this.records;
    }

    playback() {
        this.records.forEach(record => {
            setTimeout(() => {
                playSound(record.key);
            }, record.timestamp);
        });
    }
}