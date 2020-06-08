/*В этой теме в отдельном файле попробовала использовать подход с использованием function declaration. Он оказался,
на мой взгляд, более читабельным, так как можно писать функции друг под другом: сначала та,
которАЯ вызывает, затем та, которУЮ вызывают */

function enableValidation(options) { // запуск валидации, отмена дефолтного поведения при отправке формы
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach(function(formEl) {
    formEl.addEventListener('submit', (evt) => evt.preventDefault());
    setEventInputListeners(formEl, options);
  });
};

function setEventInputListeners(formEl, options) { // установка слушателей и обработчиков событий на все инпуты в формах
  const inputList = findInputs(formEl, options.inputSelector);
  const buttonEl = findButtons(formEl, options.submitButtonSelector);

  inputList.forEach(function(inputEl){
    inputEl.addEventListener('input', function(){
      checkInputValidity(inputEl, options.errorClass, options.InputErrorClass);
      toggleButtonState(formEl, buttonEl, options.inactiveButtonClass);
    });
  });
};

function findInputs(formEl, inputSelector) { // отдельная функция, так как переиспользуется при открытии форм
  return Array.from(formEl.querySelectorAll(inputSelector));
}

function findButtons(formEl, submitButtonSelector) { // отдельная функция, так как переиспользуется при отрытии форм
 return formEl.querySelector(submitButtonSelector);
}

function checkInputValidity(inputEl, errorClass, inputErrorClass) { // проверка конкретного инпута на валидность
  if(!inputEl.validity.valid) {
    showInputErrorMessage(inputEl, inputEl.validationMessage, errorClass, inputErrorClass);
  } else {
    hideInputErrorMessage (inputEl, errorClass, inputErrorClass);
  }
}

function showInputErrorMessage(inputEl, message, errorClass, inputErrorClass) { // отображение текста с ошибкой
  const errorEl = popups.querySelector(`#${inputEl.id}-error`);
  errorEl.classList.add(errorClass);
  errorEl.textContent = message;
  inputEl.classList.add(inputErrorClass);
}

function hideInputErrorMessage(inputEl, errorClass, inputErrorClass) { // скрытие текста с ошибкой
  const errorEl = document.querySelector(`#${inputEl.id}-error`);
  errorEl.classList.remove(errorClass);
  errorEl.textContent = '';
  inputEl.classList.remove(inputErrorClass);
}

function toggleButtonState(formEl, buttonEl, inactiveButtonClass) { // переключение состояния кнопки в зависимости от валидности всей формы
  const isValid = formEl.checkValidity();
  if(isValid) {
    buttonEl.classList.remove(inactiveButtonClass);
  } else {
    buttonEl.classList.add(inactiveButtonClass);
  }
}
