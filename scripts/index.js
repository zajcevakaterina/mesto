import { initialCards } from './initialCardsData.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

// ПЕРЕМЕННЫЕ
// Попапы
const popups = document.querySelector('.popups');
const popupEditProfile = popups.querySelector('.popup_type_edit-profile');
const popupAddPlace = popups.querySelector('.popup_type_add-place');
const popupSeeImage = popups.querySelector('.popup_type_see-image');

// Профайл
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__subtitle');

// Форма редактирования профайла и инпуты
const editProfileForm = document.querySelector('.form_type_edit-profile');
const nameInput = editProfileForm.querySelector('.form__item_el_name');
const jobInput = editProfileForm.querySelector('.form__item_el_job');

//Форма добавления карточки места, инпуты и кнопка
const addPlaceForm = popupAddPlace.querySelector('.form_type_add-place');
const userPlaceName = popupAddPlace.querySelector('.form__item_el_place-name');
const userPlaceLink = popupAddPlace.querySelector('.form__item_el_place-link');

// Кнопки для открытия попапов с формой и кнопка закрытия
const editButton = profile.querySelector('.profile__edit-button');
const addPlaceButton = profile.querySelector('.profile__add-button');

// Объект, содержащий все карточки с местами для createPlacesCards
const places = document.querySelector('.places');

// Шаблон для создания карточек
const placesCardTemplate = document.querySelector('.places-card-template').content;

// Селекторы для валидации форм
const formValidationOptions = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
}


// РЕДАКТИРОВАНИЕ ПРОФАЙЛА
const setEditFormInputValue = () => { // установка начальных данных в форме
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

const editFormSubmitHandler = (e) => { // сохранение данных, введенных пользователем
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupToggle(popupEditProfile);
}

editProfileForm.addEventListener('submit', editFormSubmitHandler);

// УПРАВЛЕНИЕ ПОПАПАМИ
// Открытие/закрытие попапов
const popupToggle = (currentPopup) => {
  currentPopup.classList.toggle('popup_opened');
  if (currentPopup.classList.contains('popup_opened')) {
    document.addEventListener('keydown', closePopupWithEscape);
  } else {
    document.removeEventListener('keydown', closePopupWithEscape);
  }
}

const closePopupWithEscape = (e) => { // закрытие попапа по Escape
  if (e.key === 'Escape') {
    popupToggle(popups.querySelector('.popup_opened'));
  }
}

const closePopup = (e) => { //Закрытие попапов по клику
  if (e.target.classList.contains('popup_opened')
  || (e.target.classList.contains('popup__close-button'))){
    popupToggle(e.target.closest(".popup"));
  };
};

popups.addEventListener('click', closePopup);


// Cлушатели включения попапов

editButton.addEventListener('click', () => { // попап редактирования профиля
  popupToggle(popupEditProfile);
  setEditFormInputValue();
  editProfileValidator.formInitialCheck();
});

addPlaceButton.addEventListener('click', () => { // попап добавления фотографий мест
  popupToggle(popupAddPlace);
  setPlaceholder();
  addPlaceValidator.formInitialCheck();
});


// ДОБАВЛЕНИЕ КАРТОЧЕК ПОЛЬЗОВАТЕЛЕМ

const setPlaceholder = () => { //обнуляет значения, введенные пользователем при прошлом использовании popupAddPlace
  userPlaceName.value = '';
  userPlaceLink.value = '';
};

const popupPlacesToggle = (e, name) => { // открытие popupSeeImage для нужной карточки
  popupToggle(popupSeeImage);
  popupSeeImage.querySelector('.popup__image').src = e.target.src;
  popupSeeImage.querySelector('.popup__image-caption').textContent = name;
};


const createCardElement = (el) => new Card(el, '.places-card-template', popupPlacesToggle).generateCard(); // Создание карточек из класса

const prependCardToDOM = function(DOMContainer, card) { // добавление карточки в DOM
  DOMContainer.prepend(card);
}

const createPlacesCards = (arr) => { // создание карточек из данных в массиве
  arr.forEach((el) => {
    prependCardToDOM(places, createCardElement(el) );
  });
}

createPlacesCards(initialCards); //создание карточек "из коробки" при загрузке сайте

addPlaceForm.addEventListener('submit', (e) => { //создание карточек по введенным данным пользователя
  const link = userPlaceLink.value;
  const name = userPlaceName.value;
  prependCardToDOM(places, createCardElement({name, link}));
  popupToggle(popupAddPlace);
})

// Создание валидаторов для каждой из форм
const editProfileValidator = new FormValidator(formValidationOptions, editProfileForm);
const addPlaceValidator = new FormValidator(formValidationOptions, addPlaceForm);

// Запуск валидации форм
editProfileValidator.enableValidation();
addPlaceValidator.enableValidation();
