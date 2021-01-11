// ToDo
// - add to data list


let nwaves = 10;
let waves = [];

let data; // read from text file
let rline; // random line
let rArray = []; // shuffed line array
let rIndex = 0; // current cycle index

let button; // generates new fact (Grounding)

let timer = 0;
let interval = 10000; // 10s

let fontSize;
let mobileFontSize = 14;
let normalFontSize = 20;

let mobileWindowWidth = 600;

let div; // updated phrase entry

function preload() {
  data = loadStrings('assets/data.txt');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < data.length; i++) {
    rArray.push(i);
  }
  shuffle(rArray, true);
  console.log(rArray);

  div = createP('');
  div.id('textDiv');
 
  if (isMobile()) {
    fontSize = mobileFontSize;
  } else {
    fontSize = normalFontSize;
  }

  noStroke();
  textFont('Georgia');

  setupButton("Grounding");
  setupWaves();
  updateText();

  timer = setInterval(updateText, interval);
}


function draw() {
  background("#f1d7b9");

  // stroke(50);
  displayWaves();
  displayText();  
}

// button functions
function setupButton(txt) {
  button = createButton(txt);
  button.style("font-family", "Georgia");
  button.style("color", "#fff");
  button.style("font-size","32pt");
  button.style("background-color", "#f1d7b9");
  button.style("border-style", "none");
  button.style("outline","none");
  
  buttonPosition();
  
  button.mousePressed(mouseClick);
  button.mouseOver(hoverBold);
  button.mouseOut(hoverNormal);
}

function buttonPosition() {
  if (isMobile()) {
    button.center('horizontal');
    button.position(button.position.x, windowHeight * 0.05);
    console.log(button.width);
  } else {
    button.center();
  }
}

function mouseClick() {
  clearInterval(timer);
  timer = setInterval(updateText, interval);
  updateText();
}

function hoverBold() {
  button.style("color", "rgb(200,100,100)");
  button.style("font-weight","bold");
  button.style("cursor", "pointer");
  buttonPosition();
}
function hoverNormal() {
  button.style("color", "#fff");
  button.style("font-weight","normal");
  buttonPosition();
}

// randomise & format line
function updateText() {
  rline = data[rArray[rIndex]];
  rIndex++;
  if (rIndex >= rArray.length) {
    rIndex = 0;
  }
}


function displayText() {
  textAlign(CENTER);
  fill(255);
  noStroke();
  if (isMobile()) {
    textSize(mobileFontSize - 2);
    text('gain perspective with these words.',windowWidth/2, windowHeight * 0.04);
  } else {
    textSize(mobileFontSize);
    text('gain perspective with these words.',windowWidth/2, windowHeight/2 - 35);
  }
  // display phrase
  fill(20);
  div.html(rline);
  div.style("font-size", fontSize + "px");
}


function setupWaves() {
  for (let i = 0; i < nwaves + 1; i++) {
    let opacity_val = map(i, 0, nwaves+1, 255, 0);
    let offset_val = map(i, 0, nwaves+1, 10, 20*(i/2.0));
    let xinc_val = map(i, 0, nwaves+1, 0.01, 0.1);
    let yinc_val = map(i, 0, nwaves+1, 0.05, 0.001);
    waves.push(new Wave(opacity_val, offset_val, xinc_val, yinc_val));
  }
}

function displayWaves() {
  for (let i = 0; i < waves.length; i++) {
    waves[i].display();
  }
  // masking circle
  push();
  noFill();
  stroke("#f1d7b9");
  strokeWeight(200);
  circle(windowWidth/2,windowHeight/2,800);
  pop();
}

function isMobile() {
  if (windowWidth < mobileWindowWidth) {
    return true;
  }
  return false;
}


class Wave {
  constructor(opacity, offset, xinc, yinc) {
    this.opacity = opacity;
    this.offset = offset;
    this.yoff = 0.0;
    this.xinc = xinc;
    this.yinc = yinc;
  }

  display() {
    fill(41, 60, 74,this.opacity);
    beginShape();
    let xoff = 0;
    let waveWidth;
    if (isMobile()) {
      waveWidth = 200;
    } else {
      waveWidth = 400;
    }
    let waveHeight = 300;
    for (let x = width/2 - waveWidth; x <= width/2 + waveWidth; x += 10) {
      let y = map(noise(xoff, this.yoff), 0, 1, 100, 200);
      vertex(x,height/2 + waveHeight - y - this.offset);
      xoff += this.xinc;
    }
    this.yoff += this.yinc;
    vertex(width/2 + waveWidth, height/2 + waveHeight);
    vertex(width/2 - waveWidth, height/2 + waveHeight);
    endShape(CLOSE);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  buttonPosition();

  if (isMobile()) {
    fontSize = mobileFontSize;
  } else {
    fontSize = normalFontSize;
  }

  print(windowWidth);
}