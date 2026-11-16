var gameInterval = null;
var gameArea = document.querySelector(".gameArea");

var GAP_SIZE = 230;    
var MIN_PIPE = 70;     
var MAX_JUMP = 140;     
var lastGapY = null;
var PIPE_SPEED = 3;    
var hitInterval = null;
var GRAVITY = 0.5;     
var JUMP_POWER = 8;     
var bird = null;
var pipes = [];
var score = 0;
var BIRD_LEFT = 100;
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
    pipes.push(pipe);
    pipe.move();
}

var startBtn = document.querySelector(".startBtn");

startBtn.addEventListener("click", () => {
    start();
});

function start() {
     if (gameInterval == null) {
        startBtn.style.display = "none";
        clearPipes();
        setScore(0);
        lastGapY = null;
        bird = new Madar(gameArea.offsetHeight / 2 - 20, GRAVITY, JUMP_POWER, ".gameArea", stop);
        bird.fall();
        spawnPipe();
        gameInterval = setInterval(spawnPipe, 2200);
        hitInterval = setInterval(checkGame, 20);
    }
}

function stop() {
    if (gameInterval == null) {
        return;
    }
    clearInterval(gameInterval);
    gameInterval = null;
    clearInterval(hitInterval);
    hitInterval = null;
    if (bird) {
        bird.stop();
    }
    pipes.forEach(p => p.freeze());
    startBtn.textContent = "Játék vége – Újra";
    startBtn.style.display = "block";
}

function setScore(value) {
    score = value;
    document.querySelectorAll(".pont").forEach(el => el.textContent = score);
}

function clearPipes() {
    pipes.forEach(p => p.remove());
    pipes = [];
}

function checkGame() {
    if (!bird) {
        return;
    }
    var hb = bird.getHitbox();
    var areaH = gameArea.offsetHeight;

    pipes = pipes.filter(p => p.getX() > -Cso.WIDTH);

    for (var i = 0; i < pipes.length; i++) {
        var p = pipes[i];
        var pipeLeft = p.getX() - 7;              
        var pipeRight = p.getX() + Cso.WIDTH + 7;
        var gapTop = p.getGapY();
        var gapBottom = p.getGapY() + p.getGapSize();

       
        var overlapX = hb.right > pipeLeft && hb.left < pipeRight;
        if (overlapX && (hb.top < gapTop || hb.bottom > gapBottom)) {
            stop();
            return;
        }

       
        if (!p.isScored() && p.getX() + Cso.WIDTH < BIRD_LEFT) {
            p.setScored(true);
            setScore(score + 1);
        }
    }
}


gameArea.addEventListener("click", () => {
    if (bird && gameInterval != null) {
        bird.jump();
    }
});
document.body.onkeyup = function(e) {
  if (e.code == "Space" || e.keyCode == 32) {
    if (bird && gameInterval != null) {
        bird.jump();
    }
  }
}