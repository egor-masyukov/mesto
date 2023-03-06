import openPopup from './index.js'

export default class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.place').cloneNode(true);

        return cardElement;
    }

    _setEventListener() {
        const likeButton = this._element.querySelector('.place__like-button')
        likeButton.addEventListener('click', () => {
            this._likeButton(likeButton)
        })

        const deletBtn = this._element.querySelector('.place__button-delete');

        deletBtn.addEventListener('click', () => {
            this._deleteCard()
        });

        const image = this._element.querySelector('.place__image');

        image.addEventListener('click', () => {
            this._openImage()
        })
    }

    _likeButton(likeButton) {
        likeButton.classList.toggle('place__like-button_active');
    }

    _deleteCard() {
        this._element.remove();
    }

    _openImage() {
        const image = document.querySelector('.popup-image__opened-src')
        const description = document.querySelector('.popup-image__opened-description');
        const popupTypePhoto = document.querySelector('.popup-image');

        openPopup(popupTypePhoto);

        image.src = this._link;
        image.alt = this._name;
        description.textContent = this._name;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListener();
        this._element.querySelector('.place__image').src = this._link;
        this._element.querySelector('.place__title').textContent = this._name;
        return this._element;
    }
};