function matrix(cols, rows, defaultValue = () => 0) {
  const arr = new Array(rows);

  for (let i = 0; i < cols; i++) {
    arr[i] = [];
    for (let j = 0; j < rows; j++) {
      arr[i][j] = defaultValue(i, j);
    }
  }

  return arr;
}
