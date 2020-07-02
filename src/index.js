import './index.css';

import { initialCards } from '../scripts/utils/initialCardsData.js';
import {
  addPlaceForm,
  userPlaceName,
  userPlaceLink,
  editProfileForm,
  nameInput,
  jobInput,
  editButton,
  addPlaceButton,
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

const createCard = (placesData) => { // функция создания карточек
  const cardList = new Section({
    items: placesData,
    renderer: (item) => {
      const card = new Card(item, cardTemplateSelector,
        {
          handleCardClick: (e, name) => {
            popupSeeImage.open(e, name);
          }
        });
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    }
  }, placesContainerSelector);
  return cardList;
}

const addPlaceSubmit = ({ name, link }) => { //создание карточек по введенным данным пользователя
  const userPlaceData = [{ name, link }];
  createCard(userPlaceData).renderItems();
  popupAddPlace.close();
}

createCard(initialCards).renderItems(); //создание карточек при загрузке страницы

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
