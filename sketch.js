var mario, ground, ground1;
var backgroundImg, marioImg1;
var level=1;
var mushroom, mushroomImg, mushroom2;
var enemy, enemyImg;
var enemyGroup, obstacle1, obstacle2;

function preload(){
  marioImg1=loadImage("Mario small.png")
  marioImg2=loadImage("Mario medium.png")
  marioImg3=loadImage("Mario big.png");
  mushroomImg=loadImage("mushroom.png");
}

function setup() {
  createCanvas(2000,650);
  mario=createSprite(100,747, 50,50);
  mushroom=createSprite(200,740,50,20);
  ground=createSprite(0,900,1500,650);
  ground.shapeColor="brown";
  mushroom.addImage(mushroomImg);
  mario.scale=0.2;
  mushroom.scale=0.5;
  enemyGroup= new Group();
  mario.debug=true;
  mario.setCollider("rectangle", 0, 0, 100, 500)
}

function draw() {
  background("white");
  mario.collide(ground);
  mushroom.collide(ground);
  if(mario.isTouching(mushroom)){
    level+=1;
    mushroom.destroy();
  }
  Obstacles();
  movement();
  MarioSize();
  Enemy();
  mario.collide(obstacle1)
  drawSprites();
}

function MarioSize(){
  if(level==1){
    mario.addImage(marioImg1);
  }
  if(level==2){
      mario.addImage(marioImg2)
  }
  if(level==3){
    mario.addImage(marioImg3);
  }
}

function movement(){
  if(keyDown("up")||keyDown("space")){
    mario.y=mario.y-50;
  }
  if(keyDown("left")){
    mario.x-=10;
  }
  if(keyDown("right")){
    mario.x+=10;
  }
  mario.y=mario.y+20;
}

function Obstacles(){
  obstacle1=createSprite(300, 870, 50, 100);
  obstacle1.collide(ground);
 }

function Enemy(){
  enemy=createSprite(400,870,50,50);
  enemy.collide(ground);
  enemyGroup.add(enemy)
  if(mario.x==enemy.x&&mario.y==enemy.y){
  if(mario.isTouching(enemyGroup)){
    enemyGroup.destroyEach();
    level-=1;
  }
}
  else if(mario.x==enemy.x&&mario.y<enemy.y&&enemyGroup.isTouching(mario)){
    enemyGroup.destroyEach();
  }
  console.log(level);
}