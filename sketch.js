var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var monkey , monkey_running;
var jungle,jungleImage;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, ObstaclesGroup;
var score = 0;
var SurvivalTime = 0;

function preload(){
  
  
  monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  jungleImage = loadImage("jungle.jpg");
 
}



function setup() {
 createCanvas(500,500);
  
 monkey = createSprite(60,420);
 monkey.addAnimation("moving",monkey_running);
 monkey.scale = 0.2;
  
  ground = createSprite(250,500,1000,20);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  //console.log(ground.x);
  
  
  
  jungle = createSprite(250,250,100,100);
  jungle.addImage(jungleImage);
  jungle.scale = 1;
  
  
   FoodGroup= createGroup();
  ObstaclesGroup = createGroup();
}


function draw() {
//background(jungle);
  
  if(gamestate === PLAY){
  
    jungle.velocityX = -4;
    
  if(jungle.x > 0){
    jungle.x = jungle.width/2;
  }
  
  if(keyDown("space")  ){
    monkey.velocityY = -13;
  }
  
  monkey.velocityY = monkey.velocityY +0.5; 
  
  monkey.collide(ground);
  
  food();
  obstacles();

 // stroke("white");
   // textSize(20);
    //fill("white");
    //text("Score: " + score,400,50);
    
    stroke("black");
    textSize(20);
    fill("black");
    SurvivalTime = Math.ceil(frameCount/frameRate());
    text("Survival Time:" + SurvivalTime,300,50);
  
  
   
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score = score+1;
    
  }
  }
  
  
  if(ObstaclesGroup.isTouching(monkey)){
    gamestate = END;
    endGame();
    //text.destroyEach();
    //xtSize(30);
   //ext("GAME OVER",300,300);
   //ameState = "over";
  }
  
  monkey.depth = jungle.depth+1;
    
 drawSprites(); 
}





function obstacles(){
  if(frameCount % 300 === 0 ){
     stone = createSprite(450,420)
     stone.addImage(obstacleImage);
     stone.velocityX = -4
     stone.scale = 0.3;
    
     ObstaclesGroup.add(stone);
     stone.lifetime = 125;
     }
}



function food(){
  if(frameCount % 80 === 0){
    banana= createSprite(450,200);
    banana.addImage(bananaImage);
    banana.scale = 0.2;
    banana.velocityX = -4
    
    banana.y = Math.round(random(100,250));
    FoodGroup.add(banana); 
    banana.lifetime = 125;
  }
}

 function endGame(){
  background("cyan");
  monkey.visible = false;
  FoodGroup.destroyEach();
 ObstaclesGroup.destroyEach();
  ground.visible = false;
  monkey.velocityX = 0;
  ground.velocityX = 0;
  FoodGroup.setVelocityXEach(0);
  ObstaclesGroup.setVelocityXEach(0);
  stroke("black");
  textSize(30);
  text("Game over",300,60);
  SurvivalTime.visible = false;
 }