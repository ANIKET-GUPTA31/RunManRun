//  --------------------------------------------------------------------------------------------------------
// niche ke dono code key bord ke key ke number batate hai 
// document.onkeydown = function (e) {  
// console.log("Key code is: ", e.keyCode)}

//  parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));  //computed value converted into float value 

//     dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left')); // dino computed value left
//     dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top')); // dino computed value top

//     ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left')); // obstacle computed value left
//     oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top')); // obstacle computed value top

//     offsetX = Math.abs(dx - ox);
//     offsetY = Math.abs(dy - oy);
//     // console.log(offsetX, offsetY)

// ------------------------------------ Main Logic ---------------------------------------------------------


alert("To play this game, you need to use the keyboard. We have used the arrow keys (i.e.up, left, and right) along with the C and V keys. We will soon be making this available for mobile as well.")

let score = 0;
let cross = true;
let invincible = false;
let invincibleTimer;

// Audio for game background and Gameover
const audio = new Audio('music.mp3');
const audiogo = new Audio('gameover.mp3');

setTimeout(() => {
    audio.play();
}, 1000);

// Handling key presses for dino actions
document.onkeydown = function (e) {
    const dino = document.querySelector('.dino');
    const dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));

    switch (e.keyCode) {
        case 38: // Up arrow key for jump
            if (!dino.classList.contains('animateDino')) {
                dino.classList.add('animateDino');
                setTimeout(() => {
                    dino.classList.remove('animateDino');
                }, 700);
            }
            break;

        case 39: // Right arrow key for move right
            if (dinoX < window.innerWidth - dino.offsetWidth - 10) { // Prevent moving off-screen to the right
                dino.style.left = dinoX + 150 + "px";
            }
            break;

        case 37: // Left arrow key for move left
            if (dinoX > 0) { // Prevent moving off-screen to the left
                dino.style.left = dinoX - 150 + "px";
            }
            break;

        case 67: // C key for cheating (invincibility)
            if (!invincible) {
                activateInvincibility();
            }
            break;

        case 86: // V key to deactivate invincibility
            if (invincible) {
                deactivateInvincibility();
            }
            break;
    }
};

// Function to activate invincibility
function activateInvincibility() {
    invincible = true;
    const dino = document.querySelector('.dino');
    dino.classList.add('invincible'); // this class is used in css

    // Timer for invincibility duration (5 seconds)
    invincibleTimer = setTimeout(() => {
        deactivateInvincibility();
    }, 5000);
}

// Function to deactivate invincibility
function deactivateInvincibility() {
    invincible = false;
    clearTimeout(invincibleTimer);
    const dino = document.querySelector('.dino');
    dino.classList.remove('invincible');
}

// Collision detection and score updating
setInterval(() => {
    const dino = document.querySelector('.dino');
    const obstacle = document.querySelector('.obstacle');
    const gameOver = document.querySelector('.gameOver');

    // calculating computed value of dino 
    const dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    const dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    // calculating computed value of obstacle 
    const ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    const oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    // collision detection 
    const offsetX = Math.abs(dx - ox);
    const offsetY = Math.abs(dy - oy);

    if (offsetX < 73 && offsetY < 52) {
        if (!invincible) {
            gameOver.innerHTML = "Game Over - Reload to Play Again";
            obstacle.classList.remove('obstacleAni');
            audiogo.play();
            setTimeout(() => {
                audiogo.pause();
                audio.pause();
            }, 1000);
        }
    } else if (offsetX < 95 && cross) {
        score += 1;
        updateScore(score);
        cross = false;

        setTimeout(() => {
            cross = true;
        }, 1000);

        // Speed up the obstacle after each successful score
        setTimeout(() => {
            let aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            let newDur = aniDur > 2 ? aniDur - 0.1 : aniDur; // Minimum duration to avoid too fast obstacles
            obstacle.style.animationDuration = newDur + 's';
        }, 500);
    }
}, 10);

// Function to update the score
function updateScore(score) {
    const scoreCont = document.querySelector('#scoreCont');
    scoreCont.innerHTML = "Your Score: " + score;
}
