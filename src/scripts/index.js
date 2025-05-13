// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import { initialCards } from "./cards.js";
import { cardAdd, deleteCard, renderCard, likeClick } from "./card.js";
import { openPopup, closePopup } from "./popup.js";

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
const formElement = document.forms['edit-profile'];
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const nameProfile = document.querySelector('.profile__title');
const dscrProfile = document.querySelector('.profile__description');
const formNewCard = document.forms['new-place'];
const titleInput = formNewCard.querySelector('.popup__input_type_card-name');
const urlInput = formNewCard.querySelector('.popup__input_type_url');

function overlayClick(evt) {
  if (evt.target === evt.currentTarget) {  
    closePopup(evt.currentTarget);
  }
}

export function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

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

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  nameProfile.textContent = nameInput.value;
  dscrProfile.textContent = jobInput.value;
  closePopup(editPopup);
}

formElement.addEventListener('submit', handleFormSubmit); 

function newCardSubmit(evt) {
  evt.preventDefault();

  const newDataCard = {
    name: titleInput.value,
    link: urlInput.value
  };

  placeList.prepend(cardAdd(newDataCard, deleteCard, likeClick));

  closePopup(newPopup);

  formNewCard.reset();
}

formNewCard.addEventListener('submit', newCardSubmit);

initialCards.forEach(function (card){
  renderCard(cardAdd(card, deleteCard, likeClick));
});


