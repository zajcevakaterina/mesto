import './index.css';

import {
  formValidationOptions,
  cardTemplateSelector,
  profileNameSelector,
  profileJobSelector,
  profileAvatarSelector,
  placesContainerSelector,
  popupEditProfileSelector,
  popupEditAvatarSelector,
  popupAddPlaceSelector,
  popupDeletePlaceSelector,
  popupSeeImageSelector,
} from '../scripts/utils/constants.js';

import Api from '../scripts/components/Api.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithCardDelete from '../scripts/components/PopupWithCardDelete.js';

// Форма добавление карточки места пользователем
const addPlaceForm = document.querySelector('.form_type_add-place');
const userPlaceName = addPlaceForm.querySelector('.form__item_el_place-name');
const userPlaceLink = addPlaceForm.querySelector('.form__item_el_place-link');

// Форма редактирования профайла и инпуты
const editProfileForm = document.querySelector('.form_type_edit-profile');
const nameInput = editProfileForm.querySelector('.form__item_el_name');
const jobInput = editProfileForm.querySelector('.form__item_el_job');

// Форма редактирования аватара
const editAvatarForm = document.querySelector('.form_type_edit-avatar');

// Форма удаления карточки с местом
const deletePlaceForm = document.querySelector('.form_type_delete-place');

// Кнопки для открытия попапов с формами
const editButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');
const editAvatarButton = document.querySelector('.profile__edit-avatar-button');

// Кнопки сабмита форм
const popups = document.querySelector('.popups');
const editProfileSubmitButton = popups.querySelector('.form__button_type_edit-profile');
const editAvatarSubmitButton = popups.querySelector('.form__button_type_edit-avatar');
const addPlaceSubmitButton = popups.querySelector('.form__button_type_add-place');
const deletePlaceSubmitButton = popups.querySelector('.form__button_type_delete-place');

// Конфиг для API
const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: 'ac8eea58-1ab3-4780-8fbf-f684bd9ab1b3',
    'Content-Type': 'application/json'
  }
};

