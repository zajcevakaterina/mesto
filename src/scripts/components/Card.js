export default class Card {
  constructor(el, cardSelector, { handleCardClick }) {
    this._name = el.name;
    this._link = el.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.places__card')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.places__like').addEventListener('click', () => this._likeToggle());
    this._element.querySelector('.places__delete-button').addEventListener('click', () => this._deletePlaceCard());
    this._cardImage.addEventListener('click', (e) => this._handleCardClick(this._name, this._link));
  }

  _likeToggle() {
    this._element.querySelector('.places__like').classList.toggle('places__like_active'); // включение/выключение лайков при нажатии
  }

  _deletePlaceCard() {
    this._element.remove(); // удаление карточки при нажатии на "корзину"
    this._element = null;
  }

  generateCard() { // создание карточки из шаблона и наполнение содержимым
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.places__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = `Фотография места под названием ${this._name}`;
    this._element.querySelector('.places__title').textContent = this._name;
    this._setEventListeners();

    return this._element;
  }
}
