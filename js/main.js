import Grid from "../js/grid.js";

const defaultGridSize = 16;
const defaultBrushColor = '#000000';
const defaultBackgroundColor = '#ffffff';

let currentBrushColor = defaultBrushColor;
let currentBackgroundColor = defaultBackgroundColor;

// Setup of all dynamic elements
const grid = new Grid("grid");
grid.setSize(defaultGridSize);
grid.element.style.backgroundColor = defaultBackgroundColor;

grid.setOnSquareClick((e) => {
  const node = e.currentTarget;
  node.style.backgroundColor = currentBrushColor;
});

const brushColorPicker = document.getElementById("brush-color-picker");
brushColorPicker.value = defaultBrushColor;
brushColorPicker.addEventListener("input", (e) => {
  currentBrushColor = e.target.value;
});

const backgroundColorPicker = document.getElementById("background-color-picker");
backgroundColorPicker.value = defaultBackgroundColor;
backgroundColorPicker.addEventListener("input", (e) => {
  currentBackgroundColor = e.target.value;

  grid.element.style.backgroundColor = currentBackgroundColor;
});