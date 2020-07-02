import { popups } from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    popups.addEventListener('click', (e) => {
      if ((e.target.classList.contains('popup_opened')) || (e.target.classList.contains('popup__close-button'))) {
        this.close()
      }
    })
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', (e) => this._handleEscClose(e));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (e) => this._handleEscClose(e));
  }
}
