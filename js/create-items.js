'use strict';

// ГЛОБАЛЬНЫЕ
window.CARD_QUANTITY = 8;
window.template = document.querySelector('template');
window.map = document.querySelector('.map');
window.mainPin = document.querySelector('.map__pin--main');
window.MAIN_PIN_WIDTH = 64;
window.MAIN_PIN_HEIGHT = 80;

(function () {

  var titles = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var types = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var checks = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  //  Функция случайных чисел, от min до max  или от длинны массива
  var getRandom = function (min, max, array) {
    return (min || max) ? Math.floor(Math.random() * (max - min + 1)) + min : Math.floor(Math.random() * array.length);
  };

  // Функция перемешивания
  var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  // Функция создания главного массива объектов, принимает на вход число, отдает массив объектов
  window.createItems = function (number) {
    var mainItems = [];
    for (var i = 0; i < number; i++) {
      var obj = {};
      obj.author = {};
      obj.offer = {};
      obj.location = {};
      obj.author.avatar = 'img/avatars/user0' + (i + 1) + '.png';
      obj.location.x = getRandom(300, 900, 0);
      obj.location.y = getRandom(130, 630, 0);
      obj.offer.title = titles[i];
      obj.offer.address = obj.location.x + ', ' + obj.location.y;
      obj.offer.price = getRandom(1000, 1000000, 0);
      obj.offer.type = types[getRandom(0, 0, types)];
      obj.offer.rooms = getRandom(1, 5, 0);
      obj.offer.guests = getRandom(1, 10, 0);
      obj.offer.checkin = checks[getRandom(0, 0, checks)];
      obj.offer.checkout = checks[getRandom(0, 0, checks)];
      obj.offer.features = shuffleArray(features.slice(getRandom(0, 0, features)));
      obj.offer.description = '';
      obj.offer.photos = shuffleArray(photos);
      mainItems.push(obj); // вставляет объекты в массив
    }
    return mainItems;
  };
})();
