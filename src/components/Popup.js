export default class Popup {

    constructor(selector) {
      this._selector = selector;
    }
  
    _handleEscClose(event) {
      if (event.key === 'Escape') {
        this.close();
      }
    }
  
    open() {
      this._selector.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);
    }
  
    close() {
      this._selector.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
    }
  
    setEventListeners() {
      const buttonClose = this._selector.querySelector(".popup__button-close")
        .addEventListener('click', () => {
          this.close();
        })
  
      this._selector.addEventListener('mousedown', (event) => {
        if (event.target == this._selector) {
          this.close();
        }
      })
  
      document.addEventListener('keydown', (event) => {
        this._handleEscClose(event);
      })
    }
  }