document.addEventListener("mousemove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 20;
    const y = (event.clientY / window.innerHeight - 0.5) * 20;

    document.querySelector(".background").style.transform =
        `translate(${x}px, ${y}px)`;
});
let currentGameMode = 0;

const gameTrack = document.querySelector(".game-track");
const totalGameModes = document.querySelectorAll(".feature-card").length;

function updateGameMode() {
    gameTrack.style.transform =
        `translateX(-${currentGameMode * 500}px)`;
}

function nextGameMode() {
    if (currentGameMode < totalGameModes - 1) {
        currentGameMode++;
        updateGameMode();
    }
}

function previousGameMode() {
    if (currentGameMode > 0) {
        currentGameMode--;
        updateGameMode();
    }
}
async function updateServerStatus() {
    const playerCount = document.getElementById("player-count");

    try {
        const response = await fetch(
            "https://api.mcsrvstat.us/3/reminded-hayden.tun.ply.gg"
        );

        const data = await response.json();

        if (data.online) {
            playerCount.textContent =
                `${data.players.online} Players Online`;
        } else {
            playerCount.textContent = "Server Offline";
        }

    } catch (error) {
        playerCount.textContent = "Status unavailable";
    }
}

updateServerStatus();

setInterval(updateServerStatus, 30000);
function copyServerIP() {
    const serverIP = "reminded-hayden.tun.ply.gg";
    const button = document.querySelector(".copy-button");

    navigator.clipboard.writeText(serverIP).then(() => {
        button.textContent = "✓";
        button.classList.add("copied");

        setTimeout(() => {
            button.textContent = "📋";
            button.classList.remove("copied");
        }, 1500);
    });
}
