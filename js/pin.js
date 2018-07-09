'use strict';

(function () {
  var PIN_WHIDTH = 50;
  var PIN_HEIGHT = 70;

  window.pin = {
    createPin: function (array, id) { // -------------CREATE PIN
      var pinTemplate = window.template.content.querySelector('.map__pin');
      var pinElement = pinTemplate.cloneNode(true);
      pinElement.style.left = array.location.x - PIN_WHIDTH / 2 + 'px';
      pinElement.style.top = array.location.y - PIN_HEIGHT + 'px';
      pinElement.dataset.id = id;
      pinElement.querySelector('img').src = array.author.avatar;
      pinElement.querySelector('img').alt = array.offer.title;

      return pinElement;
    },

    insertPin: function (array) { // -----------------INSERT PIN
      var pins = document.querySelector('.map__pins');
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < array.length; i++) {
        fragment.appendChild(window.pin.createPin(array[i], i));
      }
      pins.appendChild(fragment);
    }
  };

})();
