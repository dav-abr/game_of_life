const resolution = 5;
const width = 1000;
const height = 1000;
const cols = width / resolution;
const rows = height / resolution;
const fpsElem = document.getElementById('fps');
const fps = 30;
let thickness = 3;
let mousePressed = false;
let canvas;
let debugContainer;
let isZooming = false;


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
};
let grid = new Grid(cols, rows, true);
const debug = new Debugger(grid);
debug.registerDebugFor('draw');
debug.registerDebugFor('generation');

function setup() {
  createCanvas(width, height);
  frameRate(fps);

  canvas = document.getElementById('defaultCanvas0');
  debugContainer = document.getElementById('debug');

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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'z') {
      isZooming = true;
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.key === 'z') {
      isZooming = false;

      for (let i = 0; i < width / 3 / resolution; i++) {
        for (let j = 0; j < height / 3 / resolution; j++) {
          noStroke();
          fill(grid.grid[i][j].state === 1 ? 0 : 255);
          rect(i * resolution, j * resolution, resolution);
        }
      }
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
  console.clear();

  debugContainer.innerHTML = `
  <span>Draw: ${debug.stopDebug('draw')}</span>
  <span>Generation: ${debug.stopDebug('generation')}</span>
`

  // console.log(debug.stopDebug('draw'), debug.stopDebug('generation'))
  if (isZooming) {
    const magnify = 10;
    const temp = magnify * 6;

    let i = Math.floor(mouseX / resolution);
    let j = Math.floor(mouseY / resolution);

    for (let I = i - Math.floor(width / temp / resolution), x = 0; I < width / temp / resolution + i; I++, x++) {
      for (let J = j - Math.floor(height / temp / resolution), y = 0; J < height / temp / resolution + j; J++, y++) {
        if (grid.grid[I][J].state === 1) {
          fill(0);
        } else {
          fill(255);
        }

        rect(x * resolution * magnify, y * resolution * magnify, resolution * magnify);
      }
    }
  }
}

function upListener() {
  mousePressed = false;
}

function downListener(e) {
  mousePressed = true;
  moveListener(e);
}

function moveListener(e) {
  const {offsetX, offsetY} = e;

  if (mousePressed) {
    let i = Math.floor(offsetX / resolution);
    let j = Math.floor(offsetY / resolution);

    for (let I = i; I < thickness + i; I++) {
      for (let J = j; J < thickness + j; J++) {
        grid.grid[I][J].state = 1;
      }
    }
  }
}
