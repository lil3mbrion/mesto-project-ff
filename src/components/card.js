import { deleteCardRequest, putLike, deleteLike } from "../components/api.js"

const cardTemplate = document.querySelector('#card-template').content;

function cardAdd(dataCard, deleteCard, likeClick, handleImagePopup, userId) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardAlt = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-button-counter');
  cardImg.src = dataCard.link;
  cardTitle.textContent = dataCard.name;
  cardAlt.alt = dataCard.name;

  const hasMyLike = dataCard.likes.some((like) => {
    if (like._id === userId) {
      return true;
    } else {
      return false;
    }
  })

  if (hasMyLike) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (dataCard.owner._id !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener('click', function(){
      deleteCard(cardElement, dataCard._id);
    }); 
  } 

  cardImg.addEventListener('click', function() {
    handleImagePopup(dataCard)
  });
  
  likeButton.addEventListener('click', function(evt) {
    likeClick(evt, likeCounter, dataCard._id)
  });

  likeCounter.textContent = dataCard.likes.length;

  return cardElement;
}

function likeClick(evt, likeElement, cardId) {
  const isLiked = evt.target.classList.contains('card__like-button_is-active');

  if (isLiked) {
    deleteLike(cardId)
      .then((card) => {
        evt.target.classList.remove('card__like-button_is-active')
        likeElement.textContent = card.likes.length
      })
      .catch((err) => {
        console.log('Ошибка:', err);
      })
  } else {
    putLike(cardId)
      .then((card) => {
        evt.target.classList.add('card__like-button_is-active')
        likeElement.textContent = card.likes.length
      })
      .catch((err) => {
        console.log('Ошибка:', err);
      })
  }
}

function deleteCard(cardElement, cardId) {
  deleteCardRequest(cardId)
    .then(() => {
      cardElement.remove(); 
    })
    .catch((err) => {
      console.log('Ошибка:', err);
    })
}

export { cardAdd, deleteCard, likeClick };