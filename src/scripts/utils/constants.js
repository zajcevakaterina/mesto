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
export const profileAvatarSelector = '.profile__avatar';
export const placesContainerSelector = '.places';
export const popupEditProfileSelector = '.popup_type_edit-profile';
export const popupEditAvatarSelector = '.popup_type_edit-avatar';
export const popupAddPlaceSelector = '.popup_type_add-place';
export const popupDeletePlaceSelector = '.popup_type_delete-place';
export const popupSeeImageSelector = '.popup_type_see-image';
