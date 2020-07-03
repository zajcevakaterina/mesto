import Popup from './Popup.js';
/* убрала импорт объекта с селекторами, так как импорт, насколько я поняла,
не умеет брать конкретное свойство (например, formValidationOptions.inputSelector) */

export default class PopupWithForm extends Popup {
  constructor(popupSelector, form, submitForm) {
    super(popupSelector);
    this._form = form;
    this._submitForm = submitForm;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.form__item');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      const inputValues = this._getInputValues();
      this._submitForm(inputValues)
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
