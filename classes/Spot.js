class Spot {
  constructor(x, y, state) {
    this.newState = 0;
    this.oldState = state;
    this.x = x;
    this.y = y;
    this.neighbors = [];
    this.shouldUpdate = true;
  }

  set state(value) {
    this.newState = value;
  }

  get state() {
    return this.oldState;
  }

  castStates() {
    this.oldState = this.newState;
  }

  getNeighbors(grid) {
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        const col = (this.x + i + grid.length) % grid.length;
        const row = (this.y + j + grid[0].length) % grid[0].length;

        if (!(col === this.x && row === this.y))
          this.neighbors.push(grid[col][row]);
      }
    }
  }

  neighborsSum() {
    return this.neighbors.reduce((a, n) => a + n.oldState, 0);
  }
}
