let waves = [];
let nwaves = 10;

let facts;
let f;
let fNew;

let soundscape;

function preload() {
  facts = loadStrings('assets/facts.txt');
  // soundscape = loadSound('assets/temp.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textFont('Georgia');
  formatFact();

  //soundscape.play();

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

  push();
  noFill();
  stroke("#f1d7b9");
  strokeWeight(200);
  circle(windowWidth/2,windowHeight/2,800);
  pop();
  
  textAlign(CENTER);
  fill(255);
  noStroke();
  textSize(32);
  text('Grounding',windowWidth/2, windowHeight/2 - 70);
  textSize(12);
  text('gain perspective with these facts.',windowWidth/2, windowHeight/2 - 55);

  // textAlign(LEFT);
  fill(20);
  textSize(20);
  text(fNew,windowWidth/2, windowHeight/4);

  
  
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
}