import Card from '../components/Card.js'
import Api from '../components/Api.js'
import PopupDeleteNotice from '../components/PopupDeleteNotice.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import '../pages/index.css';
import { FormValidator, enableValidation } from '../components/FormValidator.js'
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const avatarAddButton = document.querySelector('.profile__avatar-button');

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: '8c002f7d-ecb3-4859-af0b-9d3bd4e0618d',
    'Content-Type': 'application/json',
  }
})

let userId;

Promise.all([api.getUserData(), api.getInitialCards()]).then(([userData, cardData]) => {
  userId = userData._id;
  userInfo.setUserInfo({ userName: userData.name, userText: userData.about });
  initCards.addItems(cardData.reverse());
  userInfo.setUserAvatar(userData.avatar);
}).catch(err => alert(`Произошла ошибка, ${err}`))

// функция создания карточек
const createCard = function (cardData) {
  const card = new Card(cardData, '#template', userId, { cardId: cardData._id, creatorId: cardData.owner._id }, {
    handleCardClick: (name, link) => { popupWithImage.open(name, link) },
    handleCardDelete: (cardElement, cardId) => { popupDeleteNotice.open(cardElement, cardId) },
    handleCardLike: (cardId) => {
      api.setLike(cardId)
        .then((res) => {
          card.renderCardLike(res);
        }).catch(err => alert(`Произошла ошибка, ${err}`))
    },
    handleCardDeleteLike: (cardId) => {
      api.deleteLike(cardId)
        .then((res) => {
          card.renderCardLike(res);
        }).catch(err => alert(`Произошла ошибка, ${err}`))
    },
  });
  const cardElement = card.generateCard();
  return cardElement;
}

// Загружаем начальные карточки с сервера
const initCards = new Section({
  renderer: (cardData) => {
    initCards.addItem(createCard(cardData));
  }
}, '.places__cards')

const popupWithImage = new PopupWithImage('.popup-image')
popupWithImage.setEventListeners();

// добавление карточки
const cardPopupForm = new PopupWithForm({
  handleFormSubmit: (items) => {
    console.log(items);
    cardPopupForm.saveProgressText(); api.addCard(items.cardName, items.cardUrl)
      .then((card) => {
        initCards.addItem(createCard(card));
        cardPopupForm.close();
      }).catch(err => alert(`Произошла ошибка, ${err}`))
      .finally(() => {
        cardPopupForm.saveText();
      })
  }
}, '.popup-cards')

cardPopupForm.setEventListeners();

cardAddButton.addEventListener('click', function openEditPopup() {
  validationAddCard.resetValidation();
  cardPopupForm.open();
})

//popup удаления карточки
const popupDeleteNotice = new PopupDeleteNotice({
  handleFormSubmit: (cardElement, cardId) => {
    api.deleteCard(cardId)
      .then(() => {
        cardElement.deleteCard();
        popupDeleteNotice.close();
      }).catch(err => alert(`Произошла ошибка, ${err}`))
  }
}, '.popup-warning');
popupDeleteNotice.setEventListeners();

//редактирование профиля
const userInfo = new UserInfo({ profileName: '.profile__title', profileSubtitle: '.profile__subtitle', profileAvatar: '.profile__avatar-src' });

//открытие и редактирование аватара
avatarAddButton.addEventListener('click', function openEditPopup() {
  validationAvatar.resetValidation();
  avatarPopupForm.open()
})

const avatarPopupForm = new PopupWithForm({
  handleFormSubmit: (userData) => {
    console.log(userData);
    avatarPopupForm.saveProgressText(); api.editAvatar(userData)
      .then((res) => {
        userInfo.setUserAvatar(res.avatar);
        avatarPopupForm.close();
      }).catch(err => alert(`Произошла ошибка, ${err}`))
      .finally(() => {
        avatarPopupForm.saveText();
      })
  }
}, '.popup-avatar')

avatarPopupForm.setEventListeners()

//открытие и редактирование имени
profileEditButton.addEventListener('click', () => {
  const profileInfo = userInfo.getUserInfo();
  userPopupForm.setInputValues({
    userName: profileInfo.userName,
    userText: profileInfo.userText
  });
  validationProfile.resetValidation();
  userPopupForm.open()
})

const userPopupForm = new PopupWithForm({
  handleFormSubmit: (userData) => {
    userPopupForm.saveProgressText(); api.editUserData(userData)
      .then((res) => {
        userInfo.setUserInfo({ userName: res.name, userText: res.about });
        userPopupForm.close();
      }).catch(err => alert(`Произошла ошибка, ${err}`))
      .finally(() => {
        userPopupForm.saveText();
      })
  }
}, '.popup-user')

userPopupForm.setEventListeners()

// экземпляры класса валидации
const validationAddCard = new FormValidator(enableValidation, cardPopupForm.getForm());
validationAddCard.enableValidation();

const validationProfile = new FormValidator(enableValidation, userPopupForm.getForm());
validationProfile.enableValidation();

const validationAvatar = new FormValidator(enableValidation, avatarPopupForm.getForm());
validationAvatar.enableValidation();