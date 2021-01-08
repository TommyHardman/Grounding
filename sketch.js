// ToDo
// - create fact list - more interesting - more life related
// - add soundscape

let nwaves = 10;
let waves = [];

let facts; // read from text file
let f; // random line
let fNew; // formated (newline)

let soundscape;
let button; // generates new fact

function preload() {
  facts = loadStrings('assets/facts.txt');
  // soundscape = loadSound('assets/temp.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  noStroke();
  textFont('Georgia');
  makeButton("Grounding");

  //soundscape.play();

  formatFact();

  for (let i = 0; i < nwaves + 1; i++) {
    let opacity_val = map(i, 0, nwaves+1, 255, 0);
    let offset_val = map(i, 0, nwaves+1, 10, 20*(i/2.0));
    let xinc_val = map(i, 0, nwaves+1, 0.01, 0.1);
    let yinc_val = map(i, 0, nwaves+1, 0.05, 0.001);
    waves.push(new Wave(opacity_val, offset_val, xinc_val, yinc_val));
  }
}


function draw() {
  background("#f1d7b9");

  // stroke(50);
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
  
  textAlign(CENTER);
  fill(255);
  noStroke();
  textSize(14);
  text('gain perspective with these words.',windowWidth/2, windowHeight/2 - 35);

  // display fact
  fill(20);
  textSize(20);
  textStyle(ITALIC);
  text(fNew,windowWidth/2, windowHeight/4);
  
}

// button functions
function makeButton(txt) {
  button = createButton(txt);
  button.style("font-family", "Georgia");
  button.style("color", "#fff");
  button.style("font-size","32pt");
  button.style("background-color", "#f1d7b9");
  button.style("border-style", "none");
  button.style("outline","none");
  
  button.center();
  
  button.mousePressed(formatFact);
  button.mouseOver(hoverBold);
  button.mouseOut(hoverNormal);
}

function hoverBold() {
  button.style("color", "rgb(200,100,100)");
  button.style("font-weight","bold");
  button.style("cursor", "pointer");
  button.center();
}
function hoverNormal() {
  button.style("color", "#fff");
  button.style("font-weight","normal");
  button.center();
}


function formatFact() {
  f = random(facts);
  
  fNew = '';
  let c = 0;
  for (let i = 0; i < f.length; i++) {
    fNew += f[i]; 
    if ((c >= 40 ) & (f[i] == ' ')) {
      fNew += '\n';
      c = 0;
    }
    c++;
  }
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
    let waveWidth = 400;
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
  button.center();
}