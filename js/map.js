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

//  Функция случайных чисел, от минимального до максимального /min, max/ или от длинны массива /array/
var getRandom = function (min, max, array) {
  return (min || max) ? Math.floor(Math.random() * (max - min + 1)) + min : Math.floor(Math.random() * array.length);
};


// Функция создания массива объектов, принимает на вход число, отдает массив объектов
var createItems = function (numbers) {

  var massive = []; // создает массив для объектов

  for (var i = 0; i < numbers; i++) { // запускает цикл от количества на входе функции
    var obj = {}; // создает основной объект
    obj.author = {}; // создает подобъект author
    obj.offer = {};
    obj.location = {};

    obj.author.avatar = 'img/avatars/user0' + (i + 1) + '.png';

    obj.location.x = getRandom(300, 900, 0); // присваивает ключу x случайное значение от 300 до 900
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

    massive.push(obj); // вставляет объекты в массив
  }

  return massive;
};

var mainMassive = createItems(8); // Присваиваем результат функции /создание 8-ми объектов в массиве/

var map = document.querySelector('.map').classList.remove('map--faded'); // ищет map и убирает класс map--faded

var pinsTo = document.querySelector('.map__pins'); // ищет div куда вставлять пины на карте

var template = document.querySelector('template');
var pinTemplate = template.content.querySelector('.map__pin');
var cardTemplate = template.content.querySelector('.map__card');

// Функция создания пинов /на входе массив объектов
var createPin = function (massive) {
  var pinElement = pinTemplate.cloneNode(true); // клонирует и присваивает переменной контент из шаблона
  pinElement.style.left = massive.location.x - 40 / 2 + 'px'; // изменяет положение
  pinElement.style.top = massive.location.y - 40 + 'px';
  pinElement.querySelector('img').src = massive.author.avatar; // ищет в pinElement тег img и в его объекте src переопределяет картинку в пине
  pinElement.querySelector('img').alt = massive.offer.title;

  return pinElement;
};

// Функция создания карточки товара
var createCard = function (massive) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = massive.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = massive.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = massive.offer.price;
  cardElement.querySelector('.popup__type').textContent = massive.offer.type;

  return cardElement;
};

// Функция вставки пинов на карту / на входе массив объектов
var insertPin = function (massive) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < massive.length; i++) {
    fragment.appendChild(createPin(massive[i]));
  }
  pinsTo.appendChild(fragment);
};

var cardBefore = document.querySelector('.map__filters-container'); // перед ним будет вставка каточек

// Функция вставки карточек
var insertCard = function (massive) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(createCard(massive[0]));
  // cardBefore.appendChild(fragment);
  map.insertBefore(fragment, cardBefore); // ошибка
};


insertPin(mainMassive);
insertCard(mainMassive);
