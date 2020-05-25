// ПЕРЕМЕННЫЕ
// Попапы
const popups = document.querySelector('.popups');
const popupEditProfile = popups.querySelector('.popup_type_edit-profile');
const popupAddPlace = popups.querySelector('.popup_type_add-place');
const popupSeeImage = popups.querySelector('.popup_type_see-image');


// Профайл
const profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__subtitle');

// Форма редактирования профайла и инпуты
const editProfileForm = document.querySelector('.form_type_edit-profile');
let nameInput = editProfileForm.querySelector('.form__item_el_name');
let jobInput = editProfileForm.querySelector('.form__item_el_job');

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

// Данные для карточек "из коробки"
const initialCards = [
  {
    name: 'Казань',
    link: 'https://images.unsplash.com/photo-1584270692240-0411d322e4b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=652&q=80'
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1552588355-23e1b81409cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=635&q=80'
  },
  {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1551005756-fd0657e8fbf2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60'
  },
  {
    name: 'Москва',
    link: 'https://images.unsplash.com/photo-1512495039889-52a3b799c9bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60'
  },
  {
    name: 'Алтай',
    link: 'https://images.unsplash.com/photo-1564504412083-aaba4f871b80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60'
  },
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1580474256381-f98bb0532dc4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60'
  }
];

// РЕДАКТИРОВАНИЕ ПРОФАЙЛА
const setEditFormInputValue = function () { // установка начальных данных в форме
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

const editFormSubmitHandler = function(e) { // сохранение данных, введенных пользователем
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

editProfileForm.addEventListener('submit', editFormSubmitHandler);

// УПРАВЛЕНИЕ ПОПАПАМИ
// Открытие/закрытие попапов
const popupToggle = function (currentPopup) {
  currentPopup.classList.toggle('popup_opened');
};

// Cлушатели включения попапов

editButton.addEventListener('click', function () { // попап редактирования профиля
  popupToggle(popupEditProfile);
  setEditFormInputValue();
});

addPlaceButton.addEventListener('click', function () {
  popupToggle(popupAddPlace); // попап добавления фотографий мест
  setPlaceholder();
});

// Закрытие попапов - единое для всех
const closePopup = function (e) {
  if (e.target.classList.contains('popup_opened') || (e.target.classList.contains('popup__close-button')) || (e.target.classList.contains('form__button'))) {
    e.target.closest(".popup").classList.toggle('popup_opened');
  };
};

popups.addEventListener('click', closePopup);


// ДОБАВЛЕНИЕ КАРТОЧЕК ПОЛЬЗОВАТЕЛЕМ

const setPlaceholder = function () { //обнуляет значения, введенные пользователем при прошлом использовании popupAddPlace
  userPlaceName.value = '';
  userPlaceLink.value = '';
};

const createPlacesCards = function (arr) { // функция создания карточек из данных в массиве
  const placesCardTemplate = document.querySelector('.places-card-template').content;
  arr.forEach((el) => {
    const placesCardItem = placesCardTemplate.cloneNode(true);
    placesCardItem.querySelector('.places__image').src = el.link;
    placesCardItem.querySelector('.places__image').alt = el.name;
    placesCardItem.querySelector('.places__title').textContent = el.name;
    placesCardItem.querySelector('.places__like').addEventListener('click', (e) => likeToggle(e));
    placesCardItem.querySelector('.places__delete-button').addEventListener('click', (e) => deletePlaceCard(e));
    placesCardItem.querySelector('.places__image').addEventListener('click', (e) => popupPlacesToggle(e, el.name));

    places.prepend(placesCardItem);
  });
}

createPlacesCards(initialCards); //создание карточек "из коробки" при загрузке сайте

addPlaceForm.addEventListener('submit', function (e) { //создание карточек по введенным данным пользователя
  e.preventDefault();
  const link = userPlaceLink.value;
  const name = userPlaceName.value;
  createPlacesCards([{ link: link, name: name }]);
})

const likeToggle = (e) => e.target.classList.toggle('places__like_active'); // включение/выключение лайков при нажатии

const deletePlaceCard = (e) => e.target.parentElement.remove(); // удаление карточки при нажатии на "корзину"

const popupPlacesToggle = function(e, name) { // открытие popupSeeImage для нужной карточки
  popupToggle(popupSeeImage);
  popupSeeImage.querySelector('.popup__image').src = e.target.src;
  popupSeeImage.querySelector('.popup__image-caption').textContent = name;
};
