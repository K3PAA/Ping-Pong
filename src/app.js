//link HTML
const grid = document.querySelector('.grid')

const gridWidth = 600
const gridHeight = 350

const timerDisplay = document.querySelector('.timer')
const playerResultDisplay = document.querySelector('.playerResultDisplay')
const enemyResultDisplay = document.querySelector('.enemyResultDisplay')

const firstName = document.querySelector('#firstName')
const secondName = document.querySelector('#secondName')

const startButton = document.querySelector('.btn-start')
const gameDisplay = document.querySelector('.container')
const menu = document.querySelector('.menu')
const result = document.querySelector('.result')

const input1 = document.querySelector('.input-one')
const input2 = document.querySelector('.input-two')

let timer
let timeLeft = 10
let timerId
let value1
let value2

//Start game

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
    name: undefined
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
    name: undefined
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
function startGame(){
    
//-----------------




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
        player1.score++
        playerResultDisplay.innerHTML = player1.score
        ball.reset()
    }
    if(ball.position.x < 0){
        player2.score++
        enemyResultDisplay.innerHTML = player2.score
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
        gameDisplay.classList.add('notActive')
        menu.classList.remove('notActive')
        console.log(player1.name)
        if(player1.score > player2.score){
            result.innerHTML = `${player1.name} won`
        }else if(player1.score < player2.score){
            result.innerHTML =  `${player2.name} won`
        }else{
            result.innerHTML = 'Draw'
        }
    }
}

firstName.innerHTML = player1.name
secondName.innerHTML = player2.name
}

startButton.addEventListener('click', ()=>{
    value1 = input1.value
    value2 = input2.value
    
    
    if(value1 == '' || value1 == ' ' || value2 == '' || value2 == ' '){
        result.innerHTML = `Enter username`
        return
    }else{
        player1.score = 0
        player2.score = 0

         playerResultDisplay.innerHTML = player1.score
        enemyResultDisplay.innerHTML = player2.score

        input1.value = ''
        input2.value = ''
        player1.name = value1
        player2.name = value2
        gameDisplay.classList.toggle('notActive')
        menu.classList.toggle('notActive')
        setTimeout(startGame, 400)

        timeLeft = 10


        player1.position.x = 560
        player1.position.y = 125
        player2.position.x = 30
        player2.position.y = 125
        ball.position.x = 350
        ball.position.y = 125
        player1.draw()
        player2.draw()
    }
})