'use strict';

var PIN_WHIDTH = 40;
var PIN_HEIGHT = 40;
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
  var popupClose = map.querySelector('.popup__close');

  // Удаление элемента
  var removeElement = function () {
    var childElement = map.querySelector('.map__card');
    map.removeChild(childElement);
  };

  // Удаление по клику
  var onClickClose = function () {
    removeElement();
    popupClose.removeEventListener('click', onClickClose);
  };

  // Удаление по Esc
  var onEscClose = function (evt) {
    if (evt.keyCode === 27) {
      removeElement();
      document.removeEventListener('keydown', onEscClose);
    }
  };

  popupClose.addEventListener('click', onClickClose);
  document.addEventListener('keydown', onEscClose);
};

// Функция вставки карточек
var insertCard = function (obj) {
  var existCard = map.querySelector('.map__card');

  // Проверка существует ли карточка
  if (!existCard) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(createCard(obj));
    map.insertBefore(fragment, filtersContainer);
    removeCard();
  }
};

// Функция активации
var activeMap = function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  insertPin(items);
};

var mainPin = document.querySelector('.map__pin--main');

// Создаем функцию, на которую повесим обработчик по mouseup и удалим из нее обработчик после срабатывания
var onClickMainPin = function () {
  activeMap();
  mainPin.removeEventListener('mouseup', onClickMainPin);
};


// Ставим обработчик на главный пин. По событию mouseup - сработает функция onClickMainPin
mainPin.addEventListener('mouseup', onClickMainPin);


var mapPins = document.querySelector('.map__pins'); // область клика

mapPins.addEventListener('click', function (evt) {
  if (evt.target.dataset.id) {
    insertCard(items[evt.target.dataset.id]);

  } else if (evt.target.parentElement.dataset.id) {
    insertCard(items[evt.target.parentElement.dataset.id]);
  }
});

// передаем данные в инпут
var mainPinWidth = mainPin.children[1].getAttribute('width');
var mainPinHeight = mainPin.children[1].getAttribute('height');
var mainPinX = mainPin.offsetLeft + Number(mainPinWidth) / 2;
var mainPinY = mainPin.offsetTop + Number(mainPinHeight);
var addressInput = document.querySelector('#address');
addressInput.value = mainPinX + ',' + mainPinY;

// Форма
var forms = document.querySelector('.ad-form');

// Функция установки звездочки в текст с required
var setStarsReuired = function (id) {
  // var forValue = id;
  var label = forms.querySelector('label[for="' + id + '"]');
  if (label) {
    var text = label.textContent;
    label.textContent = text + ' *';
  }

};

// Функция поиска и установки атрибутов
var checkAttributes = function (id, attribute, value) {
  var checkId = forms.querySelector('#' + id);
  var checkAttr = checkId.getAttribute('attribute');

  if (!checkAttr) {
    checkId.setAttribute(attribute, value);
  }
  if (attribute === 'required') {
    setStarsReuired(id);
  }
};

// Перечень id инпутов для установки required
var inputId = [
  'title',
  'address',
  'type',
  'price',
  'timein',
  'timeout',
  'room_number',
  'capacity'
];
for (var i = 0; i < inputId.length; i++) {
  checkAttributes(inputId[i], 'required', '');
}
