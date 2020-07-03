import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    super.open();
    this._image = this._popup.querySelector('.popup__image');
    this._image.src = link;
    this._image.alt = `Фотография места под названием ${name}`;
    this._popup.querySelector('.popup__image-caption').textContent = name;
  }
}
