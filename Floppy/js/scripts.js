var gameInterval = null;
var gameArea = document.querySelector(".gameArea");

var GAP_SIZE = 230;    
var MIN_PIPE = 70;     
var MAX_JUMP = 140;     
var lastGapY = null;
var PIPE_SPEED = 3;    
var hitInterval = null;

function spawnPipe() {
    var minY = MIN_PIPE;
    var maxY = gameArea.offsetHeight - GAP_SIZE - MIN_PIPE;
    if (lastGapY != null) {
        minY = Math.max(minY, lastGapY - MAX_JUMP);
        maxY = Math.min(maxY, lastGapY + MAX_JUMP);
    }
    var gapY = minY + Math.random() * (maxY - minY);
    lastGapY = gapY;
    var pipe = new Cso(gameArea.offsetWidth, gapY, GAP_SIZE, PIPE_SPEED, ".gameArea");
    pipe.move();
}

var startBtn = document.querySelector(".startBtn");

startBtn.addEventListener("click", () => {
    start();
});

function start() {
    if (gameInterval == null) {
        startBtn.style.display = "none";
        lastGapY = null;
        spawnPipe();
        gameInterval = setInterval(spawnPipe, 2200);
    }
}

function stop() {
    clearInterval(gameInterval);
    gameInterval = null;
    document.querySelectorAll(".pipe-pair").forEach(obj => obj.remove());
}

function stopGame(){
    stop();
    startBtn.style.display = "block";
}
