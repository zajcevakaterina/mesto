export default class FormValidator {
  constructor(options, formEl) {
    this._options = options;
    this._formEl = formEl;
  }

  _setEventInputListeners() { // установка слушателей и обработчиков событий на все инпуты в форме
    this._inputList = this._findInputs();
    this._buttonEl = this._findButtons();
    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener('input', () => {
        this._checkInputValidity(inputEl, this._options.errorClass, this._options.inputErrorClass);
        this._toggleButtonState();
      });
    });
  };

  _findInputs() {
    return Array.from(this._formEl.querySelectorAll(this._options.inputSelector));
  }

  _findButtons() {
    return this._formEl.querySelector(this._options.submitButtonSelector);
  }

  _checkInputValidity(inputEl, errorClass, inputErrorClass) { // проверка конкретного инпута на валидность
    if (!inputEl.validity.valid) {
      this._showInputErrorMessage(inputEl, inputEl.validationMessage, errorClass, inputErrorClass);
    } else {
      this._hideInputErrorMessage(inputEl, errorClass, inputErrorClass);
    }
  }

  _showInputErrorMessage(inputEl, message, errorClass, inputErrorClass) { // отображение текста с ошибкой
    const errorEl = document.querySelector(`#${inputEl.id}-error`);
    errorEl.classList.add(errorClass);
    errorEl.textContent = message;
    inputEl.classList.add(inputErrorClass);
  }

  _hideInputErrorMessage(inputEl, errorClass, inputErrorClass) { // скрытие текста с ошибкой
    const errorEl = document.querySelector(`#${inputEl.id}-error`);
    errorEl.classList.remove(errorClass);
    errorEl.textContent = '';
    inputEl.classList.remove(inputErrorClass);
  }

  _toggleButtonState() { // переключение состояния кнопки в зависимости от валидности всей формы
    const isValid = this._formEl.checkValidity();
    if (isValid) {
      this._buttonEl.classList.remove(this._options.inactiveButtonClass);
      this._buttonEl.disabled = false;
    } else {
      this._buttonEl.classList.add(this._options.inactiveButtonClass);
      this._buttonEl.disabled = true;
    }
  }

  formInitialCheck() { // проверка на валидность и установка состояния кнопки + обнуление сообщений об ошибке
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      this._hideInputErrorMessage(input, this._options.errorClass, this._options.inputErrorClass);
    })
  }

  enableValidation() {
    this._formEl.addEventListener('submit', (evt) => evt.preventDefault());
    this._setEventInputListeners();
  }
}
