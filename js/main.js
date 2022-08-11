import Grid from "../js/grid.js";

const defaultGridSize = 16;

// Setup of all dynamic elements
const grid = new Grid("grid");
grid.setSize(defaultGridSize);

grid.setOnSquareClick((e) => {
  const node = e.currentTarget;
  node.style.backgroundColor = 'blue';
});