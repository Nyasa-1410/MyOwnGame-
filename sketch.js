var diverImg,bgImg, diverleft;
var ground , paperBin , glassBin , PlasticBin;
var PLDB , PDB , GDB;
var PaperImg , GlassImg , PlasticImg;
var paper , paperGroup , glass , glassGroup , plastic , plasticGroup;
var diver;
var paperCount=0,glassCount=0,plasCount=0;
var IsGameOver = false;

function preload(){
  diverImg = loadImage("Diver1.png");
  bgImg = loadImage("BG2.jpg");
  PLDB = loadImage("PlasticDB.png");
  PDB = loadImage("PaperDB.png");
  GDB = loadImage("GlassDB.png");
  PaperImg = loadImage("Paper.png");
  GlassImg = loadImage("Glass.png");
  PlasticImg = loadImage("PlasticBag.png");
  diverleft = loadImage("Diver2.png");

}

function setup() {
  createCanvas(displayWidth,displayHeight);

  ground = createSprite(displayWidth/2, displayHeight/2 , displayWidth , displayHeight);
  ground.addImage(bgImg);
  ground.scale = 1.8;
  ground.x = ground.width/2;

  paperBin = createSprite(displayWidth-260,130,50,50);
  paperBin.addImage(PDB)
  paperBin.scale = 0.35;

  glassBin = createSprite(displayWidth-180,137,50,50);
  glassBin.addImage(GDB);
  glassBin.scale = 0.35;

  PlasticBin = createSprite(displayWidth-100,130,50,50)
  PlasticBin.addImage(PLDB)
  PlasticBin.scale = 0.35;

  diver = createSprite(160,displayHeight/2+200);
  diver.addImage(diverImg);

  paperGroup = new Group();
  glassGroup = new Group();
  plasticGroup = new Group();

}

function draw() {
  background(255);  
if(IsGameOver===false){
  ground.velocityX = 4;
  if(ground.x>displayWidth-200){
    ground.x = displayWidth/2;
  }
  
  if(frameCount%100===0){
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1: Paper();
      break;
      case 2: Plastic();
      break;
      case 3: Glass();
      break;
      default: break;
    }
  }

  if(keyDown(LEFT_ARROW) && diver.x>80){
    diver.addImage(diverleft);
    diver.x = diver.x-3;
  }

  if(keyDown(RIGHT_ARROW) && diver.x<displayWidth-100){
    diver.x = diver.x+3;
    diver.addImage(diverImg);
  }
  
  if(keyDown(UP_ARROW) && diver.y>displayHeight/4){
    diver.y = diver.y-3;
  }

  if(keyDown(DOWN_ARROW) && diver.y<displayHeight){
    diver.y = diver.y+3;
  }

  if(plasticGroup.isTouching(diver)){
  plasticGroup.destroyEach();
  plasCount+=1;
  }

  if(paperGroup.isTouching(diver)){
    paperGroup.destroyEach();
    paperCount+=1;
  }

  if(glassGroup.isTouching(diver)){
    glassGroup.destroyEach();
    glassCount+=1;
  }

  if(paperCount>=1 && plasCount>=1 && glassCount>=1){
    IsGameOver=true;
    GameOver();
  }
}

  drawSprites();

  fill("red");
  textSize(20);
  text(paperCount,displayWidth-240,80);
  text(glassCount,displayWidth-160,82);
  text(plasCount,displayWidth-80,82);
}

function Paper(){
     paper = createSprite(random(500 , displayWidth-100) , random(displayHeight/4 , displayHeight-100));
     paper.addImage(PaperImg);
     paper.scale = 0.3;
     paper.lifetime = 150;
     paperGroup.add(paper);
}

function Plastic(){
  plastic = createSprite(random(500 , displayWidth-100) , random(displayHeight/4 , displayHeight-100));
  plastic.addImage(PlasticImg);
  plastic.scale = 0.15;
  plastic.lifetime = 150;
  plasticGroup.add(plastic);
}

function Glass(){
  glass = createSprite(random(500 , displayWidth-100) , random(displayHeight/4 , displayHeight-100));
  glass.addImage(GlassImg);
  glass.scale = 0.2;
  glass.lifetime = 150;
  glassGroup.add(glass);
}

function GameOver(){
  swal({
    title: "YOU WIN!!",
    text: "Thanks for playing", 
    text: "You have helped in cleaning " + plasCount + " polybags," + glassCount + " glass bottles and " + paperCount + " paper waste.",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/41fXSaYU3dL._SY445_.jpg",
    imageWidth: 75,
    imageHeight: 75,
    confirmButtonText: "Play Again"
  })
  .then (function(isConfirm){
    if(isConfirm){
      console.log("Button is pressed");
      IsGameOver=false;
      console.log(IsGameOver);
      location.reload();
    }
  }
  )
}