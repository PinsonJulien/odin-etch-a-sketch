export default class Element {
  id;
  element;

  constructor(id) {
    this.element = document.getElementById(id);
  }
}