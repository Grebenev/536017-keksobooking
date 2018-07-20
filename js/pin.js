'use strict';

(function () {
  var pins = document.querySelector('.map__pins');

  var createPin = function (array, id) {
    var pinTemplate = window.variables.template.content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = array.location.x - window.variables.PIN_WHIDTH / 2 + 'px';
    pinElement.style.top = array.location.y - window.variables.PIN_HEIGHT + 'px';
    pinElement.dataset.id = id;
    pinElement.querySelector('img').src = array.author.avatar;
    pinElement.querySelector('img').alt = array.offer.title;

    return pinElement;
  };

  var insertPin = function (array) {
    var fragment = document.createDocumentFragment();
    array.forEach(function (element, index) {
      fragment.appendChild(createPin(element, index));
    });
    pins.appendChild(fragment);
  };

  var removePin = function () {
    var mapPins = window.variables.map.querySelectorAll('.map__pin');
    for (var i = 1; i < mapPins.length; i++) {
      mapPins[i].parentNode.removeChild(mapPins[i]);
    }
  };

  var onClickPin = function (evt) {
    if (evt.target.className === 'popup__close') {
      window.card.removeCard();
    }
    if (evt.target.dataset.id) {
      window.card.insertCard(window.filterResult()[evt.target.dataset.id]);
      window.variables.map.querySelector('[data-id = "' + evt.target.dataset.id + '"]').classList.add('map__pin--active');

    } else if (evt.target.parentElement.dataset.id) {
      window.card.insertCard(window.filterResult()[evt.target.parentElement.dataset.id]);
      window.variables.map.querySelector('[data-id = "' + evt.target.parentElement.dataset.id + '"]').classList.add('map__pin--active');
    }
  };

  window.pin = {
    insertPin: insertPin,
    removePin: removePin,
    onClickPin: onClickPin
  };
  window.dragAndDrop();
})();
