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
const closeButton = document.querySelectorAll('.popup__close-button');

// Объект, содержащий все карточки с местами для createPlacesCards
const places = document.querySelector('.places');

// Шаблон для создания карточек
const placesCardTemplate = document.querySelector('.places-card-template').content;

// РЕДАКТИРОВАНИЕ ПРОФАЙЛА
const setEditFormInputValue = () => { // установка начальных данных в форме
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

const editFormSubmitHandler = (e) => { // сохранение данных, введенных пользователем
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup;
}

editProfileForm.addEventListener('submit', editFormSubmitHandler);

// УПРАВЛЕНИЕ ПОПАПАМИ
// Открытие/закрытие попапов
const popupToggle = (currentPopup) => currentPopup.classList.toggle('popup_opened');

const formInitialSetup = function(currentForm) { // проверка на валидность и установка состояния кнопки + обнуление сообщений об ошибке
  const inputList = findInputs(currentForm, formValidationOptions.inputSelector);
  const buttonEl = findButtons(currentForm, formValidationOptions.submitButtonSelector);
  toggleButtonState(currentForm, buttonEl, formValidationOptions.inactiveButtonClass);

  inputList.forEach(function(input) {
    hideInputErrorMessage(input, formValidationOptions.errorClass, formValidationOptions.inputErrorClass);
  })
}

const openPopup = (popup) => { // добавила эту функцию, чтобы на все попапы было одинаково: открытие + добавление слушателя для Escape
  popupToggle(popup);
  document.addEventListener('keydown', closePopupWithEscape);
}

const closePopupWithEscape = (e) => { // закрытие попапа по Escape
  if (e.key === 'Escape') {
    popupToggle(popups.querySelector('.popup_opened'));
    document.removeEventListener('keydown', closePopup);
  }
}

// Закрытие попапов по клику - функция объединяет popupToggle и снятие слушателя на Escape, который добавляется при открытии любого попапа
const closePopup = (e) => {
  if (e.target.classList.contains('popup_opened')
  || (e.target.classList.contains('popup__close-button'))
  || (e.target.classList.contains('form__button'))){ //класс кнопки, кажется, отсюда убрать нельзя, потому что иначе в ф-ции submit надо будет вызывать toggle и removeEventlisneter отдельно. сейчас я добавила просто вызов closePopup из Submit
    popupToggle(e.target.closest(".popup"));
  };
  document.removeEventListener('keydown', closePopup);
};

popups.addEventListener('click', closePopup);


// Cлушатели включения попапов

editButton.addEventListener('click', () => { // попап редактирования профиля
  openPopup(popupEditProfile); // тут и далее новая ф-ция
  setEditFormInputValue();
  formInitialSetup(editProfileForm);
});

addPlaceButton.addEventListener('click', () => { // попап добавления фотографий мест
  openPopup(popupAddPlace);
  setPlaceholder();
  formInitialSetup(addPlaceForm);
});


// ДОБАВЛЕНИЕ КАРТОЧЕК ПОЛЬЗОВАТЕЛЕМ

const setPlaceholder = () => { //обнуляет значения, введенные пользователем при прошлом использовании popupAddPlace
  userPlaceName.value = '';
  userPlaceLink.value = '';
};

const likeToggle = (e) => e.target.classList.toggle('places__like_active'); // включение/выключение лайков при нажатии

const deletePlaceCard = (e) => e.target.parentElement.remove(); // удаление карточки при нажатии на "корзину"

const popupPlacesToggle = (e, name) => { // открытие popupSeeImage для нужной карточки
  openPopup(popupSeeImage);
  popupSeeImage.querySelector('.popup__image').src = e.target.src;
  popupSeeImage.querySelector('.popup__image-caption').textContent = name;
};

const createCardElement = (el) => { // создание карточки из шаблона и наполнение содержимым
  const placesCardItem = placesCardTemplate.cloneNode(true);
  const cardImage = placesCardItem.querySelector('.places__image');
  cardImage.src = el.link;
  cardImage.alt = `Фотография места под названием ${el.name}`;
  placesCardItem.querySelector('.places__title').textContent = el.name;
  placesCardItem.querySelector('.places__like').addEventListener('click', (e) => likeToggle(e));
  placesCardItem.querySelector('.places__delete-button').addEventListener('click', (e) => deletePlaceCard(e));
  cardImage.addEventListener('click', (e) => popupPlacesToggle(e, el.name));
  return placesCardItem;
}

const prependCardToDOM = function(DOMContainer, card) { // добавление карточки в DOM. теперь функция может вставлять, какую угодно карточку (или элемент)
  DOMContainer.prepend(card);
}

const createPlacesCards = (arr) => { // создание карточек из данных в массиве
  arr.forEach((el) => {
    prependCardToDOM(places, createCardElement(el));
  });
}

createPlacesCards(initialCards); //создание карточек "из коробки" при загрузке сайте

addPlaceForm.addEventListener('submit', (e) => { //создание карточек по введенным данным пользователя
  const link = userPlaceLink.value;
  const name = userPlaceName.value;
  prependCardToDOM(places, createCardElement({link, name}));
  closePopup;
})
