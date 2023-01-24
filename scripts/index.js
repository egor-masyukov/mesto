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
const popupButtonCloseUser = popupUser.querySelector('.popup__button-close');
const popupButtonCloseCards = popupCards.querySelector('.popup__button-close');
const popupButtonCloseImage = popupImage.querySelector('.popup__button-close');
//поля формы
const popupInputName = popupUser.querySelector('.popup__input_type_name');
const popupInputDescription = popupUser.querySelector('.popup__input_type_description');
const popupForm = popupUser.querySelector('.popup__form');
const popupInputNameCard = popupCards.querySelector('.popup__input_type_name');
const popupInputDescriptionCard = popupCards.querySelector('.popup__input_type_description');
const popupFormCard = popupCards.querySelector('.popup__form');
const popupImageSrc = popupImage.querySelector('.popup-image__opened-src');
const popupImageDescription = popupImage.querySelector('.popup-image__opened-description');
// Карточки
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const createCard = (cardName) => {
  const template = `
        <li class="place">
            <img class="place__image" src="" alt="">
            <button class="place__button-delete" type="button"></button>
            <div class="place__title-zone">
                <h2 class="place__title"></h2>
                <button class="place__like-button" type="button"></button>
            </div>
        </li>
        `;
  const container = document.createElement('div');
  container.innerHTML = template;
  const card = container.firstElementChild;
  const image = card.querySelector('.place__image')
  card.querySelector('.place__title').textContent = cardName.name;
  image.setAttribute('src', cardName.link);
  image.setAttribute('alt', cardName.name);

  image.addEventListener('click', () => {
    popupImage.classList.add('popup_opened');
    popupImageSrc.src = cardName.link;
    popupImageSrc.alt = cardName.name;
    popupImageDescription.textContent = cardName.name;
  })
  popupButtonCloseImage.addEventListener('click', () => {
    popupImage.classList.remove('popup_opened');
  })

  const likeButton = card.querySelector('.place__like-button')
  likeButton.addEventListener('click', toggleActiveButton)
  function toggleActiveButton(evt) {
    evt.target.classList.toggle('place__like-button_active');
  }

  const deletBtn = card.querySelector('.place__button-delete');
  deletBtn.addEventListener('click', () => {
    card.remove();
  });

  return card;
};

const renderCard = (cardName) => {
  placesCards.prepend(createCard(cardName))
};

initialCards.forEach((item) => {
  renderCard(item)
});

const popupFormHandler = (evt) => {
  evt.preventDefault();

  renderCard({
    name: popupInputNameCard.value,
    link: popupInputDescriptionCard.value,
  });
  popupInputNameCard.value = '';
  popupInputDescriptionCard.value = '';
  offPopupCards()
}

function onPopupCards() {
  popupCards.classList.add('popup_opened');
}

function offPopupCards() {
  popupCards.classList.remove('popup_opened');
  popupInputNameCard.value = '';
  popupInputDescriptionCard.value = '';
}

cardAddButton.addEventListener('click', onPopupCards);
popupButtonCloseCards.addEventListener('click', offPopupCards);
popupFormCard.addEventListener('submit', popupFormHandler);

//Попап Профиль
function onPopupUser() {
  popupUser.classList.add('popup_opened');
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileSubtitle.textContent;
}

function offPopupUser() {
  popupUser.classList.remove('popup_opened');
}

function addTitle(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputDescription.value;
  offPopupUser()
}

profileEditButton.addEventListener('click', onPopupUser);
popupButtonCloseUser.addEventListener('click', offPopupUser);
popupForm.addEventListener('submit', addTitle);