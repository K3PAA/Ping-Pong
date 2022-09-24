export default class Ball{
    constructor({size, position, selector, direction, speed}){
        this.size = size
        this.position = JSON.parse(JSON.stringify(position));
        this.startingPosition = JSON.parse(JSON.stringify(position));
        this.selector = selector
        this.direction = direction
        this.speed = speed

        this.ball = document.createElement('div')
        this.ball.classList.add('ball')
        this.draw()
        document.querySelector(this.selector).append(this.ball)
        
        
    }

    draw(){
        this.ball.style.left = this.position.x + 'px'
        this.ball.style.top = this.position.y + 'px'
    }

    move(){
        this.position.x += this.direction.x * this.speed
        this.position.y += this.direction.y * this.speed
        this.draw()
    }

    checkForWallCollision({gridHeight}){
        //Wall collisions
        if(this.position.y > gridHeight - this.size ||
            this.position.y < 0){
                this.changeDirection()
        }
        
    }

        //end
    checkForPlayerCollision({player}){
        if( this.position.x + this.size > player.position.x &&
            this.position.x < player.position.x + player.dimensions.x &&
            this.position.y + this.size > player.position.y &&
            this.position.y < player.position.y + player.dimensions.y){
            this.changeDirection()
        }
    }
    
    reset(){
        this.position.x = this.startingPosition.x
        this.position.y = this.startingPosition.y
    }

    changeDirection(){
        if(this.direction.x === 1 && this.direction.y === 1){
            this.direction.y = -1
            return
        }
        
        if(this.direction.x === 1 && this.direction.y === -1){
            this.direction.x = -1
            return
        }
        if(this.direction.x === -1 && this.direction.y === -1){
            this.direction.y = 1
            return
        }
        if(this.direction.x === -1 && this.direction.y === 1){
            this.direction.x = 1
            return
        }
    }
}