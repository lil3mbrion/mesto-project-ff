import { handleImagePopup } from "../scripts/index.js";

const placeList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function cardAdd(dataCard, deleteCard, likeClick, handleImagePopup) {
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
    handleImagePopup(dataCard)
  });
  
  likeButton.addEventListener('click', likeClick);

  return cardElement;
}

function deleteCard(item) {
  item.remove();
}

function likeClick(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export { cardAdd, deleteCard, likeClick };