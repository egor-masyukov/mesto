import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImageSrc = this._popup.querySelector('.popup-image__opened-src');
    this._popupDescription = this._popup.querySelector('.popup-image__opened-description');
  }

  open(name, link) {
    this._popupImageSrc.src = link;
    this._popupImageSrc.alt = name;
    this._popupDescription.textContent = name;
    super.open();
  }
}