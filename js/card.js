'use strict';

(function () {
  var createItemList = function (object) {
    var parentFeature = window.variables.template.content.querySelector('.popup__features');
    object.offer.features.forEach(function (element) {
      var listItem = document.createElement('li');
      listItem.className = 'popup__feature' + ' popup__feature--' + element;
      parentFeature.appendChild(listItem);
    });
  };

  var createImageList = function (object) {
    var parentPhoto = window.variables.template.content.querySelector('.popup__photos');
    object.offer.photos.forEach(function (element) {
      var image = document.createElement('img');
      image.src = element;
      image.style.width = '45px';
      image.style.height = '40px';
      image.alt = 'Фотография жилья';
      image.className = 'popup__photo';
      parentPhoto.appendChild(image);
    });
  };

  var checkContent = function (data, elementClassName) {
    var result = document.querySelector(elementClassName);

    if (!data.length) {
      result.classList.add('hidden');
    }
  };

  var createCard = function (object) {
    var typeHomes = {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    };

    var clearDom = function (elementClassName) {
      var elementToRemove = window.variables.template.content.querySelector(elementClassName);
      elementToRemove.innerHTML = '';
    };
    clearDom('.popup__photos');
    clearDom('.popup__features');

    createItemList(object);
    createImageList(object);

    var cardTemplate = window.variables.template.content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__avatar').src = object.author.avatar;
    cardElement.querySelector('.popup__title').textContent = object.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = object.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = object.offer.price + ' ₽/ночь.';

    if (typeHomes[object.offer.type]) {
      cardElement.querySelector('.popup__type').textContent = typeHomes[object.offer.type];
    }
    cardElement.querySelector('.popup__text--capacity').textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'заезд после ' + object.offer.checkin + ' выезд до ' + object.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = object.offer.description;
    return cardElement;
  };

  var insertCard = function (object) {
    removeCard();
    var filtersContainer = document.querySelector('.map__filters-container');
    var fragment = document.createDocumentFragment();
    fragment.appendChild(createCard(object));

    window.variables.map.insertBefore(fragment, filtersContainer);

    checkContent(object.offer.features, '.popup__features');
    checkContent(object.offer.photos, '.popup__photos');

    window.variables.map.addEventListener('keydown', onEscPress);
    window.variables.map.querySelector('.popup__close').addEventListener('click', onButtonCloseClick);
  };

  var onButtonCloseClick = function () {
    removeCard();
    window.variables.map.removeEventListener('click', onButtonCloseClick);
  };

  var removeCard = function () {
    var card = window.variables.map.querySelector('.map__card');
    if (card) {

      var cardActive = window.variables.map.querySelector('.map__pin--active');
      if (cardActive) {
        cardActive.classList.remove('map__pin--active');
      }
      window.variables.map.removeChild(card);
    }
  };

  var onEscPress = function (evt) {
    if (evt.keyCode === window.variables.ESC_KEYCODE) {
      removeCard();
      window.variables.map.removeEventListener('keydown', onEscPress);
    }
  };

  window.card = {
    removeCard: removeCard,
    insertCard: insertCard
  };
})();
