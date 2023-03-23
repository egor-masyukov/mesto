import Card from '../components/Card.js'
import Popup from '../components/Popup.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import initialCards from '../utils/initialCards.js'
import '../pages/index.css';
import { FormValidator, enableValidation } from '../components/FormValidator.js'
const popupUser = document.querySelector('.popup-user');
const popupCards = document.querySelector('.popup-cards');
const popupImage = document.querySelector('.popup-image');
const profileName = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const popupInputName = popupUser.querySelector('.popup__input_type_name');
const popupInputDescription = popupUser.querySelector('.popup__input_type_description');

const popupEditProfile = new Popup(popupUser);
popupEditProfile.setEventListeners();
const popupEditCard = new Popup(popupCards);
popupEditCard.setEventListeners();

const popupWithImage = new PopupWithImage(popupImage)
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
    console.log(name, link);
    popupWithImage.open(name, link)
  });
  const cardElement = card.generateCard();
  return cardElement;
}

const userPopupForm = new PopupWithForm({
  handleFormSubmit: (items) => {
    profileName.textContent = items['user-name'];
    profileSubtitle.textContent = items['user-text'];
  }
}, popupUser)
userPopupForm.setEventListeners()

const cardPopupForm = new PopupWithForm({
  handleFormSubmit: (items) => {
    const createdCard = createCard({
      name: items['card-name'],
      link: items['card-url']
    })
    initCards.addItem(createdCard)
    console.log('handleFormSubmit', items);
  }
}, popupCards)
cardPopupForm.setEventListeners()
cardAddButton.addEventListener('click', function openEditPopup() {
  validationAddCard.resetValidation();
  cardPopupForm.open()
})

const validationAddCard = new FormValidator(enableValidation, cardPopupForm.getForm());
validationAddCard.enableValidation();

const validationProfile = new FormValidator(enableValidation, userPopupForm.getForm());
validationProfile.enableValidation();

const userInfo = new UserInfo({ profileName: '.profile__title', profileSubtitle: '.profile__subtitle' });

profileEditButton.addEventListener('click', function openEditPopup() {
  const profileInfo = userInfo.getUserInfo();
  console.log(profileInfo);
  popupInputName.value = profileInfo.name;
  popupInputDescription.value = profileInfo.info;
  validationProfile.resetValidation();
  popupEditProfile.open()
})