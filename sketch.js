let heartImg;
let yesButton;
let noButton;
let showHeart = false;

function preload() {
  heartImg = loadImage('heart.png');
}

function setup() {
  // Create canvas that maintains 9:16 ratio based on window width
  let canvasWidth = min(windowWidth, windowHeight * (9/16));
  let canvasHeight = canvasWidth * (16/9);
  
  createCanvas(canvasWidth, canvasHeight);
  
  // Scale button positions based on canvas size
  yesButton = createButton('Yes');
  yesButton.class('game-button'); // Add class for styling
  yesButton.position(canvasWidth/2 - 60, canvasHeight/2);
  yesButton.mousePressed(showHeartImage);
  
  noButton = createButton('No');
  noButton.class('game-button'); // Add class for styling
  noButton.position(canvasWidth/2 + 20, canvasHeight/2);
  noButton.mousePressed(moveNoButton);
}

function draw() {
  background(220);
  
  if (showHeart) {
    imageMode(CENTER);
    // Scale heart size based on canvas width
    let heartSize = width * 0.3;
    image(heartImg, width/2, height/2, heartSize, heartSize);
  }
}

function windowResized() {
  // Recalculate canvas size when window is resized
  let canvasWidth = min(windowWidth, windowHeight * (9/16));
  let canvasHeight = canvasWidth * (16/9);
  resizeCanvas(canvasWidth, canvasHeight);
  
  // Update button positions
  if (!showHeart) {
    yesButton.position(canvasWidth/2 - 60, canvasHeight/2);
    noButton.position(canvasWidth/2 + 20, canvasHeight/2);
  }
}

function showHeartImage() {
  showHeart = true;
}

function moveNoButton() {
  // Keep button within canvas bounds instead of window bounds
  let newX = random(100, width - 100);
  let newY = random(100, height - 100);
  noButton.position(newX, newY);
}