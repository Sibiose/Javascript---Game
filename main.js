// Canvas Setup
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 700;
const startGameHeader = document.querySelector(".start-game");



let score = 0;
let gameFrame = 0;

let ghostImage = document.getElementById("ghost");
let wormImage = document.getElementById("worm");

let level = 0;
let jumping = false;
let ducking = false;
let va = 1; //acceleration
let gameSpeed = 4;
const playerImg = new Image()
playerImg.src = "Resources/Characters/dog.png"

let frameX = 0;
let frameY = 0;
let enemyframeX = 0;
let gameStop = false

//Player
class Player {
    constructor() {
        this.spriteWidth = 575;
        this.spriteHeight = 523;
        this.width = this.spriteWidth / 6;
        this.height = this.spriteHeight / 5;
        this.x = 20;
        this.y = canvas.height - this.height - 230;
        //------Hitbox width and height----

        this.hitboxWidth = this.width
        this.hitboxHeight = this.height
        this.hitboxY = this.y





        this.weight = 0.2;
        this.vy = 0;
    }


    draw() {

        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.drawImage(playerImg, frameX * this.spriteWidth, frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);


    }

    update() {
        function updateAcc() {
            if (va > 1) {
                va--;
            } return;
        }
        if (jumping == true) {
            updateAcc();
        }
        this.y += this.vy * va;
        if (this.y < canvas.height - this.height - 230) {
            this.vy += this.weight;
        }
        if (this.y >= canvas.height - this.height - 230) {
            this.vy = 0;
            jumping = false;
        }
        switch (jumping, ducking) {
            case jumping == true: frameY = 3;
                break;
            case jumping == false && ducking == false: frameY = 1;
                break;
            case ducking == true && jumping == false: frameY = 6;
                break;
        }
    }


    jump() {
        if (jumping == false && ducking == false) {
            jumping = true;
            this.vy = -5;
            va = 7;
        }

    }
    duck() {
        if (ducking == false && jumping == false) {
            player.hitboxHeight / 2;
            player.hitboxY += 60;
            ducking = true;

            setTimeout(function () {
                player.hitboxHeight = player.height;
                player.hitboxY = player.y;
                ducking = false;

            }, 800);
        }
    }

}
const player = new Player;
//Obstacles
const obstaclesArray = [];
let heightGenerator = 1;
let spawnHeight

function handleHeight() {
    heightGenerator = Math.floor(Math.random() * 2 + 1);
    if (heightGenerator == 1) {
        spawnHeight = 230;
    } else if (heightGenerator == 2) {
        spawnHeight = 290;
    };
}

class Obstacle {
    constructor() {
        if (spawnHeight == 290) {
            this.image = ghostImage;
            this.spriteWidth = 261;
            this.spriteHeight = 209;
            this.width = this.spriteWidth / 3.6;
            this.height = this.spriteHeight / 3.3;

        }
        else {
            this.image = wormImage;
            this.spriteWidth = 229;
            this.spriteHeight = 171;
            this.width = this.spriteWidth / 3.3;
            this.height = this.spriteHeight / 3;

        }
        this.x = canvas.width;
        this.y = canvas.height - this.height - spawnHeight;
        this.speed = 1.1 * gameSpeed;
    }
    update() {
        this.x -= this.speed;
    }
    draw() {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.drawImage(this.image, enemyframeX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
        ctx.closePath();
        ctx.stroke();



    }
}

function handleObstacles() {
    if (gameFrame == 0 || gameFrame % 100 == 0) {
        handleHeight();
        obstaclesArray.push(new Obstacle());


    }
    for (let i = 0; i < obstaclesArray.length; i++) {
        obstaclesArray[i].update();
        obstaclesArray[i].draw();
    }
    for (let i = 0; i < obstaclesArray.length; i++) {
        if (obstaclesArray[i].x < 0 - obstaclesArray[i].width) {
            obstaclesArray.splice(i, 1)
            score++;
        }
    }



}
//Colision and hitboxes----------------------------------------
function detectColision() {
    for (let i = 0; i < obstaclesArray.length; i++) {
        if (player.x < obstaclesArray[i].x + obstaclesArray[i].width
            && player.x + player.hitboxWidth > obstaclesArray[i].x + 20
            && player.hitboxY < obstaclesArray[i].y + obstaclesArray[i].height
            && player.y + player.hitboxHeight > obstaclesArray[i].y
        ) {
            gameSpeed = 0;
            obstaclesArray[i].speed = 0;
            gameStop = true;
            stopMoving();
            frameY = 8;


        } else { return }
    }
}


function stopMoving() {
    ducking = true;
    jumping = true;
}

// BACKGROUND IMAGE---------------------------------
const bgImage = new Image();
bgImage.src = "Resources/Background/game_background_2.png";
let x = 0;
let x2 = 3700;

function animate() {

    //background image animation
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    ctx.drawImage(bgImage, x, 0, 3840, canvas.height);
    ctx.drawImage(bgImage, x2, 0, 3840, canvas.height);
    

    if (x <= -3700) { x = 3700 - gameSpeed }
    else { x -= gameSpeed };
    if (x2 <= -3700) { x2 = 3700 - gameSpeed }
    else { x2 -= gameSpeed };


    //Character animation ------------------------------------
    frameStagger = 4

    if (gameFrame % frameStagger == 0 && gameSpeed > 0) {

        if (frameX < 6) frameX++;
        else frameX = 0;
        if (enemyframeX < 5) enemyframeX++;
        else enemyframeX = 0;
    }
    else if (gameFrame % frameStagger == 0 && gameSpeed == 0) {
        if (frameX < 6) frameX++;
    }



    //--------------------------

    player.draw();
    requestAnimationFrame(animate);
    gameFrame++;
    handleObstacles();
    player.update();
    detectColision();
    handleScore();
    //------------------------------

}
let scoreChange = false;
function handleScore() {
    ctx.font = "30px Georgia";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 60, 60);
    if (score != 0 && score % 20 == 0 && scoreChange == false && score < 200) {
        gameSpeed += 1;
        scoreChange = true
    }
    if (score != 0 && score % 20 == 1 && scoreChange == true) { scoreChange = false }

}


let gameActive = false;

function startGame(e) {
    if (gameActive == false && e.key === "Enter") {
        startGameHeader.classList.add("hide");
        animate();
        gameActive = true;
    }
}



window.addEventListener("keydown", startGame);
window.addEventListener("keydown", keyPressed);

function keyPressed(e) {
    if (e.key === "ArrowDown") {
        player.duck();
    } else if (e.key === " ") {
        player.jump();
    }

}
