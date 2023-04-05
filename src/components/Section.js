export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._section = document.querySelector(selector);
  }

  addItem(element) {
    this._section.prepend(element);
  }

  addItems(res) {
    res.forEach(this._renderer);
  }
}