
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var play = 1;
var end = 0;
var survivalTime = 0;
var gameOverImage, gameOver;
var gameState = "play";
var groundImage, ground;
var invisibleGround;


function preload(){
  
  
monkey_running= loadAnimation ("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  gameOverImage = loadImage("GameOver.png");
  
  monkeyDie = loadImage("sprite_0.png");
}



function setup() {
createCanvas(600, 600);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.addAnimation("die", monkeyDie);
  monkey.scale = 0.2;
  
  
  ground = createSprite(400,548, 900, 20); 
  ground.x = ground.width /2;
  ground.velocityX = -4;

  
  
  invisibleGround = createSprite(100, 555, 1000, 30);
  gameOver=createSprite(300, 300, 30, 10);
  gameOver.visible = false;
  
  obstaclesGroup = createGroup();
  foodGroup = createGroup();  
  
  gameOver.addImage (gameOverImage);
     gameOver.scale=1.3;

    
}
  



function draw() {
background("orange");

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);  
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time:"+ survivalTime, 100,50);


  monkey.collide(invisibleGround);
    monkey.velocityY = monkey.velocityY + 0.8;
monkey.depth = monkey.depth+1;
 
invisibleGround.visible = false;

 
  
  if (gameState === "play"){
createFoodGroup();
createObstacleGroup();
    if(keyDown("space") ) {
      monkey.velocityY = -12;
 } 
    
    if (foodGroup.isTouching(monkey)){
      score = score+5;
      foodGroup.destroyEach();
    }
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }

if(obstaclesGroup.isTouching(monkey)){
   gameState = "end";
  obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
} 
  }
  if (gameState==="end"){
    gameOver.depth=gameOver.depth + 1;
    
   ground.velocityX = 0;
    gameOver.visible = true;
    monkey.changeAnimation("die");
   
  }
drawSprites(); 
  

}



function createFoodGroup(){
  if (frameCount % 130 === 0) {
        banana = createSprite(600,random(200,400),40,10);
    banana.addImage(bananaImage);
    banana.scale=0.15;
    banana.velocityX = -5;
    banana.lifetime = 130;
    foodGroup.add(banana);
  }

}

function createObstacleGroup(){
  
  if (frameCount % 300 === 0){
    obstacle = createSprite(600,500,40,10);
        obstacle.addImage(obstacleImage);
  obstacle.scale = 0.25;
    obstacle.velocityX=-10;
    obstacle.lifetime=130;
  obstaclesGroup.add(obstacle);

    
  }
  
  
}





