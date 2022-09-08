//link HTML
const grid = document.querySelector('.grid')

const gridWidth = 600
const gridHeight = 350

const timerDisplay = document.querySelector('.timer')
const playerResultDisplay = document.querySelector('.playerResultDisplay')
const enemyResultDisplay = document.querySelector('.enemyResultDisplay')

const firstName = document.querySelector('#firstName')
const secondName = document.querySelector('#secondName')

const plateHeight = 100
const plateWidth = 10

const ballSize = 20

const ballPosition = [ (gridWidth/2), (gridHeight / 2)]
let ballCurrenPosition = ballPosition


let timer

let timeLeft = 99

let timerId

//-----------------

const player1 = new Player({
    keyup: 'ArrowUp',
    keydown: 'ArrowDown',
    timeInterval: 50,
    position: {
        x: 560,
        y: 125
    },
    distance: 10,
    dimensions: {
        x: 10,
        y: 100
    },
    name: 'Kuba'
})

const player2 = new Player({
    keyup: 'w',
    keydown: 's',
    timeInterval: 50,
    position: {
        x: 30,
        y: 125
    },
    distance: 10,
    dimensions: {
        x: 10,
        y: 100
    },
    name: "Bartek"
})

const ball = new Ball({
    size: 20,
    position: {
        x: 350,
        y: 125
    },
    selector: '.grid',
    direction: {
        x: 1,
        y: 1
    },
    speed: 0.5
})


// Move Ball
function moveBall(){
    ball.move()
    ball.draw()

    checkForCollision()
}

function checkForCollision(){

    ball.checkForPlayerCollision({
        player: player1
    })
    ball.checkForPlayerCollision({
        player: player2
    })
    ball.checkForWallCollision({
        gridHeight: gridHeight
    })
    
    if(ball.position.x > gridWidth - ball.size){
        player2.score++
        playerResultDisplay.innerHTML = player2.score

        ball.reset()
    }
    if(ball.position.x < 0){
        player1.score++
        enemyResultDisplay.innerHTML = player1.score
        ball.reset()
    }
}



timerId = setInterval(moveBall, 1)


timer = setInterval(endOfGame, 1000)

function endOfGame(){
    timeLeft --
    timerDisplay.innerHTML = timeLeft

    if(timeLeft === 0){
        clearInterval(timerId)
        clearInterval(timer)
        if(player1.score > player2.score){
            timerDisplay.innerHTML = `${player1.name} won`
        }else if(player1.score < player2.score){
            timerDisplay.innerHTML =  `${player2.name} won`
        }else{
            timerDisplay.innerHTML = 'Draw'
        }
        window.removeEventListener('keydown', movePlayer)
    }
}

firstName.innerHTML = player1.name
secondName.innerHTML = player2.name

