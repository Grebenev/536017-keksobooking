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
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(createPin(array[i], i));
    }
    pins.appendChild(fragment);
  };

  window.insertPin = insertPin;
  window.dragAndDrop();
})();
