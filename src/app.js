import Ball from "./Ball.js"
import Player from "./Player.js"
import Timer from "./Timer.js"

//link HTML
const grid = document.querySelector('.grid')
const stop = document.querySelector('.stop')
const start = document.querySelector('.start')

const gridWidth = 600
const gridHeight = 350

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


let timerId
let value1
let value2

//Start game

const player1 = new Player({
    keyup: 'ArrowUp',
    keydown: 'ArrowDown',
    timeInterval: 1,
    position: {
        x: 560,
        y: 125
    },
    distance: 1,
    dimensions: {
        x: 10,
        y: 100
    },
    name: undefined
})

const player2 = new Player({
    keyup: 'w',
    keydown: 's',
    timeInterval: 1,
    position: {
        x: 30,
        y: 125
    },
    distance: 1,
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

const time = new Timer({
    timeLeft: 10,
    player1: player1,
    player2: player2,
    timerId: timerId,
    moveBall: moveBall()
})
    
//-----------------
// Move Ball
function moveBall(){
    checkForCollision()
    ball.move()
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


stop.addEventListener('click', ()=> {
    time.stop()
    timerId = clearInterval(timerId)
    timerId = undefined
})

start.addEventListener('click', ()=> {
    if(timerId == undefined){
        timerId = setInterval(moveBall, 1)
        time.start()
    } 
})

startButton.addEventListener('click', ()=>{
    value1 = input1.value
    value2 = input2.value
    
    
    // if(value1 == '' || value1 == ' ' || value2 == '' || value2 == ' '){
    //     result.innerHTML = `Enter username`
    //     return
    // }else{
        player1.score = 0
        player2.score = 0
        time.reset()
       

        playerResultDisplay.innerHTML = player1.score
        enemyResultDisplay.innerHTML = player2.score

        input1.value = ''
        input2.value = ''
        player1.name = value1
        player2.name = value2
        gameDisplay.classList.toggle('notActive')
        menu.classList.toggle('notActive')
       
       
        firstName.innerHTML = player1.name
        secondName.innerHTML = player2.name
       
        ball.reset()
        time.start()
    //}
})


