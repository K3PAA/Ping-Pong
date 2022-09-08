//link HTML
const grid = document.querySelector('.grid')

const gridWidth = 600
const gridHeight = 350

const timerDisplay = document.querySelector('.timer')
const playerResultDisplay = document.querySelector('.playerResultDisplay')
const enemyResultDisplay = document.querySelector('.enemyResultDisplay')

const playerPosition = [30, 125]
let playerCurrenPosition = playerPosition

const plateHeight = 100
const plateWidth = 10

const enemyPosition = [560, 125]
let enemyCurrenPosition = enemyPosition

const ballSize = 20

const ballPosition = [ (gridWidth/2), (gridHeight / 2)]
let ballCurrenPosition = ballPosition


let timer

let timeLeft = 99

let xDirection = 1
let yDirection = 1

let timerId


//create ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.append(ball)



//-----------------

const player1 = new Player({
    keyup: 'ArrowUp',
    keydown: 'ArrowDown',
    timeInterval: 50,
    position: {
        x: 560,
        y: 125
    },
    distance: 10
})

const player2 = new Player({
    keyup: 'w',
    keydown: 's',
    timeInterval: 50,
    position: {
        x: 30,
        y: 125
    },
    distance: 10
})




//draw ball
function drawBall(){
    ball.style.left = ballCurrenPosition[0] + 'px'
    ball.style.top = ballCurrenPosition[1] + 'px'
}



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
        player2.score++
        playerResultDisplay.innerHTML = player2.score
        ballCurrenPosition = [300, 150]
    }
    if(ballCurrenPosition[0] < 0){
        player1.score++
        enemyResultDisplay.innerHTML = player1.score
        ballCurrenPosition = [300, 150]
    }

    player1.checkForCollision()
    player2.checkForCollision()

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

timerId = setInterval(moveBall, 8)

timer = setInterval(endOfGame, 1000)

function endOfGame(){
    timeLeft --
    timerDisplay.innerHTML = timeLeft

    if(timeLeft === 0){
        clearInterval(timerId)
        clearInterval(timer)
        if(player1.score > player2.score){
            timerDisplay.innerHTML = 'Player1 won'
        }else if(player1.score < player2.score){
            timerDisplay.innerHTML = 'Player2 won'
        }else{
            timerDisplay.innerHTML = 'Draw'
        }
        window.removeEventListener('keydown', movePlayer)
    }
}

