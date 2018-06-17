'use strict';

var PIC_WHIDTH = 40;
var PIC_HEIGHT = 40;

var titleRealty = [
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

var RealtyTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

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

//  Функция случайных чисел, от минимального до максимального /min, max/ или от длинны массива /array/
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
var createItems = function (numbers) {
  var mainTtems = [];
  for (var i = 0; i < numbers; i++) {
    var obj = {};
    obj.author = {};
    obj.offer = {};
    obj.location = {};
    obj.author.avatar = 'img/avatars/user0' + (i + 1) + '.png';
    obj.location.x = getRandom(300, 900, 0);
    obj.location.y = getRandom(130, 630, 0);
    obj.offer.title = titleRealty[getRandom(0, 0, titleRealty)];
    obj.offer.address = obj.location.x + ', ' + obj.location.y;
    obj.offer.price = getRandom(1000, 1000000, 0);
    obj.offer.type = typeRealty[getRandom(0, 0, typeRealty)];
    obj.offer.rooms = getRandom(1, 5, 0);
    obj.offer.guests = getRandom(1, 10, 0);
    obj.offer.checkin = checkRealty[getRandom(0, 0, checkRealty)];
    obj.offer.checkout = checkRealty[getRandom(0, 0, checkRealty)];
    obj.offer.features = shuffleArray(featuresRealty);
    obj.offer.description = '';
    obj.offer.photos = shuffleArray(photosRealty);
    mainTtems.push(obj); // вставляет объекты в массив
  }
  return mainTtems;
};

var mainTtemsVarible = createItems(8);
var map = document.querySelector('.map');
map.classList.remove('map--faded');
var template = document.querySelector('template');
var pinTemplate = template.content.querySelector('.map__pin');
var pins = document.querySelector('.map__pins');

// Функция создания пинов
var createPin = function (mainTtems) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = mainTtems.location.x - PIC_WHIDTH / 2 + 'px';
  pinElement.style.top = mainTtems.location.y - PIC_HEIGHT + 'px';
  pinElement.querySelector('img').src = mainTtems.author.avatar;
  pinElement.querySelector('img').alt = mainTtems.offer.title;
  return pinElement;
};
var cardTemplate = template.content.querySelector('.map__card');

// Функция создания карточки товара
var createCard = function (mainTtems) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = mainTtems.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = mainTtems.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = mainTtems.offer.price + '/ночь.';
  for (var key in RealtyTypes) {
    if (mainTtems.offer.type === key) {
      cardElement.querySelector('.popup__type').textContent = RealtyTypes[key];
    }
  }
  cardElement.querySelector('.popup__text--capacity').textContent = mainTtems.offer.rooms + ' комнаты для ' + mainTtems.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'заезд после ' + mainTtems.offer.checkin + ' выезд до ' + mainTtems.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = mainTtems.offer.description;
  return cardElement;
};

var parentFeatures = template.content.querySelector('.popup__features');
parentFeatures.innerHTML = '';

// Функция создания фич
var createFeatures = function (FearuresArray) {
  for (var i = 0; i < getRandom(0, 0, FearuresArray); i++) {
    var createElement = document.createElement('li');
    createElement.className = 'popup__feature' + ' popup__feature--' + FearuresArray[i];
    parentFeatures.appendChild(createElement);
  }
};

var parentPhotos = template.content.querySelector('.popup__photos');
parentPhotos.innerHTML = '';

// Функция фото
var insertPhotos = function (photosArray) {
  for (var i = 0; i < photosArray.length; i++) {
    var createElement = document.createElement('img');
    createElement.className = 'popup__photo';
    createElement.setAttribute('src', photosArray[i]);
    createElement.setAttribute('width', '45');
    createElement.setAttribute('height', '40');
    createElement.setAttribute('alt', 'Фотография жилья');
    parentPhotos.appendChild(createElement);
  }
};

// Функция вставки пинов на карту / на входе массив объектов
var insertPin = function (mainTtems) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < mainTtems.length; i++) {
    fragment.appendChild(createPin(mainTtems[i]));
  }
  pins.appendChild(fragment);
};

var filtersContainer = document.querySelector('.map__filters-container'); // перед ним будет вставка каточек

// Функция вставки карточек
var insertCard = function (mainTtems) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(createCard(mainTtems[0]));
  map.insertBefore(fragment, filtersContainer);
};


createFeatures(shuffleArray(featuresRealty));
insertPhotos(shuffleArray(photosRealty));
insertPin(mainTtemsVarible);
insertCard(mainTtemsVarible);
