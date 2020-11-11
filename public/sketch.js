let socket = io();

socket.on("connect", newConnection);
socket.on("mouseBroadcast", drawOtherMouse);

function newConnection() {
  console.log("your id: " + socket.id);
}
//Ellipse moved by another user
function drawOtherMouse(data) {
  fill('yellow');
  ellipse(data.x, data.y, 50);
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
  fill('white');
  ellipse(mouseX, mouseY, 100);
  // create the message
  let message = {
    x: mouseX,
    y: mouseY,
  };
  //send to the server
  socket.emit("mouse", message);
}
