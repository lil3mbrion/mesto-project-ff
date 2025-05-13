import { handleEscape } from "./index.js";

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}

export { openPopup, closePopup };