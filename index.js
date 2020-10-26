const resolution = 5;
const width = 2000;
const height = 2000;
const cols = width / resolution;
const rows = height / resolution;
let thickness = 3;
const rand = true;

let mousePressed = false;

const rules = {
  // b: [5, 6, 7, 8],
  // s: [4, 5, 6, 7, 8],
  // ------------------
  // b: [3],
  // s: [2, 3],
  // ------------------
  // b: [1],
  // s: [1, 2, 3, 4, 5, 6 ,7, 8]
  // ------------------
  // b: [1, 2, 3, 4, 5, 6, 7, 8],
  // s: [1, 2, 3, 4, 5, 6, 7]
  // ------------------
  b: [3, 4, 5],
  s: [4, 5, 6, 7]
  // ------------------
  // b: [3, 5, 6, 7],
  // s: [5, 6, 7]
}


let grid = matrix(cols, rows);
let next = matrix(cols, rows)

function matrix(cols, rows) {
  const arr = new Array(rows);

  for (let i = 0; i < cols; i++) {
    arr[i] = new Array(cols)
  }

  return arr;
}

function generation() {
  grid = next;
  next = matrix(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const state = grid[i][j];
      const neighborsSum = neighbors(grid, i, j);

      if ((state === 0 && rules.b.includes(neighborsSum)) || (state === 1 && rules.s.includes(neighborsSum))) {
        next[i][j] = 1;
      } else {
        next[i][j] = 0;
      }
    }
  }
}

function neighbors(grid, x, y) {
  let sum = 0;

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const col = (x + i + cols) % cols;
      const row = (y + j + rows) % rows;

      sum += grid[col][row];
    }
  }

  sum -= grid[x][y];
  return sum;
}

function setup() {
  createCanvas(width, height);

  if (rand) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        next[i][j] = floor(random(2));
      }
    }
  }

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
  // background(255);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (next[i][j] !== grid[i][j]) {
        const x = i * resolution;
        const y = j * resolution;
        noStroke();
        fill(next[i][j] === 1 ? 0 : 255);
        rect(x, y, resolution, resolution);
      }
    }
  }

  generation();
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
        next[I][J] = 1;
      }
    }

  }
}
