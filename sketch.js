let heartImg;
let yesButton;
let noButton;
let showHeart = false;
let heartOpacity = 0;
let textRotation = 0;
let fadeInSpeed = 3;
let firstClickDone = false; // Add flag for first click

let font1;
let font2;
let font3;

// Array to store random hearts
let randomHearts = [];

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

  yesButtonPosX = windowWidth/2 - 100;
  noButtonPosX = windowWidth/2 + 20;
  buttonPosY = windowHeight/2 + 100;
  
  yesButton = createButton('Yes');
  yesButton.class('game-button');
  yesButton.position(yesButtonPosX, buttonPosY);
  yesButton.mousePressed(showHeartImage);
  
  noButton = createButton('No');
  noButton.class('game-button');
  noButton.position(noButtonPosX, buttonPosY);
  noButton.mousePressed(moveNoButton);
  
  textAlign(CENTER, CENTER);
  textSize(width * 0.06);
}

function draw() {
  background('#ff93d2');
  
  // Draw random hearts first (behind main heart)
  for (let heart of randomHearts) {
    push();
    translate(heart.x, heart.y);
    rotate(heart.rotation);
    // Use a system font that supports emojis (like sans-serif)
    textFont("sans-serif");
    textSize(heart.size);
    // Draw the heart emoji centered at (0,0)
    text("❤️", 0, 0);
    pop();
  }
  
  
  if (!showHeart) {
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
    image(heartImg, width/2, height/2 - 100, heartSize * 1.0769, heartSize);
    noTint();
    
    push();
    textSize(width * 0.09);
    translate(width/2, height/2 + heartSize/2 + 40);
    rotate(textRotation);
    fill(255, 20, 147, heartOpacity);
    text("I love you", 0, 0);
    pop();
    
    textRotation += 0.02;
  }
}

function mousePressed() {
  if (showHeart) {
    if (!firstClickDone) {
      // First click after showing heart
      firstClickDone = true;
    } else {
      // Second click and beyond
      let newHeart = {
        x: random(width * 0.1, width * 0.9),
        y: random(height * 0.1, height * 0.9),
        size: random(width * 0.1, width * 0.2),
        rotation: random(TWO_PI),
        opacity: 255
      };
      randomHearts.push(newHeart);
    }
  }
}

function windowResized() {
  let canvasWidth = min(windowWidth, windowHeight * (9/16));
  let canvasHeight = canvasWidth * (16/9);
  resizeCanvas(canvasWidth, canvasHeight);
  
  yesButtonPosX = windowWidth/2 - 100;
  noButtonPosX = windowWidth/2 + 20;
  buttonPosY = windowHeight/2 + 100;
  
  if (!showHeart) {
    yesButton.position(yesButtonPosX, buttonPosY);
    noButton.position(noButtonPosX, buttonPosY);
  }
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