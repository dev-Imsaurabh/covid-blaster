//project setup
import spaceship from "./spaceship.png"
import enemy from "./enemy.png"
import "./style.css"
import destroyed from "../assets/destroyed.mp3"

export const Game=({setScore,setActive})=>{
    
window.onload=()=>{
    const div  = document.createElement("div")
    // document.body.style.overflow="hidden"
    div.style.position="relative"
    div.style.width ="950px"
    div.style.height =window.innerHeight
    // div.style.border="1px solid yellow"
    const can = document.createElement("canvas")
    const h1 = document.createElement("H1")
    h1.style.fontSize="100px"
    h1.className="bg"
    h1.innerText="Game over"
    h1.style.position="absolute"
    h1.style.top=0
    h1.style.right=0
    h1.style.bottom=0
    h1.style.left=0
    h1.style.display="none"
    h1.style.textAlign="center"
    const span = document.createElement("span")
    span.setAttribute("id","score")
    span.style.position = "absolute"
    span.style.top=0

    div.append(can,h1,span)
    window.document.body.append(div)
    const canvas = document.querySelector("canvas")
    canvas.style.margin="auto"
    canvas.style.border = "1px dotted white"
    const c = canvas.getContext("2d")
    canvas.width =950
    canvas.height =window.innerHeight
    const shipSpeed = 10
    const enemydownspeed =30
    const enemyshootspeed =5
    const enemydispersespeed=6
    const shipturnangle = 0.30
    const shipshootradius =4
    const starsCount =100
    const starsColor = "white"
    const enemyshootcolor = "red"
    const shipshootcolor="yellow"
    let scoreboard =0
    
    const enemyshootdim={
        width:5,
        height:20
    }
    const backgroundspeed =1
    let score =document.querySelector("#score")
    
    
    class Player{
        constructor(){
           
            this.velocity={
                x:0,
                y:0
            }
    
            this.rotation = 0
            this.opacity =1
            
            const image = new Image()
            image.src=spaceship
            image.onload=()=>{
                const scale = 0.15
                this.image=image
                this.width=image.width*scale
                this.height=image.height*scale
                this.position={
                    x:canvas.width / 2 - this.width /2,
                    y:canvas.height - this.height -20
                }
        
    
            }
    
           
    
        }
    
        draw(){
            // c.fillStyle = "red",
            // c.fillRect(this.position.x,this.position.y,this.width,this.height)
                 c.save()
                 c.globalAlpha =this.opacity
        
                 c.translate(
                    player.position.x+player.width/2,
                    player.position.y+player.height/2
                    )
    
                    c.rotate(this.rotation)
    
                    c.translate(
                        -player.position.x-player.width/2,
                        -player.position.y-player.height/2
                        )
    
                c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
    
    
                c.restore()
    
            
        }
    
        update(){
            if(this.image){
            this.draw()
            this.position.x +=this.velocity.x
            }
    
        }
    }
    
    
    class Projectile{
        constructor({position,velocity}){
            this.position =position
            this.velocity = velocity
            this.radius =shipshootradius
        }
    
        draw(){
            c.beginPath()
            c.arc(this.position.x,this.position.y,this.radius,0, Math.PI*2)
            c.fillStyle=shipshootcolor
            c.fill()
            c.closePath()
        }
    
        update(){
            this.draw()
            this.position.x+=this.velocity.x
            this.position.y+=this.velocity.y
        }
    }
    
    
    class EnemyProjectile{
        constructor({position,velocity}){
            this.position =position
            this.velocity = velocity
            this.width =enemyshootdim.width
            this.height=enemyshootdim.height
        }
    
        draw(){
            c.fillStyle = enemyshootcolor
            c.fillRect(this.position.x,this.position.y,this.width,this.height)
            
        }
    
        update(){
            this.draw()
            this.position.x+=this.velocity.x
            this.position.y+=this.velocity.y
        }
    }
    
    
    
    
    class Enemy{
        constructor({position}){
           
            this.velocity={
                x:0,
                y:0
            }
    
            
            const image = new Image()
            image.src=enemy
            image.onload=()=>{
                const scale = 0.1
                this.image=image
                this.width=image.width*scale
                this.height=image.height*scale
                this.position={
                    x:position.x,
                    y:position.y
                }
        
    
            }
    
           
    
        }
    
        draw(){
            // c.fillStyle = "red",
            // c.fillRect(this.position.x,this.position.y,this.width,this.height)
               
    
                c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
    
            
        }
    
        update({velocity}){
            if(this.image){
            this.draw()
            this.position.x +=velocity.x
            this.position.y +=velocity.y
            }
    
        }
    
        shoot(enemyProjectiles){
         if(this.image){
            enemyProjectiles.push(new EnemyProjectile({
                position:{
                    x:this.position.x+this.width/2,
                    y:this.position.y+this.height
                },
    
                velocity:{
                    x:0,
                    y:enemyshootspeed
                }
            }))
         }
            
        }
    }
    
    
    class Grid{
        constructor(){
            this.position ={
                x:0,
                y:0
            }
    
    
            this.velocity ={
                x:enemydispersespeed,
                y:0
            }
    
            this.enemys=[]
    
            const rows = Math.floor(Math.random()*5+2)
            const cols = Math.floor(Math.random()*10+5)
            this.width = cols*3
            for(let x =0; x<cols; x++ ){
                for(let y =0; y<rows; y++ ){
    
                this.enemys.push(new Enemy({position:{
    
                    x:x*30,
                    y:y*30
    
                }}))
            }
        }
        }
    
        update(){
    
            this.position.x +=this.velocity.x
            this.position.y += this.velocity.y
            this.velocity.y=0
            if(this.position.x+this.width>=canvas.width||this.position.x<=0){
                this.velocity.x = -this.velocity.x
                this.velocity.y=enemydownspeed
    
            }
        }
    }
    
    
    
    class Particle{
        constructor({position,velocity,radius,color,fades}){
            this.position =position
            this.velocity = velocity
            this.radius =radius
            this.color=color
            this.opacity=1
            this.fades =fades
        }
    
        draw(){
            c.save()
            c.globalAlpha=this.opacity
            c.beginPath()
            c.arc(this.position.x,this.position.y,this.radius,0, Math.PI*2)
            c.fillStyle=this.color
            c.fill()
            c.closePath()
            c.restore()
        }
    
        update(){
            this.draw()
            this.position.x+=this.velocity.x
            this.position.y+=this.velocity.y
            if(this.fades) this.opacity -= 0.01
    
        }
    }
    
    
    
    
    const player = new Player()
    const projectiles =[]
    const grids =[new Grid()]
    const enemyProjectiles =[]
    const particles =[]
    
    let keys = {
        leftkey:{
            pressed:false
        },
        rightkey:{
            pressed:false
        },
        spacekey:{
            pressed:false
        }
    }
    
    let frames =0
    let randomInterval =Math.floor(Math.random()*500+500)
    let game = {
        over:false,
        active:true
    }
    function animate(){
        if(!game.active) return
        requestAnimationFrame(animate)
        c.fillStyle="black"
        c.fillRect(0,0,canvas.width,canvas.height)
    
        player.update()
    
        
    
    
        particles.forEach((particle,index)=>{
    
            if(particle.position.y-particle.radius>=canvas.height){
                particle.position.x=Math.random()*canvas.width
                particle.position.y=-particle.radius
            }
    
            if(particle.opacity<=0){
                particles.slice(1,index)
                return
            }
    
            particle.update()
        })
    
        enemyProjectiles.forEach((enemyProjectile,index)=>{
            if(enemyProjectile.position.y + enemyProjectile.height>=canvas.height){
    
                setTimeout(()=>{
    
                    enemyProjectiles.splice(index,1)
    
                },0)
    
            }else{
            enemyProjectile.update()
                
            }
    
    
            if(enemyProjectile.position.y + enemyProjectile.height>=player.position.y&&enemyProjectile.position.x+enemyProjectile.width>=player.position.x&&enemyProjectile.position.x<=player.position.x+player.width){
                console.log("you lose")
                createParticles(player,"white",true)
    
                setTimeout(()=>{
    
                    enemyProjectiles.splice(index,1)
                    player.opacity =0
                    game.over = true
                    let audio = new Audio()
                    audio.src=destroyed
                    audio.play()
                    setActive(false)

                
                },0)
                setTimeout(()=>{
    
                  game.active=false
                  document.querySelector("h1").style.display="block"
                
                },2000)
                
            }
    
        })
    
        projectiles.forEach((projectile,i)=>{
            if(projectile.position.y+projectile.radius<=0){
                setTimeout(()=>{
                    projectiles.splice(i,1)
    
                },0)
            }else{
                projectile.update()
    
            }
    
        })
    
        grids.forEach((grid,gridIndex)=>{
            grid.update()
    
            if(frames%100==0&&grid.enemys.length>0){
                grid.enemys[Math.floor(Math.random()*grid.enemys.length)].shoot(enemyProjectiles)
            }
    
    
    
            grid.enemys.forEach((enemy,i)=>{
                enemy.update({velocity:grid.velocity})
    
                projectiles.forEach((projectile,j)=>{
                    if(projectile.position.y-projectile.radius<=enemy.position.y+enemy.height&&projectile.position.x+projectile.radius>=enemy.position.x&&projectile.position.x-projectile.radius<=enemy.position.x+enemy.width&&projectile.position.y+projectile.radius>=enemy.position.y){
    
    
                    
                        setTimeout(()=>{
                            const enemyFound = grid.enemys.find(enemy2=>{
                                return enemy2==enemy
                            })
                            const projectileFound = projectiles.find(projectile2=>
                                 projectile2==projectile
                            )
                            if(enemyFound&&projectileFound){
                               createParticles(enemy,"red",true)
            
                            scoreboard+=+100
                            setScore(scoreboard)
                            console.log(scoreboard)
                                grid.enemys.splice(i,1)
                                projectiles.splice(j,1)
    
                                // score.innerHTML="Score: "+scoreboard
                        
                                //increase score add sound
    
                                if(grid.enemys.length>0){
                                    const firstEnemy = grid.enemys[0]
                                    const lastEnemy = grid.enemys[grid.enemys.length-1]
    
                                    grid.width = lastEnemy.position.x-firstEnemy.position.x+lastEnemy.width
                                    grid.position.x = firstEnemy.position.x
                                }else{
                                    grids.splice(gridIndex,1)
                                }
    
    
                            }
    
    
                           
    
                        },0)
                    }
    
                })
    
            })
        })
    
        if(keys.leftkey.pressed && player.position.x>=0){
            player.velocity.x=-shipSpeed
            player.rotation =-shipturnangle
        }else if(keys.rightkey.pressed && player.position.x+player.width<=canvas.width){
            player.velocity.x =shipSpeed
            player.rotation =shipturnangle
    
        }else{
            player.velocity.x=0
            player.rotation=0
        }
    
        if(frames% randomInterval==0){
            grids.push(new Grid())
            randomInterval =Math.floor(Math.random()*500+500)
            frames=0
        }
    
    
       
        frames++
    
    }
    animate()
    
    
    
    for(let i =0; i<starsCount; i++){
        particles.push(new Particle({
            position:{
                x:Math.random()*canvas.width,
                y:Math.random()*canvas.height
            },
            velocity:{
                x:0,
                y:backgroundspeed
            },
            radius:Math.random()*3,
            color:starsColor
        }))
      }
    
    
    
    function createParticles(object,color,fades){
        console.log(object)
        for(let i =0; i<15; i++){
            particles.push(new Particle({
                position:{
                    x:object.position.x+object.width/2,
                    y:object.position.y+object.height/2
                },
                velocity:{
                    x:(Math.random()-0.5)*2,
                    y:(Math.random()-0.5)*2
                },
                radius:Math.random()*3,
                color:color||"yellow",
                fades:fades
            }))
          }
    }
    
    
    
    const controls = {
        UP:"ArrowUp",
        DOWN:"ArrowDown",
        LEFT:"ArrowLeft",
        RIGHT:"ArrowRight",
        SPACE:" "
    }
    
    
    
   window.addEventListener("keydown",({key})=>{
        if(game.over) return
        let {UP,DOWN,LEFT,RIGHT,SPACE} = controls
    
        switch(key){
    
          
            case LEFT:{
                keys.leftkey.pressed=true
                // console.log("Arrow left")
                return
            }
            case RIGHT:{
                keys.rightkey.pressed=true
                // console.log("Arrow right")
                return
            }
            case SPACE:{
                keys.spacekey.pressed=true
                projectiles.push(new Projectile({
                    position:{
                        x:player.position.x+player.width/2,
                        y:player.position.y
                    },
                    velocity:{
                        x:0,
                        y:-10
                    }
                }))
                return
            }
            default:{
                
                return
            }
    
        }
    
    })
    
    window.addEventListener("keyup",({key})=>{
        let {UP,DOWN,LEFT,RIGHT,SPACE} = controls
    
        switch(key){
    
          
            case LEFT:{
                keys.leftkey.pressed=false
                // console.log("Arrow left")
                return
            }
            case RIGHT:{
                keys.rightkey.pressed=false
                // console.log("Arrow right")
                return
            }
            case SPACE:{
                // console.log("space")
                return
            }
            default:{
                return
            }
    
        }
    
    })
    
    
    }
    
}