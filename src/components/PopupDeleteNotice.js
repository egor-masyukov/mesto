import Popup from "./Popup.js";

export default class PopupDeleteNotice extends Popup {
  constructor({ handleFormSubmit }, selector) {
    super(selector);

    this._submitButton = this._popup.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
  }

  open(cardData, cardId) {
    this._cardData = cardData;
    this._cardId = cardId;
    super.open();
  }

  setEventListeners() {
    this._submitButton.addEventListener('submit', (evt) => {
      evt.preventDefault(); this._handleFormSubmit(this._cardData, this._cardId)
    })
    super.setEventListeners();
  }
}