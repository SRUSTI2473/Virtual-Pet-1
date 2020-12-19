var dog, dogImg, dogImg1;
var database;
var foodS,foodStock;

function preload(){
dogImg = loadImage("dogImg.png");
dogImg1 = loadImage("dogImg1.png");
}

function setup() {
  database=firebase.database();
  createCanvas(500,500);

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20);
  
  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;
}

function draw() {
  background(46,139,87);

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(dogImg1);
  }
 
  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : " +foodS, 170, 200);
  textSize(15);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!", 130, 10, 300, 20); 
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
}

//function to write values food stock
function writeStock(x) {
 if (x<=0) {
    x=0;
  } else {
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}