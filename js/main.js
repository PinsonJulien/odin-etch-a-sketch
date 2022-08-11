import Grid from "../js/grid.js";
import { getRandomHexColor } from "../js/utils.js";

const defaultGridSize = 16;
const defaultBrushColor = '#000000';
const defaultBackgroundColor = '#ffffff';

let currentBrushColor = defaultBrushColor;
let currentBackgroundColor = defaultBackgroundColor;

// Setup of all dynamic elements
const grid = new Grid("grid");
grid.setSize(defaultGridSize);
grid.element.style.backgroundColor = defaultBackgroundColor;

grid.setOnSquareClick((e) => colorBrushMode(e));

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

// Clicking on a radio input changes the brush mode
const brushModes = document.getElementsByName("brush-mode");
brushModes.forEach (i => {
    i.addEventListener('change', (e) => {
      const value = e.target.value;

      const fct = (() => {
        switch(value) {
          case 'color':
            return (e) => colorBrushMode(e);
          case 'rainbow':
            return (e) => rainbowBrushMode(e);
          case 'eraser':
            return (e) => eraserBrushMode(e);
          case 'lighten':
            return null;
          case 'darken':
            return null;
        }
      })();

      grid.setOnSquareClick(fct);
    });
  });

function setElementBackgroundColor(e, color) {
  const node = e.currentTarget;
  node.style.backgroundColor = color;
}

function colorBrushMode(e) {
  setElementBackgroundColor(e, currentBrushColor);
}

function rainbowBrushMode(e) {
  setElementBackgroundColor(e, getRandomHexColor());
}

function eraserBrushMode(e) {
  setElementBackgroundColor(e, null);
}