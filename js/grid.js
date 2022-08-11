import Element from "../js/element.js";

export default class Grid extends Element {
  squares = [];
  onSquareClick = () => null;
  drawMode = false;

  constructor(id) {
    super(id);

    // Allows to draw by holding the click.
    this.element.addEventListener("mousedown", () => this.drawMode = true);
    this.element.addEventListener("mouseup", () => this.drawMode = false);
  }

  setSize (size) {
    if (size <= 0) return;

    const nbSquares = size * size;
    // Resize the css grid
    this.element.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    this.squares = [];

    for (let i = 0; i < nbSquares; ++i) {
      const square = document.createElement("div");
      square.classList.add("square");
      
      // When the user clicks and move over squares, they change color.
      square.addEventListener("mouseover", (e) => {
        if (!this.drawMode) return;
        this.onSquareClick(e)
      });

      square.addEventListener("mousedown", (e) => {
        // Only allow left click.
        if(e.button !== 0) return;
        this.onSquareClick(e)
      });

      if (i%2 === 0) {
        square.style.backgroundColor = 'red';
      }

      this.squares.push(square);
    }

    this.element.replaceChildren(...this.squares);
  }

  setOnSquareClick(fct) {
    this.onSquareClick =  fct;
  }
}