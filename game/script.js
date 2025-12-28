let score = 0;
let lives = 3;
let gameActive = false;
let gameInterval;
let spawnSpeed = 1000; // Start by spawning every 1 second

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    gameActive = true;
    gameLoop();
}

function gameLoop() {
    if (!gameActive) return;

    createTarget();
    
    // Make it harder: reduce spawn time as score increases
    let nextSpawn = Math.max(400, spawnSpeed - (score * 2));
    gameInterval = setTimeout(gameLoop, nextSpawn);
}

function createTarget() {
    const target = document.createElement('div');
    target.className = 'target';
    target.innerHTML = '🎮'; // You can change this to ❄️ for winter
    
    // Random horizontal position
    const maxX = window.innerWidth - 80;
    target.style.left = Math.random() * maxX + 'px';
    
    // Random fall duration (speed)
    const fallDuration = Math.max(1.5, 4 - (score / 100));
    target.style.animationDuration = fallDuration + 's';

    target.onclick = function() {
        if (!gameActive) return;
        score += 10;
        document.getElementById('score').innerText = score;
        this.style.transform = 'scale(0)'; // Pop effect
        setTimeout(() => this.remove(), 100);
    };

    // If it hits the bottom without being clicked
    target.addEventListener('animationend', () => {
        if (target.parentElement) {
            lives--;
            document.getElementById('lives').innerText = lives;
            target.remove();
            if (lives <= 0) endGame();
        }
    });

    document.body.appendChild(target);
}

function endGame() {
    gameActive = false;
    clearTimeout(gameInterval);
    
    // Remove all active targets
    document.querySelectorAll('.target').forEach(t => t.remove());
    
    // Show the result card
    const loseScreen = document.getElementById('lose-screen');
    loseScreen.style.display = 'block';
    document.getElementById('final-score').innerText = score;
}
