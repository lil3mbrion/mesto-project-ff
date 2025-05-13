import { openPopup } from "./popup.js";

const placeList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const zoomPopup = document.querySelector('.popup_type_image');
const imagePopup = zoomPopup.querySelector('.popup__image');

function cardAdd(dataCard, deleteCard, likeClick) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardAlt = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  cardImg.src = dataCard.link;
  cardTitle.textContent = dataCard.name;
  cardAlt.alt = dataCard.name;
  deleteButton.addEventListener('click', function(){
    deleteCard(cardElement);
  });  

  cardImg.addEventListener('click', function() {
    imagePopup.src = dataCard.link;
    imagePopup.alt = dataCard.name;
    openPopup(zoomPopup);
  });
  
  likeButton.addEventListener('click', likeClick);

  return cardElement;
}

function deleteCard(item) {
  item.remove();
}

function renderCard(card) {
  placeList.append(card);
}

function likeClick(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export { cardAdd, deleteCard, renderCard, likeClick };