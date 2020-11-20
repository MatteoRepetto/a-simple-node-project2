let socket = io();
let myColor = 'white';
let buttonPrint;
let myCanvas;

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
  rect(width/2, 40, 600, 50);
  pop();

  textAlign('center');
  textSize(30);
  fill(newPlayerColor);
  text('New player joined ' + newPlayerColor, width/2, 40);
}

function setColor(assignedColor) {
  myColor = assignedColor;
  //welcome message
}

function newConnection() {
  console.log("your id: " + socket.id);
}
//Ellipse moved by another user
function drawOtherMouse(data) {
  push();
  stroke(data.color);
  line(data.x, data.y, data.px, data.py);
  pop();
}

function preload(){
  // put preload code here
}

function setup() {
  myCanvas = createCanvas(windowWidth, 700);
  myCanvas.position(0, 90);

  background('white');

  buttonPrint = createButton('SAVE');
  buttonPrint.position(width/2, height/2);
  buttonPrint.mousePressed(printCanvas);
}

function draw() {

}

function mouseMoved() {

  push();
  stroke(myColor);
  line(mouseX, mouseY, pmouseX, pmouseY);
  pop();
  // create the message
  let message = {
    x: mouseX,
    y: mouseY,
    px: pmouseX,
    py: pmouseY,
    color: myColor,
  };
  //send to the server
  socket.emit("mouse", message);
}

function printCanvas(){
  print('Print');
  saveCanvas(myCanvas, 'Draw', '.jpg');
}
