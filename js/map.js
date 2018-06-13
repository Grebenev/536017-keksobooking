'use strict';

var titleRelty = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var typeRealty = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var checkRealty = [
  '12:00',
  '13:00',
  '14:00'
];

var featuresRealty = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var photosRealty = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];


var getRandom = function (min, max, array) {
  return (min || max) ? Math.floor(Math.random() * (max - min + 1)) + min : Math.floor(Math.random() * array.length);
};

var Massive = [];

var createItems = function (numbers) {


  for (var i = 0; i < numbers; i++) {
    var obj = {};
    obj.author = {};
    obj.offer = {};
    obj.location = {};

    obj.author.avatar = 'img/avatars/user0' + (i + 1) + '.png';

    obj.location.x = getRandom(300, 900, 0);
    obj.location.y = getRandom(130, 630, 0);

    obj.offer.title = titleRelty[i];
    obj.offer.address = obj.location.x + ', ' + obj.location.y;
    obj.offer.price = getRandom(1000, 1000000, 0);
    obj.offer.type = typeRealty[getRandom(0, 0, typeRealty)];
    obj.offer.rooms = getRandom(1, 5, 0);
    obj.offer.guests = getRandom(1, 10, 0);
    obj.offer.checkin = checkRealty[getRandom(0, 0, checkRealty)];
    obj.offer.checkout = checkRealty[getRandom(0, 0, checkRealty)];
    obj.offer.features = featuresRealty[getRandom(0, 0, featuresRealty)];
    obj.offer.description = '';
    obj.offer.photos = photosRealty[getRandom(0, 0, photosRealty)];


    Massive.push(obj);
  }

  return Massive;
};


document.querySelector('.map').classList.remove('map--faded');

var pinsTo = document.querySelector('.map__pins'); // найденый div куда вставлять pins
// var cardBefore = document.querySelector('.map__filters-container'); // найденый перед div вставлять карточку

var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
// var cardTemplate = document.querySelector('template').content.querySelector('.map__card');

var renderPin = function (massive) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = massive.location.x - 40 / 2 + 'px';
  pinElement.style.top = massive.location.y - 40 + 'px';
  pinElement.querySelector('img').src = massive.author.avatar;
  pinElement.querySelector('img').alt = massive.offer.title;

  return pinElement;
};

// var renderCard = function (massive) {
//   var cardElement = cardTemplate.cloneNode(true);
//   cardElement.querySelector('.popup__title').textContent = massive.offer.title;
//   cardElement.querySelector('.popup__text--address').textContent = massive.offer.address;
//   cardElement.querySelector('.popup__text--price').textContent = massive.offer.price;
//   cardElement.querySelector('.popup__type').textContent = massive.offer.type;
//
//   return cardElement;
// }


function insertPin() {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < Massive.length; i++) {
    fragment.appendChild(renderPin(Massive[i]));
  }
  pinsTo.appendChild(fragment);
}


createItems(8);
insertPin();
