const timerDisplay = document.querySelector('.timer')
const gameDisplay = document.querySelector('.container')
const menu = document.querySelector('.menu')
const result = document.querySelector('.result')

export default class Timer{
    constructor({timeLeft, player1, player2, timerId, moveBall}){
        this.timeLeft = timeLeft
        this.interval = undefined
        this.player1 = player1
        this.player2 = player2
        this.timerId = timerId
        this.moveBall = moveBall
    }

    draw(){
        timerDisplay.innerHTML = this.timeLeft
    }

    start(){
        this.draw()
        this.interval = setInterval( ()=> {
            if(this.timeLeft > 1){
                this.timeLeft -- 
                this.draw()
            }else{
                gameDisplay.classList.add('notActive')
                menu.classList.remove('notActive')
               
                //Player One won
                if(this.player1.score > this.player2.score) result.innerHTML = `${this.player1.name} won`
                //Player Two won
                else if(this.player1.score < this.player2.score) result.innerHTML =  `${this.player2.name} won`
                //Draw
                else result.innerHTML = 'Draw'

                    this.player1.resetPosition
                    this.player2.resetPosition
                    this.player1.draw()
                    this.player2.draw()

                    this.timerId = setInterval(this.moveBall, 1)
            }
        }, 1000)
    }

    stop(){
        this.interval = clearInterval(this.interval)
        this.interval = undefined   
    }

    reset(){
        this.timeLeft = 10
        this.Interval = clearInterval(this.interval)
        this.interval = undefined
    }
}

