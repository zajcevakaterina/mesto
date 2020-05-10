// Получение объектов кнопок редактирования формы и закрытия попапа

const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');

const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');

/* Получение объектов профайла. Они вынесены сюда, так как используются в нескольких функциях:
1. setInputValue - для получения первичного value при открытии формы,
2. formSubmitHandler - для перезаписи значений в объектах */

let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__subtitle');

// Получение объекта формы и необходимых инпутов. Аналогично, они используются в нескольких функциях
const formElement = document.querySelector('.edit-form');
let nameInput = formElement.querySelector('.edit-form__item_el_name');
let jobInput = formElement.querySelector('.edit-form__item_el_job');


// Установка актуальных начальных значений value в input
function setInputValue() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  console.log(nameInput.value);
}

// Функции открытия и закрытия popup и их вызов
function openPopup() {
  popup.classList.add('popup_opened');
  setInputValue();
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);


// Сохранение данных из формы

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();

}

formElement.addEventListener('submit', formSubmitHandler);
