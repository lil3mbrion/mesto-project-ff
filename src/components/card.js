import { currentUserId } from "../components/api.js";

const cardTemplate = document.querySelector('#card-template').content;

function cardAdd(dataCard, deleteCard, likeClick, handleImagePopup) {
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
    if (like._id === currentUserId) {
      return true;
    } else {
      return false;
    }
  })

  if (hasMyLike) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (dataCard.owner._id !== currentUserId) {
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
  } else {
    putLike(cardId)
      .then((card) => {
        evt.target.classList.add('card__like-button_is-active')
        likeElement.textContent = card.likes.length
      })
  }
}

function deleteCard(cardElement, cardId) {
  fetch(`https://nomoreparties.co/v1/wff-cohort-39/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'd1c2fddb-87a6-4562-b49e-98d228179b39',
    },
  })
    .then(() => {
      cardElement.remove(); 
    })
}

const putLike = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-39/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: 'd1c2fddb-87a6-4562-b49e-98d228179b39',
    },
  })
    .then((res) => {
      return res.json()
    })
}

const deleteLike = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-39/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'd1c2fddb-87a6-4562-b49e-98d228179b39',
    },
  })
    .then((res) => {
      return res.json()
    })
}

export { cardAdd, deleteCard, likeClick };