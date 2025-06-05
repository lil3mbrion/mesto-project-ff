// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import { cardAdd, deleteCard, likeClick } from "../components/card.js";
import { openPopup, closePopup, overlayClick } from "../components/popup.js";
import {enableValidation, clearValidation, validationSettings} from "../components/validation.js";
import {loadCleanAvatarUrl, loadUsersCards, loadUserInfo, uploadUserAvatar, uploadUserInfo, postNewCard} from "../components/api.js";

const placeList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__image');
const avatarPopup = document.querySelector('.popup_type_avatar');
const editPopup = document.querySelector('.popup_type_edit');
const newPopup = document.querySelector('.popup_type_new-card');
const zoomPopup = document.querySelector('.popup_type_image');
const closeButtonAvatar = avatarPopup.querySelector('.popup__close');
const closeButtonEdit = editPopup.querySelector('.popup__close');
const closeButtonNew = newPopup.querySelector('.popup__close');
const closeButtonImage = zoomPopup.querySelector('.popup__close');
const popups = document.querySelectorAll('.popup');
const formAvatarCard = document.forms['avatar-profile'];
const avatarUrlInput = formAvatarCard.querySelector('.popup__input_type_url');
const formEditCard = document.forms['edit-profile'];
const nameInput = formEditCard.querySelector('.popup__input_type_name');
const jobInput = formEditCard.querySelector('.popup__input_type_description');
const nameProfile = document.querySelector('.profile__title');
const dscrProfile = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const formNewCard = document.forms['new-place'];
const titleInput = formNewCard.querySelector('.popup__input_type_card-name');
const urlInput = formNewCard.querySelector('.popup__input_type_url');
const buttonSubmitAvatar = formAvatarCard.querySelector('.popup__button');
const buttonSubmitEdit = formEditCard.querySelector('.popup__button');
const buttonSubmitNewCard = formNewCard.querySelector('.popup__button');

function handleImagePopup(dataCard) {
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
  clearValidation(formEditCard, validationSettings)
  openPopup(editPopup);
});

avatarButton.addEventListener('click', function() {
  loadCleanAvatarUrl()
    .then((res) => {
      avatarUrlInput.value = res;
    })
  clearValidation(formAvatarCard, validationSettings);
  openPopup(avatarPopup);
})

closeButtonEdit.addEventListener('click', function(evt) {
  closePopup(editPopup);
});

closeButtonAvatar.addEventListener('click', function(evt) {
  closePopup(avatarPopup);
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

function handleFormAvatarSubmit(evt) {
  evt.preventDefault();
  buttonSubmitAvatar.textContent = 'Сохранение...';
  buttonSubmitAvatar.disabled = true;
  uploadUserAvatar(avatarUrlInput.value)
    .then(() => {
      profileImage.style.backgroundImage = `url('${avatarUrlInput.value}')`
      closePopup(avatarPopup);
    })
    .finally(() => {
      buttonSubmitAvatar.textContent = 'Сохранить';
      buttonSubmitAvatar.disabled = false;
    })
}

formAvatarCard.addEventListener('submit', handleFormAvatarSubmit);

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  buttonSubmitEdit.textContent = 'Сохранение...';
  buttonSubmitEdit.disabled = true;
  uploadUserInfo(nameInput.value, jobInput.value)
  .then(() => {
    nameProfile.textContent = nameInput.value;
    dscrProfile.textContent = jobInput.value;
    closePopup(editPopup);
  })
  .finally(() => {
    buttonSubmitEdit.textContent = 'Сохранить';
    buttonSubmitEdit.disabled = false;
  })
}

formEditCard.addEventListener('submit', handleFormEditSubmit); 

function newCardSubmit(evt) {
  evt.preventDefault();
  buttonSubmitNewCard.textContent = 'Сохранение...';
  buttonSubmitNewCard.disabled = true;
  postNewCard(titleInput.value, urlInput.value)
    .then((res) => {
      return res.json();
    })
    .then((dataCard) => {
      placeList.prepend(cardAdd(dataCard, deleteCard, likeClick, handleImagePopup));
      closePopup(newPopup);
      formNewCard.reset();
      clearValidation(formNewCard, validationSettings)
    })
    .finally(() => {
      buttonSubmitNewCard.textContent = 'Сохранить';
      buttonSubmitNewCard.disabled = false;
    })
}

formNewCard.addEventListener('submit', newCardSubmit);

enableValidation();

Promise.all([loadUserInfo(), loadUsersCards()])
  .then(([result, cards]) => {
    console.log('Данные загружены:', { result, cards });
  })

export{ nameProfile, dscrProfile, profileImage, handleImagePopup, placeList}



