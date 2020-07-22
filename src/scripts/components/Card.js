export default class Card {
  constructor(el, cardSelector, { handleCardClick, handleLikeClick, handleCheckDeletion }, ownership) {
    this._name = el.name;
    this._link = el.link;
    this._id = el._id;
    this._likes = el.likes;
    this._likesNumber = this._likes.length;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleCheckDeletion = handleCheckDeletion;
    this._ownership = ownership;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.places__card')
      .cloneNode(true);

    if (this._ownership) {
      cardElement.querySelector('.places__delete-button').classList.add('places__delete-button_active');
    }
    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.places__like').addEventListener('click', () => {
      this._handleLikeClick(this._likes, this._id);
      this._likeToggle()
    });
    if (this._ownership) {
      this._element.querySelector('.places__delete-button').addEventListener('click', () => this._handleCheckDeletion(this._element, this._id));
    }
    this._cardImage.addEventListener('click', (e) => this._handleCardClick(this._name, this._link));
  }

  _likeToggle() {
    this._element.querySelector('.places__like').classList.toggle('places__like_active'); // включение/выключение лайков при нажатии
  }

  generateCard(userId) { // создание карточки из шаблона и наполнение содержимым
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.places__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = `Фотография места под названием ${this._name}`;
    this._element.querySelector('.places__title').textContent = this._name;
    if (this._likes.some(like => like._id === userId)) {
      this._likeToggle();
    }
    this._likesOnPage = this._element.querySelector('.places__like-amount');
    this._likesOnPage.textContent = this._likesNumber;
    this._setEventListeners();

    return this._element;
  }

  updateLikes(likes) {
    this._likes = likes;
    this._likesNumber = this._likes.length;
    this._likesOnPage.textContent = this._likesNumber;
  }
}
