// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import { initialCards } from "./cards.js";
import { cardAdd, deleteCard, likeClick } from "../components/card.js";
import { openPopup, closePopup, overlayClick } from "../components/popup.js";

const placeList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const newPopup = document.querySelector('.popup_type_new-card');
const zoomPopup = document.querySelector('.popup_type_image');
const closeButtonEdit = editPopup.querySelector('.popup__close');
const closeButtonNew = newPopup.querySelector('.popup__close');
const closeButtonImage = zoomPopup.querySelector('.popup__close');
const popups = document.querySelectorAll('.popup');
const formEditCard = document.forms['edit-profile'];
const nameInput = formEditCard.querySelector('.popup__input_type_name');
const jobInput = formEditCard.querySelector('.popup__input_type_description');
const nameProfile = document.querySelector('.profile__title');
const dscrProfile = document.querySelector('.profile__description');
const formNewCard = document.forms['new-place'];
const titleInput = formNewCard.querySelector('.popup__input_type_card-name');
const urlInput = formNewCard.querySelector('.popup__input_type_url');

export function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export function handleImagePopup(dataCard) {
  const imagePopup = zoomPopup.querySelector('.popup__image');
  const captionPopup = zoomPopup.querySelector('.popup__caption');
  imagePopup.src = dataCard.link;
  imagePopup.alt = dataCard.name;
  captionPopup.textContent = dataCard.name;
  openPopup(zoomPopup);
};

popups.forEach(function(popup) {
  popup.addEventListener('click', overlayClick);
});

editButton.addEventListener('click', function() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = dscrProfile.textContent;
  openPopup(editPopup);
});

closeButtonEdit.addEventListener('click', function(evt) {
  closePopup(editPopup);
});

addButton.addEventListener('click', function() {
  openPopup(newPopup);
});

closeButtonNew.addEventListener('click', function() {
  closePopup(newPopup);
});

closeButtonImage.addEventListener('click', function() {
  closePopup(zoomPopup);
});

function handleFormEditSubmit(evt) {
  evt.preventDefault(); 
  nameProfile.textContent = nameInput.value;
  dscrProfile.textContent = jobInput.value;
  closePopup(editPopup);
}

formEditCard.addEventListener('submit', handleFormEditSubmit); 

function newCardSubmit(evt) {
  evt.preventDefault();

  const newDataCard = {
    name: titleInput.value,
    link: urlInput.value
  };

  placeList.prepend(cardAdd(newDataCard, deleteCard, likeClick, handleImagePopup));

  closePopup(newPopup);

  formNewCard.reset();
}

formNewCard.addEventListener('submit', newCardSubmit);

function renderCard(card) {
  placeList.append(card);
}

initialCards.forEach(function (card){
  renderCard(cardAdd(card, deleteCard, likeClick, handleImagePopup));
});


