var player
var road
var life1
var life2
var life3
var life = 3
var regainLife
var thirst
var water
var coin
var obstacle1
var track
var score = 0
var obstacleGroup
var PLAY = 1
var END = 0
var gameState = PLAY
var crash
var bg

function preload(){

    playerImg = loadAnimation("./assets/Runner-1.png","./assets/Runner-2.png");
    roadImg = loadImage("./assets/path.png");
    lifeImg = loadImage("./assets/heart.png");
    waterImg = loadImage("./assets/drink.png");
    coinImg = loadImage("./assets/coin.png");
    obstacleImg = loadImage("./assets/obstacle1.png");
    crash = loadSound("./assets/oof.mp3");
    bg = loadSound("./assets/bg.mp3");
}

function setup(){
   canvas = createCanvas(700, 645);

    track = createSprite(400,150,500,1850)
    track.addImage(roadImg)
    track.scale = 1.5;
    track.velocityY = +4

    life1 = createSprite(50,100,20,20);
    life1.addImage(lifeImg);
    life1.scale = 0.2

    life2 = createSprite(100,100,20,20);
    life2.addImage(lifeImg);
    life2.scale = 0.2

    life3 = createSprite(150,100,20,20);
    life3.addImage(lifeImg);
    life3.scale = 0.2

    player = createSprite(400,500,20,20)
    player.addAnimation("player",playerImg);
    player.scale = 0.08

   obstacleGroup = new Group();

   player.setCollider("rectangle",0,0,100,100)
   player.debug = true
    bg.play()
    bg.setVolume(0.1)
}



function draw(){
    background("black")

    stroke("yellow")
    fill("red")
    textSize(25)
    text("Score: "+ score, 20,50);
    
    
    if(gameState === PLAY){
        score = score + Math.round(getFrameRate()/60);
        
        if(track.y > 400){
            track.y = height/2;
        }


        if(life===3){
            life1.visible = true
            life2.visible = true
            life3.visible = true
          }
          if(life===2){
            life1.visible = false
            life2.visible = true
            life3.visible = true
          }
          if(life===1){
            life1.visible = false
            life2.visible = false
            life3.visible = true
          }

        if(keyDown(LEFT_ARROW)){
            player.x -= 5
        }

        if(keyDown(RIGHT_ARROW)){
            player.x += 5
        }
        
        
        
        if(obstacleGroup.isTouching(player)){
            crash.play()
            life=life-1
            player.x = player.x + 150
         }
         
        obstacles();
        drawSprites()
        
        if(life===0){
            gameState = END
        }
    }
   else if(gameState === END){
    track.velocityY = 0
    obstacleGroup.setVelocityYEach(0);
    obstacleGroup.destroyEach();
    textSize(30)
    fill ("red")
    text("Game Over! Your score: "+ score, 140, 320)
   
   }


    
    edges = createEdgeSprites();
    player.collide(edges);
   
   
}

function obstacles(){
    if(frameCount%120===0){
        obstacle1 = createSprite(random(250,400),1,20,20)
        obstacle1.addImage(obstacleImg)
        obstacle1.scale = 0.4
        obstacle1.velocityY = 5
        obstacleGroup.add(obstacle1)
    }
}