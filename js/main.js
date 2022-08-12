import Grid from "../js/grid.js";
import { adjustColorLighting, getRandomHexColor } from "../js/utils.js";

const defaultGridSize = 64/2;
const defaultBrushColor = '#000000';
const defaultBackgroundColor = '#ffffff';

let currentBrushColor = defaultBrushColor;
let currentBackgroundColor = defaultBackgroundColor;

// Setup of all dynamic elements
// Grid of squares
const grid = new Grid("grid");
grid.setSize(defaultGridSize);
grid.element.style.backgroundColor = defaultBackgroundColor;
grid.setOnSquareClick((e) => colorBrushMode(e));

// Grid size range input
const gridSizeInput = document.getElementById("grid-size");
gridSizeInput.setAttribute('value', defaultGridSize);

const gridSizeLabel = document.getElementById("grid-size-label");
const changeGridSizeLabelText = (value) => {
  return gridSizeLabel.textContent = `${value} x ${value}`;
}
gridSizeInput.addEventListener('input', (e) => {
  const value = e.target.value;
  grid.setSize(value);
  changeGridSizeLabelText(value);
});

changeGridSizeLabelText(defaultGridSize);

// Brush color picker
const brushColorPicker = document.getElementById("brush-color-picker");
brushColorPicker.value = defaultBrushColor;
brushColorPicker.addEventListener("input", (e) => {
  currentBrushColor = e.target.value;
});

// Background color picker
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
            return (e) => lightingBrushMode(e, 30);
          case 'darken':
            return (e) => lightingBrushMode(e, -30);
          default: 
            return () => null;
        }
      })();

      grid.setOnSquareClick(fct);
    });
  });

function setElementBackgroundColor(e, color) {
  const node = e.currentTarget;
  node.setAttribute('background-color', color || '');
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

function lightingBrushMode(e, nb) {
  const node = e.currentTarget;
  const color = node.getAttribute('background-color') || currentBackgroundColor;
  setElementBackgroundColor(e, adjustColorLighting(color, nb));
}