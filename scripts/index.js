// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const placeList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;


function cardAdd(dataCard, deleteCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardAlt = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  cardImg.src = dataCard.link;
  cardTitle.textContent = dataCard.name;
  cardAlt.alt = dataCard.name;
  deleteButton.addEventListener('click', function(){
    deleteCard(cardElement);
  });  
  
  return cardElement;
}

function deleteCard(item) {
  item.remove();
}

function renderCard(card) {
  placeList.append(card);
}

initialCards.forEach(function (card){
  renderCard(cardAdd(card, deleteCard));
});


