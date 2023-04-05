import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ handleFormSubmit }, selector) {
        super(selector);
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._submitButton = this._form.querySelector('.popup__button-save');
        this._handleFormSubmit = handleFormSubmit;
        this._submitButtonText = this._submitButton.textContent;
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }


    getForm() {
        return this._form
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        });
    }

    close() {
        this._form.reset();
        super.close();
    }

    saveProgressText() {
        this._submitButton.textContent = 'Сохранение...';
    }

    saveText() {
        this._submitButton.textContent = this._submitButtonText;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close()
        });
    }
}