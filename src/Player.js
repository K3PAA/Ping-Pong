// -------------------------
const grid = document.querySelector('.grid')

export default class Player{
    constructor({keyup, keydown, timeInterval, position, distance, score = 0, dimensions, name}){
        this.keyup = keyup
        this.keydown = keydown
        this.timeInterval = timeInterval
        this.startPosition = JSON.parse(JSON.stringify(position));
        this.position = JSON.parse(JSON.stringify(position));
        this.distance = distance
        this.score = score
        this.dimensions = dimensions
        this.playerHeight = 100
        this.gridHeight = 350
        this.name = name
        this.upInterval = undefined
        this.downInterval = undefined
        this.element = document.createElement('div')
        this.element.classList.add('player')
        this.draw()
        grid.append(this.element)

        window.addEventListener('keydown', this.move.bind(this))
        window.addEventListener('keyup', this.stop.bind(this))
    }

    move(e){
        switch(e.key){
            case this.keyup:   
                if(!this.upInterval){
                    this.upInterval = setInterval(function(){
                        if(this.position.y > 0)
                            this.position.y -= this.distance
                            this.draw()
                    }.bind(this), this.timeInterval)
                }
            break
                
            case this.keydown:   
                if(!this.downInterval){
                    this.downInterval = setInterval(function(){
                        if(this.position.y < this.gridHeight - this.playerHeight )
                            this.position.y += this.distance
                            this.draw()
                    }.bind(this), this.timeInterval)
                }
            break
        }
    }

    stop(e){
        switch(e.key){
            case this.keyup:   
                clearInterval(this.upInterval)
                this.upInterval = undefined
            break
                
            case this.keydown:   
                clearInterval(this.downInterval)
                this.downInterval = undefined
            break
        }
    }

    draw(){       
        this.element.style.left = this.position.x + 'px'
        this.element.style.top = this.position.y + 'px'
    }

    get resetPosition(){
        this.position.y = this.startPosition.y
        
    }
}