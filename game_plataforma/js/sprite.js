 const gravity = 0.4

 const backgroundPath = "../assets/placeholder.png";

class Sprite{
    constructor({position,velocity,dimensions,sorce}){
        this.position = position
        this.velocity = velocity        
        this.width = dimensions?.width
        this.height = dimensions?.height

        if(sorce){
            this.image = new Image()
            this.image.src = sorce

            this.width = this.image.width
            this.height = this.image.height
        }
    }

    draw(){
        if(this.image){
            ctx.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            )
        }else{
            ctx.fillStyle = 'white'
            ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
        }
       
        if(this.isAttacking){
            ctx.fillStyle = "red"
            ctx.fillRect(this.attackBox.x, this.attackBox.y, this.attackBox.width, this.attackBox.height)
        }
    }

    update(){  
        if(Math.ceil(this.position.y + this.height >= canvas.height)){
            this.onGround = true
        } else{
                this.onGround = false
        }  

        if(this.position.y + this.height > canvas.height){
            this.position.y = canvas.height - this.height
            this.velocity.y = 0
        }else{
            if(!this.onGround){
                this.velocity.y += gravity
            }
        }
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.attackBox.x = this.position.x
        this.attackBox.y = this.position.y

        this.draw()

    }

    attack(){
        if(this.onAttackCoolDown) {return}

        this.isAttacking = true

        setTimeout(()=>{
            this.isAttacking = false
        },180)
    }

    jump(){
        if(!this.onGround) {
            return 
    }
    this.velocity.y = -16
  }
}

class Fighter  extends Sprite{
    constructor({position,velocity,dimensions}){
        super({position,velocity,dimensions})
        this.velocity = velocity
        this.width= dimensions.width
        this.height = dimensions.height
      
        this.attackBox = {
            position:{
                x: this.position.x,
                y: this.position.y
            },
            width:125,
            height: 50
        }

        this.isAttacking
        this.attackCoolDown = 500
        this.onAttackCoolDown

        this.lastKeyPressed
        this.onGround
    }
}

const player =  new Fighter({
    position: {
        x:0,
        y:0
    },
    velocity:{
        x:0,
        y:2
    },
    dimensions:{
        width:50,
        height:150
    }
})

const background = new Sprite({
    position:{
        x:0,
        y:0
    },
    velocity:{
        x:0,
        y:0
    },
    sorce: backgroundPath
})