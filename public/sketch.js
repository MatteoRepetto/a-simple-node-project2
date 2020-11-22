let socket = io();
let myColor = 'black';
let buttonPrint;

let myCanvas;
let sweight = 0;
//let playerCanvas;

socket.on("connect", newConnection);
socket.on("mouseBroadcast", drawOtherMouse);
socket.on("color", setColor);
socket.on("newPlayer", newPlayer);

function newPlayer(newPlayerColor) {
  console.log(newPlayerColor)
  //add a rect on the welcome message when a new player joins
  push();
  fill('white');
  noStroke();
  rectMode(CENTER);
  rect(width/2, 10, 600, 50);
  pop();

  textAlign('center');
  textSize(30);
  fill(newPlayerColor);
  text('New player joined ' + newPlayerColor, width/2, 10);
}

/*function setColor(assignedColor) {
  myColor = assignedColor;
  //welcome message
}*/

function newConnection() {
  console.log("your id: " + socket.id);
}
//line moved by another user
function drawOtherMouse(data) {
  push();
  stroke(data.color);
  strokeWeight(data.weight);
  line(data.x, data.y, data.px, data.py);
  pop();
}

function preload(){
  // put preload code here
}

function setup() {
  myCanvas = createCanvas(windowWidth, 700);
  myCanvas.position(0, 90);

  //playerCanvas = createCanvas(800, 50);
  //playerCanvas.position(windowWidth/2, windowHeight/2);

  background('white');

  buttonPrint = createButton('SAVE');
  buttonPrint.position(width/2, 20);
  buttonPrint.mousePressed(printCanvas);
}

function draw() {


}

function mouseMoved() {

  push();
  stroke(myColor);
  strokeWeight(sweight);
  line(mouseX, mouseY, pmouseX, pmouseY);
  pop();
  // create the message
  let message = {
    x: mouseX,
    y: mouseY,
    px: pmouseX,
    py: pmouseY,
    color: myColor,
    weight: sweight,
  };
  //send to the server
  socket.emit("mouse", message);
}


//Buttons that change some line's aspects
function keyPressed() {
  if (key == 'e' ) {
    myColor = "white";
    sweight = 10;
  }
  else if (key == 'k'){
    sweight = 0;
  }
  else if (key == 'b') {
    myColor = "black";
    sweight = 3;
  }
  else if (key == 'z'){
    clear();
    background('white');
  }
  else if (keyCode === UP_ARROW) {
      sweight += 5;
      if (sweight > 25){
        sweight = 3;
      }
    }
  else if (keyCode === DOWN_ARROW) {
      sweight -= 3;
      if (sweight == 0){
        sweight = 3;
      }
    }
  }


function printCanvas(){
  print('Print');
  saveCanvas(myCanvas, 'Draw', '.jpg');
}
