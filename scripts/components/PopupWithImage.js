import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(e, name) {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', (e) => super._handleEscClose(e));
    this._popup.querySelector('.popup__image').src = e.target.src;
    this._popup.querySelector('.popup__image-caption').textContent = name;
  }
}
