export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = document.querySelector(selector);
  }

  addItem(element) {
    this._selector.prepend(element);
  }

  addItems() {

    this._items.forEach(item => {
      this.addItem(this._renderer(item))
    });
  }
}