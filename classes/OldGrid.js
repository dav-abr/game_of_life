function OldGrid(cols, rows, rand) {
  this.cols = cols;
  this.rows = rows;

  this.grid = matrix(this.cols, this.rows);
  this.nextGrid = matrix(this.cols, this.rows);

  if (rand) {
    this.randomGrid();
  }
}

OldGrid.prototype.randomGrid = function () {
  for (let i = 0; i < this.cols; i++) {
    for (let j = 0; j < this.rows; j++) {
      this.grid[i][j] = Math.floor(Math.random() * Math.floor(2));
    }
  }
}

OldGrid.prototype.generation = function () {
  this.nextGrid = matrix(cols, rows);

  for (let i = 0; i < this.cols; i++) {
    for (let j = 0; j < this.rows; j++) {
      const state = this.grid[i][j];
      const neighborsSum = this.neighbors(this.grid, i, j);

      if ((state === 0 && rules.b.includes(neighborsSum)) || (state === 1 && rules.s.includes(neighborsSum))) {
        this.nextGrid[i][j] = 1;
      } else {
        this.nextGrid[i][j] = 0;
      }
    }
  }

  this.grid = this.nextGrid;
}

OldGrid.prototype.neighbors = function (grid, x, y) {
  let sum = 0;

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const col = (x + i + this.cols) % this.cols;
      const row = (y + j + this.rows) % this.rows;

      sum += grid[col][row];
    }
  }

  sum -= grid[x][y];
  return sum;
}

OldGrid.prototype.draw = function () {
  background(255);
  for (let i = 0; i < this.cols; i++) {
    for (let j = 0; j < this.rows; j++) {
      if (this.grid[i][j]) {
        const x = i * resolution;
        const y = j * resolution;
        noStroke();
        fill(this.nextGrid[i][j] === 1 ? 0 : 255);
        rect(x, y, resolution, resolution);
      }
    }
  }
}
