let heartImg;
let yesButton;
let noButton;
let showHeart = false;
let heartOpacity = 0;
let textRotation = 0;
let fadeInSpeed = 3;

let font1;
let font2;
let font3;


// Add these as global variables
let yesButtonPosX;
let noButtonPosX;
let buttonPosY;

function preload() {
  heartImg = loadImage('heart.png');

  font1 = loadFont('fonts/Pinko-j99pl.ttf');
  font2 = loadFont('fonts/StylishCalligraphyDemo-XPZZ.ttf')
  font3 = loadFont('fonts/Xiomara-wWLw.ttf')
}

function setup() {
  textFont(font1);

  let canvasWidth = min(windowWidth, windowHeight * (9/16));
  let canvasHeight = canvasWidth * (16/9);
  
  createCanvas(canvasWidth, canvasHeight);
  background('#ff93d2');

  // Calculate button positions relative to canvas width, not window width
  yesButtonPosX = width/2 - 100; // Increased spacing between buttons
  noButtonPosX = width/2 + 20;   // Adjusted for better centering
  buttonPosY = height/2 + 100;   // Vertical position relative to canvas height
  
  yesButton = createButton('Yes');
  yesButton.class('game-button');
  yesButton.position(yesButtonPosX, buttonPosY);
  yesButton.mousePressed(showHeartImage);
  
  noButton = createButton('No');
  noButton.class('game-button');
  noButton.position(noButtonPosX, buttonPosY);
  noButton.mousePressed(moveNoButton);
  
  // Set text properties
  textAlign(CENTER, CENTER);
  textSize(width * 0.06);
}

function draw() {
  background('#ff93d2');
  
  if (!showHeart) {
    // Draw prompt text above buttons
    fill(255);
    textSize(width * 0.08);
    textFont(font3);
    text("Will you come to ", width/2, height/2 - 220);
    textFont(font1);
    text("tüdőszűrés", width/2, height/2 - 140);
    textFont(font3);
    text("with me?", width/2, height/2 - 80);
    textFont('Courier New');
    text("👉👈", width/2, height/2 - 10);
    textSize(width * 0.06);
    textFont(font3);
  }
  
  if (showHeart) {
    yesButton.hide();
    noButton.hide();
    
    if (heartOpacity < 255) {
      heartOpacity += fadeInSpeed;
    }
    
    imageMode(CENTER);
    let heartSize = width * 0.4;
    tint(255, heartOpacity);
    image(heartImg, width/2, height/2, heartSize, heartSize);
    noTint();
    
    push();
    translate(width/2, height/2 + heartSize/2 + 40);
    rotate(textRotation);
    fill(255, 20, 147, heartOpacity);
    text("I love you", 0, 0);
    pop();
    
    textRotation += 0.02;
  }
}

function windowResized() {
  let canvasWidth = min(windowWidth, windowHeight * (9/16));
  let canvasHeight = canvasWidth * (16/9);
  resizeCanvas(canvasWidth, canvasHeight);
  
  // Recalculate button positions on resize
  yesButtonPosX = width/2 - 100;
  noButtonPosX = width/2 + 20;
  buttonPosY = height/2 + 100;
  
  if (!showHeart) {
    yesButton.position(yesButtonPosX, buttonPosY);
    noButton.position(noButtonPosX, buttonPosY);
  }
  
  textSize(width * 0.06);
}

function showHeartImage() {
  showHeart = true;
  heartOpacity = 0;
  textRotation = 0;
}

function moveNoButton() {
  let newX = random(100, width - 100);
  let newY = random(100, height - 100);
  noButton.position(newX, newY);
}