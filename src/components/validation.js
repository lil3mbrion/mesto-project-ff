const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  errorSelectorClass: 'form__input-error_active',
  inputSelectorClass: 'form__input_type_error'
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement  = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(validationSettings.inputSelectorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(validationSettings.errorSelectorClass)
}

const hideInputError = (formElement, inputElement) => {
  const errorElement  = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(validationSettings.inputSelectorClass)
  errorElement.textContent = ''
  errorElement.classList.remove(validationSettings.errorSelectorClass)
}

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideInputError(formElement, inputElement)
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = formElement.querySelector(validationSettings.buttonSelector)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement)
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
  formList.forEach(function(formElement) {
    formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    })
    setEventListeners(formElement);
  })
}

const hasInvalidInput = (inputList) => {
  return inputList.some(function(inputElement) {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
  }
}

const clearValidation = (formElement, settings) => {
  const errorElements = formElement.querySelectorAll(`.${settings.errorSelectorClass}`)
  errorElements.forEach((errorElement) => {
    errorElement.textContent = ''
    errorElement.classList.remove(settings.errorSelectorClass)
  })

  const inputElements = formElement.querySelectorAll(settings.inputSelector)
  inputElements.forEach((inputElement) => {
    inputElement.classList.remove(settings.inputSelectorClass)
  })

  const submitButton = formElement.querySelector(settings.buttonSelector)
  submitButton.disabled = true
  submitButton.classList.add(settings.inactiveButtonClass)
}

export {enableValidation, clearValidation, validationSettings};