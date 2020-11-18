let socket = io();
let myColor = 'white';

socket.on("connect", newConnection);
socket.on("mouseBroadcast", drawOtherMouse);
socket.on("color", setColor);
socket.on("newPlayer", newPlayer);

function newPlayer(newPlayerColor) {
  console.log(newPlayerColor)
  //add a rect on the welcome message when a new player joins
  push();
  fill('purple');
  noStroke();
  rectMode(CENTER);
  rect(width/2, height/2, 300, 50);
  pop();

  textAlign('center');
  textSize(30);
  fill(newPlayerColor);
  text('New player joined ' + newPlayerColor, width/2, height/2);
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
  fill(data.color);
  noStroke();
  ellipse(data.x, data.y, 50);
  pop();
}

function preload(){
  // put preload code here
}

function setup() {
  createCanvas(windowWidth,windowHeight)

  background('purple');
}

function draw() {

}

function mouseMoved() {
  push();
  fill(myColor);
  ellipse(mouseX, mouseY, 50);
  pop();
  // create the message
  let message = {
    x: mouseX,
    y: mouseY,
    color: myColor,
  };
  //send to the server
  socket.emit("mouse", message);
}
