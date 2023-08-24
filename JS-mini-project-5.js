1.
const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");

const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;

const boardBackground = "black";
const paddle1Color = "rgb(95, 220, 236)";
const paddle2Color = "red";
const paddleBorder = "black";
const ballColor = "blueviolet";
const ballBorderColor = "black";
const ballRadius = 12.5;
const paddleSpeed = 50;

let intervalId;
// to be used for setInterval() function later on in the code (to call draw()) every time a frame is rendered by requestAnimationFrame().
let ballspeed = 1;
let ballX = gameWidth/2;
let ballY = gameHeight/2;
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score=0;
let player2Score=0;

let paddle1 ={
    width:25,
    height:100,
    x:0,
    y:0
}

let paddle2 ={
    width:25,
    height:100,
    x:gameWidth -25, // 25 = paddleWidth
    y:gameHeight -100 // 100=paddleHeight
}



window.addEventListener("keydown",changeDirection);
resetBtn.addEventListener("click",resetGame);

gameStart();






2.


function gameStart(){
    createBall();
    nextTick();
}

function nextTick(){
    intervalId = setTimeout(()=>{
        clearBoard();
        drawPaddles();
        moveBall();
        drawBall(ballX,ballY);
        checkCollision();
        nextTick();
    },10)
}

function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect (0 , 0, gameWidth, gameHeight );

    ctx.strokeStyle = "darkgray"; 
    ctx.beginPath();
    ctx.moveTo( gameWidth / 2, 50);   
    ctx.lineTo( gameWidth / 2, gameHeight - 50);
    ctx.stroke(); // Draw the line
   
}

function drawPaddles(){
    ctx.strokeStyle = paddleBorder;
    ctx.lineWidth=2;

    ctx.fillStyle = paddle1Color;
    ctx.fillRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height)
    ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

    ctx.fillStyle = paddle2Color;
    ctx.fillRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height)
    ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}

function createBall(){
    ballspeed=1;
    if(Math.round(Math.random())==1){
        ballXDirection = 1;
    }
    else{ballXDirection = -1;}

    if(Math.round(Math.random())== 1){
        //ballYDirection = 1;
        ballYDirection = Math.random() * 1; //more random directions
    }
    else{
       // ballYDirection = -1;
       ballYDirection = Math.random() * -1; //more random directions
    }

    ballX = gameWidth/2;
    ballY = gameHeight/2; 

    drawBall(ballX,ballY);
}

function moveBall(){
    ballX += (ballspeed * ballXDirection);
    ballY += (ballspeed * ballYDirection)

    
}

function drawBall(ballX,ballY){
    ctx.fillStyle = ballColor;
    ctx.strokeStyle = ballBorderColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(ballX , ballY ,ballRadius , 0 , 2*Math.PI);
    ctx.stroke();
    ctx.fill();
}

function checkCollision(){
    if(ballY <= 0 + ballRadius){
        ballYDirection *= -1;
    }
    if(ballY >= gameHeight - ballRadius){
        ballYDirection *= -1
    }
   
    if(ballX <= 0){
        player2Score+=1;
        updateScore();
        createBall();
        return;
    }
     
    if(ballX >= gameWidth){
        player1Score+=1;
        updateScore();
        createBall();
        return;
    }
   


    if(ballX <= (paddle1.x + paddle1.width + ballRadius)){  //  paddle1.x + paddle1.width = paddle1.width   ( paddle1.x =)
        if(ballY > paddle1.y && ballY < paddle1.y+paddle1.height){
            ballX = (paddle1.x + paddle1.width) + ballRadius; // if ball gets stuck
            ballXDirection *=-1
            ballspeed ++;
        }

    
    }
    
    if(ballX >= paddle2.x - ballRadius){
        if(ballY > paddle2.y && ballY < paddle2.y+paddle2.height ){
            ballX = paddle2.x - ballRadius; // if ball gets stuck
            ballXDirection *=-1
            ballspeed ++;
        }
        }
}

function changeDirection(event){
    const keyPressed = event.keyCode;
    const paddle1Up = 87;
    const paddle1Down = 83;
    const paddle2Up = 38;
    const paddle2Down = 40;

    switch(keyPressed){
        case (paddle1Up):
            if(paddle1.y > 0){
                paddle1.y -= paddleSpeed;
            }
            break;

        case (paddle1Down):
            if(paddle1.y < gameHeight - paddle1.height){
                paddle1.y += paddleSpeed;
            }
                break;

         case (paddle2Up):
            if(paddle2.y >0){
            paddle2.y -= paddleSpeed;
            }
            break;

        case (paddle2Down):
                if(paddle2.y < gameHeight - paddle2.height){
                paddle2.y += paddleSpeed;
                }
                break;
                
    }
}

function updateScore(){
    scoreText.textContent = `${player1Score} : ${player2Score}`
}

function resetGame(){
    player1Score=0;
    player2Score=0;

    paddle1 ={
        width:25,
        height:100,
        x:0,
        y:0
    }
    
    paddle2 ={
        width:25,
        height:100,
        x:gameWidth -25, // 25 = paddleWidth
        y:gameHeight -100 // 100=paddleHeight
    }

    ballspeed = 1;
    ballX = 0;
    ballY = 0;
    ballXDirection = 0;
    ballYDirection = 0;
    updateScore();
    clearInterval(intervalId);
    gameStart();
}




