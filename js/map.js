'use strict';

var PIN_WHIDTH = 40;
var PIN_HEIGHT = 40;

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
  var mainItems = [];
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
    obj.offer.features = shuffleArray(featuresRealty.slice(getRandom(0, 0, featuresRealty)));
    obj.offer.description = '';
    obj.offer.photos = shuffleArray(photosRealty);
    mainItems.push(obj); // вставляет объекты в массив
  }
  return mainItems;
};

var mainItemsVarible = createItems(8);
var map = document.querySelector('.map');
map.classList.remove('map--faded');
var template = document.querySelector('template');
var pinTemplate = template.content.querySelector('.map__pin');
var pins = document.querySelector('.map__pins');

// Функция создания пинов
var createPin = function (mainItems) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = mainItems.location.x - PIN_WHIDTH / 2 + 'px';
  pinElement.style.top = mainItems.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = mainItems.author.avatar;
  pinElement.querySelector('img').alt = mainItems.offer.title;
  return pinElement;
};
var cardTemplate = template.content.querySelector('.map__card');
var parentFeatures = template.content.querySelector('.popup__features');
parentFeatures.innerHTML = '';

// Функция создания фич
var createFeatures = function (mainItems) {
  for (var i = 0; i < mainItems[0].offer.features.length; i++) {
    var createElement = document.createElement('li');
    createElement.className = 'popup__feature' + ' popup__feature--' + mainItems[0].offer.features[i];
    parentFeatures.appendChild(createElement);
  }
};
var parentPhotos = template.content.querySelector('.popup__photos');
parentPhotos.innerHTML = '';

// Функция фото
var insertPhotos = function (mainItems) {
  for (var i = 0; i < mainItems[0].offer.photos.length; i++) {
    var createElement = document.createElement('img');
    createElement.className = 'popup__photo';
    createElement.setAttribute('src', mainItems[0].offer.photos[i]);
    createElement.setAttribute('width', '45');
    createElement.setAttribute('height', '40');
    createElement.setAttribute('alt', 'Фотография жилья');
    parentPhotos.appendChild(createElement);
  }
};

// Функция создания карточки товара
var createCard = function (mainItems) {
  createFeatures(mainItemsVarible);
  insertPhotos(mainItemsVarible);
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = mainItems.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = mainItems.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = mainItems.offer.price + '/ночь.';
  for (var key in RealtyTypes) {
    if (mainItems.offer.type === key) {
      cardElement.querySelector('.popup__type').textContent = RealtyTypes[key];
    }
  }
  cardElement.querySelector('.popup__text--capacity').textContent = mainItems.offer.rooms + ' комнаты для ' + mainItems.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'заезд после ' + mainItems.offer.checkin + ' выезд до ' + mainItems.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = mainItems.offer.description;
  return cardElement;
};

// Функция вставки пинов на карту / на входе массив объектов
var insertPin = function (mainItems) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < mainItems.length; i++) {
    fragment.appendChild(createPin(mainItems[i]));
  }
  pins.appendChild(fragment);
};
var filtersContainer = document.querySelector('.map__filters-container');

// Функция вставки карточек
var insertCard = function (mainItems) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(createCard(mainItems[0]));
  map.insertBefore(fragment, filtersContainer);
};

insertPin(mainItemsVarible);
insertCard(mainItemsVarible);
