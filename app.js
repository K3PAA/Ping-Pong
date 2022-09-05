//link HTML
const grid = document.querySelector('.grid')

const gridWidth = 600
const gridHeight = 350

const displayResult = document.querySelector('.displayResult')

const playerPosition = [30, 125]
let playerCurrenPosition = playerPosition

const plateHeight = 100
const plateWidth = 10

const enemyPosition = [560, 125]
let enemyCurrenPosition = enemyPosition

const ballSize = 20

const ballPosition = [ (gridWidth/2), (gridHeight / 2)]
let ballCurrenPosition = ballPosition

let timeLeft = 30
let playerScore = 0
let enemyScore = 0

let xDirection = 1
let yDirection = 1

let timerId

//create player
const player = document.createElement('div')
player.classList.add('player')
drawPlayer()
grid.append(player)

//create enemy
const enemy = document.createElement('div')
enemy.classList.add('enemy')
drawEnemy()
grid.append(enemy)

//create ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.append(ball)

//draw player
function drawPlayer(){
    player.style.left = playerCurrenPosition[0] + 'px'
    player.style.top = playerCurrenPosition[1] + 'px'
}

//draw enemy
function drawEnemy(){
    enemy.style.left = enemyCurrenPosition[0] + 'px'
    enemy.style.top = enemyCurrenPosition[1] + 'px'
}

//draw ball
function drawBall(){
    ball.style.left = ballCurrenPosition[0] + 'px'
    ball.style.top = ballCurrenPosition[1] + 'px'
}

// Movement

function movePlayer(e){
    switch(e.key){
        //player 1
        case 'w':   
        if(playerCurrenPosition[1] > 0)
            playerCurrenPosition[1] -= 10
            drawPlayer()
        break

        case 's':   
        if(playerCurrenPosition[1] < gridHeight - plateHeight )
            playerCurrenPosition[1] += 10
            drawPlayer()
    }
}

function moveEnemy(e){
    switch(e.key){
    //player 2
        case 'ArrowUp':   
        if(enemyCurrenPosition[1] > 0)
            enemyCurrenPosition[1] -= 10
            drawEnemy()
        break

        case 'ArrowDown':   
        if(enemyCurrenPosition[1] < gridHeight - plateHeight )
            enemyCurrenPosition[1] += 10
            drawEnemy()
        break
    }
}

window.addEventListener('keydown', movePlayer)
window.addEventListener('keydown', moveEnemy)

// Move Ball

function moveBall(){
    ballCurrenPosition[0] += xDirection
    ballCurrenPosition[1] += yDirection
    drawBall()
    checkForCollision()
}

function checkForCollision(){
    //Check for winner
    if(ballCurrenPosition[0] > gridWidth - ballSize){
           displayResult.innerHTML = 'Player 1 won !'
            clearInterval(timerId)  
        }
    if(ballCurrenPosition[0] < 0){
            displayResult.innerHTML = 'Player 2 won !'
            clearInterval(timerId)  
        }
    
    // Enemy Pallet collision
    if( ballCurrenPosition[0] >= enemyCurrenPosition[0] &&
        ballCurrenPosition[0] <= enemyCurrenPosition[0] + plateWidth &&
        ballCurrenPosition[1] >= enemyCurrenPosition[1] &&
        ballCurrenPosition[1] <= enemyCurrenPosition[1] + plateHeight){
            changeDirection()
        }

    if( ballCurrenPosition[0] >= playerCurrenPosition[0] &&
        ballCurrenPosition[0] <= playerCurrenPosition[0] + plateWidth &&
         ballCurrenPosition[1] >= playerCurrenPosition[1] &&
        ballCurrenPosition[1] <= playerCurrenPosition[1] + plateHeight){
            changeDirection()
    }



    //Wall collisions
    if(ballCurrenPosition[1] > gridHeight - ballSize ||
        ballCurrenPosition[1] < 0){
            changeDirection()
    }
}

function changeDirection(){
    if(xDirection === 1 && yDirection === 1){
        yDirection = -1
        return
    }
    
    if(xDirection === 1 && yDirection === -1){
        xDirection = -1
        return
    }
    if(xDirection === -1 && yDirection === -1){
        yDirection = 1
        return
    }
    if(xDirection === -1 && yDirection === 1){
        xDirection = 1
        return
    }
}

timerId = setInterval(moveBall, 5)
