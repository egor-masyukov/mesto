const popupUser = document.querySelector('.popup-user');
const popupCards = document.querySelector('.popup-cards');
const popupImage = document.querySelector('.popup-image');
const placesCards = document.querySelector('.places__cards');
//профиль
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
//Кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const popupButtonClose = document.querySelectorAll('.popup__button-close');
//поля формы
const popupInputName = popupUser.querySelector('.popup__input_type_name');
const popupInputDescription = popupUser.querySelector('.popup__input_type_description');
const popupProfileForm = popupUser.querySelector('.popup__form');
const popupInputNameCard = popupCards.querySelector('.popup__input_type_name');
const popupInputDescriptionCard = popupCards.querySelector('.popup__input_type_description');
const popupCardForm = popupCards.querySelector('.popup__form');
const popupImageSrc = popupImage.querySelector('.popup-image__opened-src');
const popupImageDescription = popupImage.querySelector('.popup-image__opened-description');
//template
const template = document.querySelector('#template').content;

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc)
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc)
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

const createCard = (cardName) => {
  const card = template.querySelector('.place').cloneNode(true);
  const image = card.querySelector('.place__image')
  card.querySelector('.place__title').textContent = cardName.name;
  image.setAttribute('src', cardName.link);
  image.setAttribute('alt', cardName.name);

  image.addEventListener('click', () => {
    openPopup(popupImage)
    popupImageSrc.src = cardName.link;
    popupImageSrc.alt = cardName.name;
    popupImageDescription.textContent = cardName.name;
  });

  const likeButton = card.querySelector('.place__like-button')
  likeButton.addEventListener('click', toggleActiveButton)
  function toggleActiveButton(evt) {
    evt.target.classList.toggle('place__like-button_active');
  };

  const deletBtn = card.querySelector('.place__button-delete');
  deletBtn.addEventListener('click', () => {
    card.remove();
  });

  return card;
}

const renderCard = (cardName) => {
  placesCards.prepend(createCard(cardName));
}

initialCards.forEach(renderCard);

cardAddButton.addEventListener('click', function openEditPopup() {
  openPopup(popupCards);
})

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  renderCard({
    name: popupInputNameCard.value,
    link: popupInputDescriptionCard.value,
  });
  popupInputNameCard.value = '';
  popupInputDescriptionCard.value = '';
  closePopup(popupCards);
}

popupCardForm.addEventListener('submit', handleCardFormSubmit);

profileEditButton.addEventListener('click', function openEditPopup() {
  openPopup(popupUser);
  popupInputName.value = profileTitle.textContent;
  popupInputName.dispatchEvent(new Event("input"))
  popupInputDescription.value = profileSubtitle.textContent;
  popupInputDescription.dispatchEvent(new Event("input"))
})


popupProfileForm.addEventListener('submit', function submit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputDescription.value;
  closePopup(popupUser);
})
