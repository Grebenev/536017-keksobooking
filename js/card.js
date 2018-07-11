'use strict';

(function () {
  var CARD_QUANTITY = 8;
  var map = document.querySelector('.map');
  var template = document.querySelector('template');

  // СОЗДАЕМ ОБЪЕКТ CARD
  window.card = {

    createCard: function (obj) { // ------------------> CREATE

      var typeHomes = {
        palace: 'Дворец',
        flat: 'Квартира',
        house: 'Дом',
        bungalo: 'Бунгало'
      };

      var parentFeatures = template.content.querySelector('.popup__features');
      for (var i = 0; i < obj.offer.features.length; i++) {
        var createEl = document.createElement('li');
        createEl.className = 'popup__feature' + ' popup__feature--' + obj.offer.features[i];
        parentFeatures.appendChild(createEl);
      }

      // Функция очистки DOM
      var clearDom = function (classname) {
        var clear = template.content.querySelector(classname);
        clear.innerHTML = '';
      };
      clearDom('.popup__photos');
      clearDom('.popup__features');

      var parentPhotos = template.content.querySelector('.popup__photos');
      for (var j = 0; j < obj.offer.photos.length; j++) {
        var createElement = document.createElement('img');
        createElement.className = 'popup__photo';
        createElement.setAttribute('src', obj.offer.photos[j]);
        createElement.setAttribute('width', '45');
        createElement.setAttribute('height', '40');
        createElement.setAttribute('alt', 'Фотография жилья');
        parentPhotos.appendChild(createElement);
      }

      var cardTemplate = template.content.querySelector('.map__card');
      var cardElement = cardTemplate.cloneNode(true);
      cardElement.querySelector('.popup__avatar').src = obj.author.avatar;
      cardElement.querySelector('.popup__title').textContent = obj.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = obj.offer.address;
      cardElement.querySelector('.popup__text--price').textContent = obj.offer.price + ' ₽/ночь.';
      for (var key in typeHomes) {
        if (obj.offer.type === key) {
          cardElement.querySelector('.popup__type').textContent = typeHomes[key];
        }
      }
      cardElement.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
      cardElement.querySelector('.popup__text--time').textContent = 'заезд после ' + obj.offer.checkin + ' выезд до ' + obj.offer.checkout;
      cardElement.querySelector('.popup__description').textContent = obj.offer.description;
      return cardElement;
    },

    insertCard: function (obj) { // --------------------> INSERT
      window.card.removeCard();
      var filtersContainer = document.querySelector('.map__filters-container');
      var fragment = document.createDocumentFragment();
      fragment.appendChild(window.card.createCard(obj));
      map.insertBefore(fragment, filtersContainer);
    },

    removeCard: function () { // -------------------------> REMOVE
      var card = map.querySelector('.map__card');
      if (card) {
        map.removeChild(card);
      }
    }
  };

  map.addEventListener('click', function (evt) {
    if (evt.target.className === 'popup__close') {
      window.card.removeCard();
    }

    if (evt.target.dataset.id) {
      window.card.insertCard(window.createItems(CARD_QUANTITY)[evt.target.dataset.id]);

    } else if (evt.target.parentElement.dataset.id) {
      window.card.insertCard(window.createItems(CARD_QUANTITY)[evt.target.parentElement.dataset.id]);
    }
  });

  // Удаление карточки по Esc
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      window.card.removeCard();
    }
  });

})();
