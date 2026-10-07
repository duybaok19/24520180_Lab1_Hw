const targetTime = new Date("2026-12-31T23:59:59").getTime();

function updateCountdown() {
    const remaining = Math.max(0, targetTime - Date.now());

    const totalSeconds = Math.floor(remaining / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    document.querySelector("#days").textContent = days;
    document.querySelector("#hours").textContent = String(hours).padStart(2, "0");
    document.querySelector("#minutes").textContent = String(minutes).padStart(2, "0");
    document.querySelector("#seconds").textContent = String(seconds).padStart(2, "0");

    if (remaining <= 0) {
        clearInterval(timer);
    }
}

updateCountdown();

const timer = setInterval(updateCountdown, 1000);