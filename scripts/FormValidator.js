export const enableValidation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
}

export class FormValidator {
  constructor(formSelectors, formElement) {
    this._formElement = formElement;

    this._inputSelector = formSelectors.inputSelector;
    this._submitButtonSelector = formSelectors.submitButtonSelector;
    this._inactiveButtonClass = formSelectors.inactiveButtonClass;
    this._inputErrorClass = formSelectors.inputErrorClass;
    this._buttonSubmit = this._formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError(input) {
    const inputId = input.id;
    this._errorElement = this._formElement.querySelector(`#${inputId}-error`);
    input.classList.add(this._inputErrorClass);
    this._errorElement.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    const inputId = input.id;
    this._errorElement = this._formElement.querySelector(`#${inputId}-error`);
    input.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = '';
  }

  _handlerFormInput(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _addInputListener() {
    this._inputList = this._formElement.querySelectorAll(this._inputSelector);

    this._inputList.forEach((item) => {
      item.addEventListener('input', () => {
        this._handlerFormInput(item);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _toggleButtonState() {
    const isValid = this._formElement.checkValidity();
    this._buttonSubmit.disabled = !isValid;
    this._buttonSubmit.classList.toggle(this._inactiveButtonClass, !isValid);
  }

  enableValidation() {
    this._addInputListener();
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }
}