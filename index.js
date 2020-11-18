const resolution = 5;
const width = 1000;
const height = 1000;
const cols = width / resolution;
const rows = height / resolution;
let thickness = 3;
const fps = 30;
let mousePressed = false;
const fpsElem = document.getElementById('fps');


const rules = {
  // b: [5, 6, 7, 8],
  // s: [4, 5, 6, 7, 8],
  // ------------------
  b: [3],
  s: [2, 3],
  // ------------------
  // b: [1],
  // s: [1, 2, 3, 4, 5, 6 ,7, 8]
  // ------------------
  // b: [1, 2, 3, 4, 5, 6, 7, 8],
  // s: [1, 2, 3, 4, 5, 6, 7]
  // ------------------
  // b: [3, 4, 5],
  // s: [4, 5, 6, 7]
  // ------------------
  // b: [3, 5, 6, 7],
  // s: [5, 6, 7]
}
let grid = new Grid(cols, rows, true);
const debug = new Debugger(grid);
debug.registerDebugFor('draw');
debug.registerDebugFor('generation');

function setup() {
  createCanvas(width, height);
  frameRate(fps);

  const canvas = document.getElementById('defaultCanvas0');
  canvas.style.border = '1px solid #000';

  canvas.addEventListener('mouseup', upListener);
  canvas.addEventListener('mousedown', downListener);
  canvas.addEventListener('mousemove', moveListener);
  canvas.addEventListener('wheel', e => {
    if (e.deltaY < 0) {
      thickness++;
    } else {
      thickness--;
    }
  });
}

function draw() {
  debug.startDebug('draw');
  debug.startDebug('generation');
  const t1 = new Date().getTime();
  grid.draw();
  grid.generation();
  const t2 = new Date().getTime();
  fpsElem.innerText = 1000 / (t2 - t1);
  console.log(debug.stopDebug('draw'), debug.stopDebug('generation'))
}

function upListener() {
  mousePressed = false;
}

function downListener(e) {
  mousePressed = true;
  moveListener(e);
}

function moveListener(e) {
  if (mousePressed) {
    const {offsetX, offsetY} = e;
    let i = Math.floor(offsetX / resolution);
    let j = Math.floor(offsetY / resolution);

    for (let I = i; I < thickness + i; I++) {
      for (let J = j; J < thickness + j; J++) {
        grid.grid[I][J].state = 1;
      }
    }

  }
}
