let socket = io();
let myColor = 'black';
let buttonPrint;

let myCanvas;
let linedPaper;
let sweight = 0;

socket.on("mouseBroadcast", drawOtherMouse);
//socket.on("connect", newConnection);
//socket.on("color", setColor);
//socket.on("newPlayer", newPlayer);

/*function newPlayer(newPlayerColor) {
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

}

function setup() {
  myCanvas = createCanvas(windowWidth, 560);
  myCanvas.position(0, 90);

  background('white');

  buttonPrint = createButton('SAVE');
  buttonPrint.position(width/2, 20);
  buttonPrint.mousePressed(printCanvas);
}

function draw() {
push();
  stroke('Gray');
  line(0, 70, width, 70);
  line(0, 140, width, 140);
  line(0, 210, width, 210);
  line(0, 280, width, 280);
  line(0, 350, width, 350);
  line(0, 420, width, 420);
  line(0, 490, width, 490);
  line(0, 560, width, 560);
pop();
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
  else if (key == 'o'){
    sweight = 0;
  }
  else if (key == 'i') {
    myColor = "black";
    sweight = 3;
  }
  else if (key == 'z'){
    clear();
    background('white');
  }
  else if (key == 'r'){
    myColor = "red";
  }
  else if (key == 'b'){
    myColor = "blue";
  }
  else if (keyCode === UP_ARROW) {
      sweight += 10;
      if (sweight > 43){
        sweight = 3;
      }
    }
  else if (keyCode === DOWN_ARROW) {
      sweight -= 10;
      if (sweight < 0){
        sweight = 3;
      }
    }
  }


function printCanvas(){
  print('Print');
  saveCanvas(myCanvas, 'Draw', '.jpg');
}
