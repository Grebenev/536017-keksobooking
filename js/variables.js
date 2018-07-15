'use strict';
(function () {
  var PIN_WHIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAIN_PIN_WIDTH = 64;
  var MAIN_PIN_HEIGHT = 80;
  var map = document.querySelector('.map');
  var forms = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');
  var template = document.querySelector('template');

  window.variables = {
    map: map,
    forms: forms,
    mainPin: mainPin,
    template: template,
    PIN_WHIDTH: PIN_WHIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT

  };

})();