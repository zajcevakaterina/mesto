import Popup from './Popup.js';

export default class PopupWithCardDelete extends Popup {
  constructor(popupSelector, handleCardDelete) {
    super(popupSelector);
    this._handleCardDelete = handleCardDelete;
  }

  setSubmitListener(card, cardId) {
    const deleteForm = this._popup.querySelector('.form_type_delete-place');
    deleteForm.addEventListener('submit', () =>
    this._handleCardDelete(card, cardId));
  }
}
