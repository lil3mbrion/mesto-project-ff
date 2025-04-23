// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const placeList = document.querySelector('.places__list');


function cardAdd(arrCard, deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  cardImg.src = arrCard.link;
  cardTitle.textContent = arrCard.name;
  deleteButton.addEventListener('click', function(){
    deleteCard(cardElement);
  });  
  placeList.append(cardElement);
  return cardElement;
}

function deleteCard(item) {
  item.remove();
}

initialCards.forEach(function (card){
  cardAdd(card, deleteCard);
});


