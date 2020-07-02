import Popup from './Popup.js';
import { popups, formValidationOptions } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, form, submitForm) {
    super(popupSelector);
    this._form = form;
    this._submitForm = submitForm;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(formValidationOptions.inputSelector);
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    popups.addEventListener('click', (e) => {
      if ((e.target.classList.contains('popup_opened')) || (e.target.classList.contains('popup__close-button'))) {
        this.close()
      }
    }
    );
    this._form.addEventListener('submit', () => {
      const inputValues = this._getInputValues();
      this._submitForm(inputValues)
    });
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (e) => this._handleEscClose(e));
    this._form.reset();
  }
}
