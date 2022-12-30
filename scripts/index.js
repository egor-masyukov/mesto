let popup = document.querySelector('.popup');
let profileEditButton = document.querySelector('.profile__edit-button');
let popupButtonClose = document.querySelector('.popup__button-close');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let profileInfo = document.querySelector('.profile__Info');
let popupButtonSave = document.querySelector('.popup__button-save');
let popupInputName = document.querySelector('.popup__input_type_name');
let popupInputDescription = document.querySelector('.popup__input_type_description');

function onPopup () {
   popup.classList.add ('popup_opened');
   popupInputName.value = profileTitle.textContent;
   popupInputDescription.value = profileSubtitle.textContent;
 }
 
 function offPopup ()  {
 popup.classList.remove ('popup_opened');
 }

function addTitle(evt) {
   evt.preventDefault();
   profileTitle.textContent = popupInputName.value;
   profileSubtitle.textContent = popupInputDescription.value;
   offPopup()
}

profileEditButton.addEventListener('click', onPopup);
popupButtonClose.addEventListener('click', offPopup);
popupButtonSave.addEventListener('click', addTitle);