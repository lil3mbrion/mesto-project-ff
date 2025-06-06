const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement  = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(settings.inputSelectorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(settings.errorSelectorClass)
}

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement  = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(settings.inputSelectorClass)
  errorElement.textContent = ''
  errorElement.classList.remove(settings.errorSelectorClass)
}

const checkInputValidity = (formElement, inputElement, settings) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings)
  } else {
    hideInputError(formElement, inputElement, settings)
  }
}

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.buttonSelector)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings)
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach(function(formElement) {
    formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    })
    setEventListeners(formElement, settings);
  })
}

const hasInvalidInput = (inputList) => {
  return inputList.some(function(inputElement) {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
}

const clearValidation = (formElement, settings) => {
  const inputElements = Array.from(formElement.querySelectorAll(settings.inputSelector))
  const submitButton = formElement.querySelector(settings.buttonSelector)
  inputElements.forEach((inputElement) => {
    hideInputError(formElement, inputElement, settings)
  })
  toggleButtonState(inputElements, submitButton, settings)
}

export {enableValidation, clearValidation};