let nameEdit = document.querySelector('.popup');
let profileEditButton = document.querySelector('.profile__edit-button');
let popupButtonClose = document.querySelector('.popup__button-close');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let profileInfo = document.querySelector('.profile__Info');
let popupButtonSave = document.querySelector('.popup__button-save');
let titleName = document.querySelector('.popup__name');
let textName = document.querySelector('.popup__text');


function editButton() {
   nameEdit.classList.toggle('popup_opened');
   titleName.value = profileTitle.textContent;
   textName.value = profileSubtitle.textContent;

}

function addTitle() {

   profileTitle.textContent = titleName.value;
   profileSubtitle.textContent = textName.value;
   editButton()
}

profileEditButton.addEventListener('click', editButton);
popupButtonClose.addEventListener('click', editButton);
popupButtonSave.addEventListener('click', addTitle);