'use strict';

var PIN_WHIDTH = 40;
var PIN_HEIGHT = 40;
var MAIN_PIN_WIDTH = 156;
var MAIN_PIN_HEIGHT = 200;
var CARD_QUANTITY = 8;

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

var typeHomes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

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
var createItems = function (number) {
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

// массив объектов
var items = createItems(CARD_QUANTITY);

var map = document.querySelector('.map');
var form = document.querySelector('.ad-form');

var template = document.querySelector('template');
var pinTemplate = template.content.querySelector('.map__pin');
var pins = document.querySelector('.map__pins');

// Функция создания пинов
var createPin = function (array, id) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = array.location.x - PIN_WHIDTH / 2 + 'px';
  pinElement.style.top = array.location.y - PIN_HEIGHT + 'px';
  pinElement.dataset.id = id;
  pinElement.querySelector('img').src = array.author.avatar;
  pinElement.querySelector('img').alt = array.offer.title;

  return pinElement;
};
var cardTemplate = template.content.querySelector('.map__card');

// Функция очистки DOM
var clearDom = function (classname) {
  var clear = template.content.querySelector(classname);
  clear.innerHTML = '';
};

// Функция создания фич
var createFeatures = function (obj) {
  clearDom('.popup__features');
  var parentFeatures = template.content.querySelector('.popup__features');
  for (var i = 0; i < obj.offer.features.length; i++) {
    var createElement = document.createElement('li');
    createElement.className = 'popup__feature' + ' popup__feature--' + obj.offer.features[i];
    parentFeatures.appendChild(createElement);
  }
};

// Функция фото
var insertPhotos = function (obj) {
  clearDom('.popup__photos');
  var parentPhotos = template.content.querySelector('.popup__photos');
  for (var i = 0; i < obj.offer.photos.length; i++) {
    var createElement = document.createElement('img');
    createElement.className = 'popup__photo';
    createElement.setAttribute('src', obj.offer.photos[i]);
    createElement.setAttribute('width', '45');
    createElement.setAttribute('height', '40');
    createElement.setAttribute('alt', 'Фотография жилья');
    parentPhotos.appendChild(createElement);
  }
};

// Функция создания карточки товара
var createCard = function (obj) {
  createFeatures(obj);
  insertPhotos(obj);
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = obj.author.avatar;
  cardElement.querySelector('.popup__title').textContent = obj.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = obj.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = obj.offer.price + ' ₽/ночь.';
  for (var key in typeHomes) {
    if (obj.offer.type === key) {
      cardElement.querySelector('.popup__type').textContent = typeHomes[key];
    }
  }
  cardElement.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'заезд после ' + obj.offer.checkin + ' выезд до ' + obj.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = obj.offer.description;
  return cardElement;
};

// Функция вставки пинов на карту / на входе массив объектов
var insertPin = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(createPin(array[i], i));
  }
  pins.appendChild(fragment);
};
var filtersContainer = document.querySelector('.map__filters-container');

// Функция удаления карточки
var removeCard = function () {
  var card = map.querySelector('.map__card');
  if (card) {
    map.removeChild(card);
  }
};

// Функция вставки карточки
var insertCard = function (obj) {
  removeCard();
  var fragment = document.createDocumentFragment();
  fragment.appendChild(createCard(obj));
  map.insertBefore(fragment, filtersContainer);
};

// Удаление карточки по Esc
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    removeCard();
  }
});

// Функция активации карты и формы
var activeMap = function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  insertPin(items);
};

var mainPin = document.querySelector('.map__pin--main');

var onClickMainPin = function () {
  activeMap();
  mainPin.removeEventListener('mouseup', onClickMainPin);
};

mainPin.addEventListener('mouseup', onClickMainPin);

map.addEventListener('click', function (evt) {
  if (evt.target.className === 'popup__close') {
    removeCard();
  }

  if (evt.target.dataset.id) {
    insertCard(items[evt.target.dataset.id]);

  } else if (evt.target.parentElement.dataset.id) {
    insertCard(items[evt.target.parentElement.dataset.id]);
  }
});

var mainPinX = mainPin.offsetLeft + Number(MAIN_PIN_WIDTH) / 2;
var mainPinY = mainPin.offsetTop + Number(MAIN_PIN_HEIGHT);
var addressInput = document.querySelector('#address');
addressInput.value = mainPinX + ',' + mainPinY;

// Форма
var forms = document.querySelector('.ad-form');
var roomNumber = forms.querySelector('#room_number');
var capacity = forms.querySelector('#capacity');


// Функция комнаты/гости
var setRooms = function (guest) {
  for (var i = 0; i < 4; i++) {
    capacity.options[i].disabled = true;
  }

  var obj = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  for (var key in obj) { // листаем ключи в объекте

    if (key === guest) { // если ключ равен параметру

      for (var n = 0; n < obj[key].length; n++) { // листаем массив в этом ключе

        var indexGuest = obj[key][n]; // присваиваем массив переменной

        for (var key2 in capacity.options) { // листаем option в capacity

          if (Number(capacity.options[key2].value) === indexGuest) {
            capacity.options[key2].disabled = false;
          }
        }
      }
    }
  }
};


// Функция установка атрибутов для PRICE/
var obj = {
  bungalo: '0',
  flat: '1000',
  house: '5000',
  palace: '10000'
};

var setMinPrice = function (type) {
  var price = forms.querySelector('#price');
  for (var key in obj) {
    if (key === type) {
      price.placeholder = obj[key];
      price.min = obj[key];
    }
  }
};

// Функция timein/timeout
var setTimeinOut = function (time, value) {
  var timein = forms.querySelector('#timein');
  var timeout = forms.querySelector('#timeout');
  if (time === 'timein') {
    timeout.options[value].selected = true;
  }
  if (time === 'timeout') {
    timein.options[value].selected = true;
  }
};

// Слушаем селектор type
var typeHome = forms.querySelector('#type');
typeHome.addEventListener('change', function (evt) {
  setMinPrice(evt.target.value);
});

// Слушаем id timein/timeoute
var time = forms.querySelector('.ad-form__element--time');

time.addEventListener('change', function (evt) {
  setTimeinOut(evt.target.id, evt.target.options.selectedIndex);
});

// Слушаем id room_number
roomNumber.addEventListener('change', function (evt) {
  setRooms(evt.target.value);
});
