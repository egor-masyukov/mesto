import Card from './Card.js'
import initialCards from './initialCards.js'
import { FormValidator, enableValidation } from './FormValidator.js'

const popupUser = document.querySelector('.popup-user');
const popupCards = document.querySelector('.popup-cards');
const placesCards = document.querySelector('.places__cards');
const popupImage = document.querySelector('.popup-image');
//профиль
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
//Кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const popupButtonClose = document.querySelectorAll('.popup__button-close');
//поля, формы
const popupInputName = popupUser.querySelector('.popup__input_type_name');
const popupInputDescription = popupUser.querySelector('.popup__input_type_description');
const popupProfileForm = popupUser.querySelector('.popup__form');
const popupInputNameCard = popupCards.querySelector('.popup__input_type_name');
const popupInputDescriptionCard = popupCards.querySelector('.popup__input_type_description');
const popupCardForm = popupCards.querySelector('.popup__form');
const popupDescription = popupImage.querySelector('.popup-image__opened-description');
const popupImageSrc = popupImage.querySelector('.popup-image__opened-src');

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

popupButtonClose.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', function () { closePopup(popup) });
  popup.addEventListener('mousedown', function (event) {
    if (event.target == popup) {
      closePopup(popup)
    };
  })
})

function handleCardClick(name, link) {
  popupImageSrc.src = link;
  popupImageSrc.alt = name;
  popupDescription.textContent = name;
  openPopup(popupImage);
}

function createCard(item) {
  const card = new Card(item, '#template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

initialCards.forEach((item) => {

  placesCards.prepend(createCard(item));
})

cardAddButton.addEventListener('click', function openEditPopup() {
  validationAddCard.resetValidation();
  openPopup(popupCards);
})

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const data = {
    name: popupInputNameCard.value,
    link: popupInputDescriptionCard.value,
  }

  placesCards.prepend(createCard(data))
  popupInputNameCard.value = '';
  popupInputDescriptionCard.value = '';

  closePopup(popupCards);
}

popupCardForm.addEventListener('submit', handleCardFormSubmit);

profileEditButton.addEventListener('click', function openEditPopup() {
  openPopup(popupUser);
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileSubtitle.textContent;
  validationProfile.resetValidation();
})


popupProfileForm.addEventListener('submit', function submit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputDescription.value;

  closePopup(popupUser);
})


const validationAddCard = new FormValidator(enableValidation, popupCardForm);
validationAddCard.enableValidation();


const validationProfile = new FormValidator(enableValidation, popupProfileForm);
validationProfile.enableValidation();