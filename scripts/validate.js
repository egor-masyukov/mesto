const formVadationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error'
}

function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach((form) => {
        const inputList = Array.from(form.querySelectorAll(config.inputSelector));
        const buttonElement = form.querySelector(config.submitButtonSelector);

        form.addEventListener('submit', () => {
            toggleButtonState(inputList, buttonElement, config);
        });

        inputList.forEach(() => {
            addInputListener(inputList, buttonElement, config);

        })
    });
}

function showInputError(input, config) {
    const inputId = input.id;
    const errorElement = document.querySelector(`#${inputId}-error`)
    input.classList.add(config.inputErrorClass)
    errorElement.textContent = input.validationMessage;
};

function hideInputError(input, config) {
    const inputId = input.id;
    const errorElement = document.querySelector(`#${inputId}-error`)
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
};

function handlerFormInput(input, config) {
    if (!input.validity.valid) {
        showInputError(input, config);
    } else {
        hideInputError(input, config);
    }
};

function addInputListener(inputList, buttonElement, config) {
    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach(function (inputElement) {
        inputElement.addEventListener('input', () => {
            handlerFormInput(inputElement, config)
            toggleButtonState(inputList, buttonElement, config);
        })
    })
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

function toggleButtonState(inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(config.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(config.inactiveButtonClass);
    }
}

enableValidation(formVadationConfig)