const api = new Api(config);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(res => {

    const userInfo = res[0];
    const user = new UserInfo({ userName: profileNameSelector, userJob: profileJobSelector, userAvatar: profileAvatarSelector, userId: userInfo._id });

    user.setUserInfo(userInfo.name, userInfo.about);
    user.setUserAvatar(userInfo.avatar);

    const userId = user.getUserId();

    function renderLoading(isLoading, buttonEl, buttonText) {
      if (buttonEl) {
        isLoading ? buttonEl.textContent = 'Сохранение' : buttonEl.textContent = buttonText;
      }
    }

    // РЕДАКТИРОВАНИЕ ПРОФАЙЛА
    const editFormSubmitHandler = ({ name, job }) => { // сохранение данных, введенных пользователем
      renderLoading(true, editProfileSubmitButton);

      api.setUserInfo(name, job)
        .then(res => {
          user.setUserInfo(res.name, res.about);
        })
        .catch(err => console.error(err))
        .finally(() => {
          renderLoading(false, editProfileSubmitButton, 'Сохранить');
          popupEditProfile.close();
        });
    }

    const setEditFormInputValue = ({ name, job }) => { // установка начальных данных в форме
      nameInput.value = name;
      jobInput.value = job;
    }

    const editAvatarSubmit = (inputValues) => {
      renderLoading(true, editAvatarSubmitButton);

      api.setUserAvatar(inputValues.link)
        .then(res => {
          user.setUserAvatar(res.avatar);
        })
        .catch(err => console.error(err))
        .finally(() => {
          renderLoading(false, editAvatarSubmitButton, 'Сохранить');
          popupEditAvatar.close();
        });
    }

    const handleCardClick = (name, link) => {
      popupSeeImage.open(name, link);
    }

    const createCardItem = (cardData, cardTemplateSelector, checkDeletion, ownership) => {
      const card = new Card(cardData, cardTemplateSelector,
        {
          handleCardClick: handleCardClick,
          handleLikeClick: (likes, cardId) => {
            if (likes.some(like => like._id === userId)) {
              api.deleteLike(cardId)
                .then(res => card.updateLikes(res.likes))
                .catch(err => console.error(err))
            } else {
              api.addLike(cardId)
                .then(res => card.updateLikes(res.likes))
                .catch(err => console.error(err))
            }
          },
          handleCheckDeletion: checkDeletion
        }, ownership);
      const cardElement = card.generateCard(userId);
      return cardElement;
    }

    const createCardWithOwnerCheck = (cardData) => { // создание конкретного экземпляра карточки

      if (cardData.owner._id === userId) {
        return createCardItem(cardData, cardTemplateSelector,
          function handleCheckDeletion(card, cardId) {
            popupDeletePlace.open();
            popupDeletePlace.setSubmitListener(card, cardId);
          }, true)
      }
      else {
        return createCardItem(cardData, cardTemplateSelector, null, false)
      }
    }

    const items = res[1];

    const cardList = new Section({ // создание одного экземпляра класса section
      items: items.reverse(),
      renderer: (item) => {
        const card = createCardWithOwnerCheck(item);
        cardList.addItem(card);
      }
    }, placesContainerSelector)

    cardList.renderItems();

    const addPlaceSubmit = ({ name, link }) => { //создание карточек по введенным данным пользователя
      renderLoading(true, addPlaceSubmitButton);

      api.addCard(name, link)
        .then(info => {
          const card = createCardWithOwnerCheck(info);
          cardList.addItem(card);
        })
        .catch(err => console.log(err))
        .finally(() => {
          renderLoading(false, addPlaceSubmitButton, 'Создать');
          popupAddPlace.close();
        });
    }

    const deleteCardSubmit = (card, cardId) => { // удаление карточки
      renderLoading(true, deletePlaceSubmitButton);
      api.deleteCard(cardId)
        .then(res => {
          card.remove();
        })
        .catch(err => console.log(err))
        .finally(() => {
          renderLoading(false, deletePlaceSubmitButton, 'Да');
          popupDeletePlace.close();
        });
    };

    const setPlaceholder = () => { //обнуляет значения, введенные пользователем при прошлом использовании popupAddPlace
      userPlaceName.value = '';
      userPlaceLink.value = '';
    };

    // УПРАВЛЕНИЕ ПОПАПАМИ
    // Создание экземпляров попапов всех видов
    const popupEditProfile = new PopupWithForm(popupEditProfileSelector, editProfileForm, editFormSubmitHandler);
    popupEditProfile.setEventListeners();

    const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector, editAvatarForm, editAvatarSubmit);
    popupEditAvatar.setEventListeners();

    const popupAddPlace = new PopupWithForm(popupAddPlaceSelector, addPlaceForm, addPlaceSubmit);
    popupAddPlace.setEventListeners();

    const popupDeletePlace = new PopupWithCardDelete(popupDeletePlaceSelector, deleteCardSubmit);
    popupDeletePlace.setEventListeners();

    const popupSeeImage = new PopupWithImage(popupSeeImageSelector);
    popupSeeImage.setEventListeners();

    // Cлушатели включения попапов

    editButton.addEventListener('click', () => { // попап редактирования профиля
      popupEditProfile.open();
      setEditFormInputValue(user.getUserInfo());
      editProfileValidator.formInitialCheck();
    });

    editAvatarButton.addEventListener('click', () => { // попап редактирования аватара
      popupEditAvatar.open();
    });

    addPlaceButton.addEventListener('click', () => { // попап добавления фотографий мест
      popupAddPlace.open();
      setPlaceholder();
      addPlaceValidator.formInitialCheck();
    });

    // Создание валидаторов для каждой из форм
    const editProfileValidator = new FormValidator(formValidationOptions, editProfileForm);
    const editAvatarValidator = new FormValidator(formValidationOptions, editAvatarForm);
    const addPlaceValidator = new FormValidator(formValidationOptions, addPlaceForm);
    const deletePlaceValidator = new FormValidator(formValidationOptions, deletePlaceForm);
    // Хотя в форме нет полей, благодаря валидации отменяется дефолтное поведение браузера при отправке формы

    // Запуск валидации форм
    editProfileValidator.enableValidation();
    editAvatarValidator.enableValidation();
    addPlaceValidator.enableValidation();
    deletePlaceValidator.enableValidation();
  })

