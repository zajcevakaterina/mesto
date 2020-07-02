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

// Контейнер попапов
export const popups = document.querySelector('.popups');

// Селекторы для валидации форм
export const formValidationOptions = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
}

// Прочие селекторы
export const cardTemplateSelector = '.places-card-template';
export const profileNameSelector = '.profile__name';
export const profileJobSelector = '.profile__subtitle';
export const placesContainerSelector = '.places';
export const popupEditProfileSelector = '.popup_type_edit-profile';
export const popupAddPlaceSelector = '.popup_type_add-place';
export const popupSeeImageSelector = '.popup_type_see-image';
