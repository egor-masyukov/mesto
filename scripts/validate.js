const formVadationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error'
}
function disabledSubmit(event) {
    event.preventDefault()
}

function enableValidation(config) {
    const inputList = Array.from(document.querySelectorAll(config.formSelector));

    inputList.forEach((form) => {
        
        addInputListener(form, config);
        toggleButton(form, config);

    })

}

function handlerFormInput(event, config) {
    const input = event.target;
    const inputId = input.id
    const errorElement = document.querySelector(`#${inputId}-error`)

    if (!input.validity.valid) {
        input.classList.add(config.inputErrorClass)
        errorElement.textContent = input.validationMessage;
    } else {
        input.classList.remove(config.inputErrorClass);
        errorElement.textContent = '';
    }

}

function addInputListener(form, config) {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector))
    inputList.forEach(function (item) {
        item.addEventListener('input', (event) => {
            handlerFormInput(event, config)
            toggleButton(form, config);
        })
    })
}

function toggleButton(form, config) {
    const buttonSubmit = form.querySelector(config.submitButtonSelector)
    const isFormValid = form.checkValidity()
    buttonSubmit.disabled = !isFormValid
    buttonSubmit.classList.toggle(config.inactiveButtonClass, !isFormValid)

}
enableValidation(formVadationConfig)