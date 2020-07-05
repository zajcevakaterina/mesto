import './index.css';

import { initialCards } from '../scripts/utils/initialCardsData.js';
import {
  formValidationOptions,
  cardTemplateSelector,
  profileNameSelector,
  profileJobSelector,
  placesContainerSelector,
  popupEditProfileSelector,
  popupAddPlaceSelector,
  popupSeeImageSelector
} from '../scripts/utils/constants.js';

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

// Форма добавление карточки места пользователем
export const addPlaceForm = document.querySelector('.form_type_add-place');
export const userPlaceName = addPlaceForm.querySelector('.form__item_el_place-name');
export const userPlaceLink = addPlaceForm.querySelector('.form__item_el_place-link');

// Форма редактирования профайла и инпуты
export const editProfileForm = document.querySelector('.form_type_edit-profile');
export const nameInput = editProfileForm.querySelector('.form__item_el_name');
export const jobInput = editProfileForm.querySelector('.form__item_el_job');

// Кнопки для открытия попапов с формой
export const editButton = document.querySelector('.profile__edit-button');
export const addPlaceButton = document.querySelector('.profile__add-button');

// РЕДАКТИРОВАНИЕ ПРОФАЙЛА
const setEditFormInputValue = ({ name, job }) => { // установка начальных данных в форме
  nameInput.value = name;
  jobInput.value = job;
}

const editFormSubmitHandler = ({ name, job }) => { // сохранение данных, введенных пользователем
  userInfo.setUserInfo(name, job);
  popupEditProfile.close();
}

// Создание экземпляра класса с информацией о пользователе
const userInfo = new UserInfo({ userName: profileNameSelector, userJob: profileJobSelector });

// СОЗДАНИЕ КАРТОЧЕК

const createCard = (cardData) => { // создание конкретного экземпляра карточки
  const card = new Card(cardData, cardTemplateSelector,
    {
      handleCardClick: (name, link) => {
        popupSeeImage.open(name, link);
      }
    });
  const cardElement = card.generateCard();
  return cardElement;
}

const initialCardList = new Section({ // создание одного экземпляра класса section
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    initialCardList.addItem(card);
  }
}, placesContainerSelector);

initialCardList.renderItems(); // создание первоначальных карточек

const addPlaceSubmit = ({ name, link }) => { //создание карточек по введенным данным пользователя
  const card = createCard({ name, link });
  initialCardList.addItem(card);
  popupAddPlace.close();
}

// УПРАВЛЕНИЕ ПОПАПАМИ
// Создание экземпляров попапов всех видов

const popupEditProfile = new PopupWithForm(popupEditProfileSelector, editProfileForm, editFormSubmitHandler);
popupEditProfile.setEventListeners();

const popupAddPlace = new PopupWithForm(popupAddPlaceSelector, addPlaceForm, addPlaceSubmit);
popupAddPlace.setEventListeners();

const popupSeeImage = new PopupWithImage(popupSeeImageSelector);
popupSeeImage.setEventListeners();

const setPlaceholder = () => { //обнуляет значения, введенные пользователем при прошлом использовании popupAddPlace
  userPlaceName.value = '';
  userPlaceLink.value = '';
};

// Cлушатели включения попапов

editButton.addEventListener('click', () => { // попап редактирования профиля
  popupEditProfile.open();
  setEditFormInputValue(userInfo.getUserInfo());
  editProfileValidator.formInitialCheck();
});

addPlaceButton.addEventListener('click', () => { // попап добавления фотографий мест
  popupAddPlace.open();
  setPlaceholder();
  addPlaceValidator.formInitialCheck();
});

// Создание валидаторов для каждой из форм
const editProfileValidator = new FormValidator(formValidationOptions, editProfileForm);
const addPlaceValidator = new FormValidator(formValidationOptions, addPlaceForm);

// Запуск валидации форм
editProfileValidator.enableValidation();
addPlaceValidator.enableValidation();
