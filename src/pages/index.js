import Card from '../components/Card.js'
import Popup from '../components/Popup.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import initialCards from '../utils/initialCards.js'
import '../pages/index.css';
import { FormValidator, enableValidation } from '../components/FormValidator.js'

const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

const popupWithImage = new PopupWithImage('.popup-image')
popupWithImage.setEventListeners();

const initCards = new Section({
  items: initialCards,
  renderer: (items) => {
    const createdCard = createCard(items)
    return createdCard
  }
}, '.places__cards')

initCards.addItems();

function createCard(cardData) {
  const card = new Card(cardData, '#template', (name, link) => {
    popupWithImage.open(name, link)
  });
  const cardElement = card.generateCard();
  return cardElement;
}
const userInfo = new UserInfo({ profileName: '.profile__title', profileSubtitle: '.profile__subtitle' });
const userPopupForm = new PopupWithForm({
  handleFormSubmit: (items) => {
    console.log(items);
    userInfo.setUserInfo({
      name: items['user-name'],
      info: items['user-text'],

    });
  }
}, '.popup-user')
userPopupForm.setEventListeners()

const cardPopupForm = new PopupWithForm({
  handleFormSubmit: (items) => {
    const createdCard = createCard({
      name: items['card-name'],
      link: items['card-url']
    })
    initCards.addItem(createdCard)
  }
}, '.popup-cards')
cardPopupForm.setEventListeners()
cardAddButton.addEventListener('click', function openEditPopup() {
  validationAddCard.resetValidation();
  cardPopupForm.open()
})

const validationAddCard = new FormValidator(enableValidation, cardPopupForm.getForm());
validationAddCard.enableValidation();

const validationProfile = new FormValidator(enableValidation, userPopupForm.getForm());
validationProfile.enableValidation();

profileEditButton.addEventListener('click', () => {
  const profileInfo = userInfo.getUserInfo();
  console.log(profileInfo);
  userPopupForm.setInputValues({
    'user-name': profileInfo.name,
    'user-text': profileInfo.info
  });
  validationProfile.resetValidation();
  userPopupForm.open()
})