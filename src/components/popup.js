import { handleEscape } from "../scripts/index.js";

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscape)
}

function overlayClick(evt) {
  if (evt.target === evt.currentTarget) {  
    closePopup(evt.currentTarget);
  }
}

export { openPopup, closePopup, overlayClick };