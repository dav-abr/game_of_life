class Grid {
  constructor(cols, rows, rand) {
    this.cols = cols;
    this.rows = rows;

    this.grid = matrix(this.cols, this.rows, (i, j) => new Spot(i, j, 0));

    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j].getNeighbors(this.grid);
      }
    }

    if (rand) {
      this.randomGrid();
    }
  }

  randomGrid() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j].state = Math.floor(Math.random() * Math.floor(2));
      }
    }
  }

  generation() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        const spot = this.grid[i][j];
        const neighborsSum = spot.neighborsSum();

        if ((spot.state === 0 && rules.b.includes(neighborsSum)) || (spot.state === 1 && rules.s.includes(neighborsSum))) {
          spot.state = 1;
        } else {
          spot.state = 0;
        }
      }
    }
  }

  draw() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        const spot = this.grid[i][j];
        if (spot.oldState !== spot.newState) {
          const x = i * resolution;
          const y = j * resolution;
          noStroke();
          textSize(resolution / 2);
          fill(spot.newState === 1 ? 0 : 255);
          rect(x, y, resolution, resolution);
        }

        spot.castStates();
      }
    }
  }
}
