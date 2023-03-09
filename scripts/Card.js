export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.place').cloneNode(true);
        return cardElement;
    }

    _setEventListener() {
        this._likeButton = this._element.querySelector('.place__like-button')
        this._likeButton.addEventListener('click', () => {
            this._likeCard()
        });

        this._deleteButton = this._element.querySelector('.place__button-delete');
        this._deleteButton.addEventListener('click', () => {
            this._deleteCard();
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    _likeCard() {
        this._likeButton.classList.toggle('place__like-button_active');
    }

    _deleteCard() {
        this._element.remove();
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.place__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.place__title').textContent = this._name;
        this._setEventListener();
        return this._element;
    }
};