export default class Card {
    constructor(cardData, cardSelector, userId, creatorData, handleActions) {
        this._card = cardData;
        this._name = this._card.name;
        this._link = this._card.link;
        this._cardSelector = cardSelector;
        this._userId = userId;
        this._cardId = creatorData.cardId;
        this._creatorId = creatorData.creatorId;
        this._handleCardClick = handleActions.handleCardClick;
        this._deleteCard = handleActions.handleCardDelete;
        this._addLike = handleActions.handleCardLike;
        this._removeLike = handleActions.handleCardDeleteLike;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.place').cloneNode(true);
        return cardElement;
    }

    deleteCard() {
        this._element.remove();
    }

    _likedCard() {
        return this._likes.find((userLike) => userLike._id === this._userId);
    }

    _isLikedCard() {
        if (this._likedCard()) {
            this._removeLike(this._cardId);
        } else {
            this._addLike(this._cardId);
        }
    }

    renderCardLike(card) {
        this._likes = card.likes;
        if (this._likes.length === 0) {
            this.likeSelector.textContent = '';
        } else {
            this.likeSelector.textContent = this._likes.length;
        }
        if (this._likedCard()) {
            this._likeButton.classList.add('place__like-button_active');
        } else {
            this._likeButton.classList.remove('place__like-button_active');
        }
    }

    _setEventListener = () => {
        this._likeButton.addEventListener('click', () => this._isLikedCard())
        this._cardImageElement.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        });
        if (this._userId === this._creatorId) {
            this._deleteButton.addEventListener('click', () => { this._deleteCard(this, this._cardId); });
        } else {
            this._deleteButton.remove();
        }
    }

    generateCard() {
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.place__like-button');
        this._deleteButton = this._element.querySelector('.place__button-delete');
        this._cardImageElement = this._element.querySelector('.place__image');
        this.likeSelector = this._element.querySelector('.place__like-sum');
        this._element.querySelector('.place__title').textContent = this._name;
        this._cardImageElement.src = this._link;
        this._cardImageElement.alt = this._name;
        this.renderCardLike(this._card);
        this._setEventListener();
        return this._element;
    }
};