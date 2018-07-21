'use strict';

(function () {
  var createElementFeatures = function (object) {
    var parentFeature = window.variables.template.content.querySelector('.popup__features');
    object.offer.features.forEach(function (element) {
      var createElement = document.createElement('li');
      createElement.className = 'popup__feature' + ' popup__feature--' + element;
      parentFeature.appendChild(createElement);
    });
  };

  var creteElementPhotos = function (object) {
    var parentPhotos = window.variables.template.content.querySelector('.popup__photos');
    object.offer.photos.forEach(function (element) {
      var createElement = document.createElement('img');
      createElement.src = element;
      createElement.style.width = '45px';
      createElement.style.height = '40px';
      createElement.alt = 'Фотография жилья';
      createElement.className = 'popup__photo';
      parentPhotos.appendChild(createElement);
    });
  };

  var createCard = function (object) {
    var typeHomes = {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    };

    var clearDom = function (className) {
      var clearance = window.variables.template.content.querySelector(className);
      clearance.innerHTML = '';
    };
    clearDom('.popup__photos');
    clearDom('.popup__features');

    createElementFeatures(object);
    creteElementPhotos(object);

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

  var onPressEsc = function (evt) {
    if (evt.keyCode === window.variables.ESC_KEYCODE) {
      removeCard();
    }
  };

  document.addEventListener('keydown', onPressEsc);

  window.card = {
    removeCard: removeCard,
    insertCard: insertCard
  };
})();
