export default class Popup {

  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    const buttonClose = this._popup.querySelector(".popup__button-close")
      .addEventListener('click', () => {
        this.close();
      })

    this._popup.addEventListener('mousedown', (event) => {
      if (event.target == this._popup) {
        this.close();
      }
    })
  }
}