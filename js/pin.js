'use strict';

(function () {
  var PIN_WHIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAIN_PIN_WIDTH = 64;
  var MAIN_PIN_HEIGHT = 80;
  var map = document.querySelector('.map');
  var template = document.querySelector('template');
  var mainPin = document.querySelector('.map__pin--main');
  var pins = document.querySelector('.map__pins');

  window.pin = {
    createPin: function (array, id) { // -------------CREATE PIN
      var pinTemplate = template.content.querySelector('.map__pin');
      var pinElement = pinTemplate.cloneNode(true);
      pinElement.style.left = array.location.x - PIN_WHIDTH / 2 + 'px';
      pinElement.style.top = array.location.y - PIN_HEIGHT + 'px';
      pinElement.dataset.id = id;
      pinElement.querySelector('img').src = array.author.avatar;
      pinElement.querySelector('img').alt = array.offer.title;

      return pinElement;
    },

    insertPin: function (array) { // -----------------INSERT PIN
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < array.length; i++) {
        fragment.appendChild(window.pin.createPin(array[i], i));
      }
      pins.appendChild(fragment);
    },

  };

  // ----------------------- MOVE PIN
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();


    window.form.active();
    window.form.setAddress(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2, mainPin.offsetTop + MAIN_PIN_HEIGHT);

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinTopStart = 130 - MAIN_PIN_HEIGHT - 1;
      var pinTopEnd = 630 - MAIN_PIN_HEIGHT + 1;
      var pinLeftStart = 0;
      var pinLeftEnd = map.offsetWidth - MAIN_PIN_WIDTH;

      if ((mainPin.offsetTop - shift.y > pinTopStart) && (mainPin.offsetTop - shift.y < pinTopEnd)) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

      if ((mainPin.offsetLeft - shift.x > pinLeftStart) && mainPin.offsetLeft - shift.x < pinLeftEnd) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

      window.form.setAddress(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2, mainPin.offsetTop + MAIN_PIN_HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      pins.removeEventListener('mousemove', onMouseMove);
      pins.removeEventListener('mouseup', onMouseUp);
    };

    pins.addEventListener('mousemove', onMouseMove);
    pins.addEventListener('mouseup', onMouseUp);

  });
})();
