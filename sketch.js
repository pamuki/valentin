let heartImg;
let yesButton;
let noButton;
let showHeart = false;
let heartOpacity = 0; // For fade-in effect
let textRotation = 0; // For rotating text
let fadeInSpeed = 3; // Controls how fast the heart fades in

function preload() {
  heartImg = loadImage('heart.png');
}

function setup() {
  let canvasWidth = min(windowWidth, windowHeight * (9/16));
  let canvasHeight = canvasWidth * (16/9);
  
  createCanvas(canvasWidth, canvasHeight);
  background('#ff93d2');
  
  yesButton = createButton('Yes');
  yesButton.class('game-button');
  yesButton.position(windowWidth/2 - 60, windowHeight/2);
  yesButton.mousePressed(showHeartImage);
  
  noButton = createButton('No');
  noButton.class('game-button');
  noButton.position(windowWidth/2 + 20, windowHeight/2);
  noButton.mousePressed(moveNoButton);
  
  // Set text properties
  textAlign(CENTER, CENTER);
  textSize(width * 0.06); // Responsive text size
}

function draw() {
  background('#ff93d2');
  
  if (showHeart) {
    // Hide buttons when heart is shown
    yesButton.hide();
    noButton.hide();
    
    // Fade in the heart
    if (heartOpacity < 255) {
      heartOpacity += fadeInSpeed;
    }
    
    // Draw heart with current opacity
    imageMode(CENTER);
    let heartSize = width * 0.4;
    tint(255, heartOpacity); // Apply opacity to the image
    image(heartImg, width/2, height/2, heartSize, heartSize);
    noTint(); // Reset tint for other elements
    
    // Rotate and draw text under the heart
    push(); // Save current transformation state
    translate(width/2, height/2 + heartSize/2 + 40); // Position below heart
    rotate(textRotation);
    fill(255, 20, 147, heartOpacity); // Pink color with same opacity as heart
    text("I love you", 0, 0);
    pop(); // Restore transformation state
    
    // Update text rotation
    textRotation += 0.02; // Speed of rotation
  }
}

function windowResized() {
  let canvasWidth = min(windowWidth, windowHeight * (9/16));
  let canvasHeight = canvasWidth * (16/9);
  resizeCanvas(canvasWidth, canvasHeight);
  
  // Update text size on resize
  textSize(width * 0.06);
  
  // Update button positions if they're still visible
  if (!showHeart) {
    yesButton.position(canvasWidth/2 - 60, canvasHeight/2);
    noButton.position(canvasWidth/2 + 20, canvasHeight/2);
  }
}

function showHeartImage() {
  showHeart = true;
  heartOpacity = 0; // Reset opacity for fade-in effect
  textRotation = 0; // Reset text rotation
}

function moveNoButton() {
  let newX = random(100, width - 100);
  let newY = random(100, height - 100);
  noButton.position(newX, newY);
}