'use strict';

// --------------------------------create-items.js--------------

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

// -----------------END---------------------


// ГЛОБАЛЬНЫЕ
window.items = window.createItems(8);
window.template = document.querySelector('template');
window.map = document.querySelector('.map');
window.mainPin = document.querySelector('.map__pin--main');
window.MAIN_PIN_WIDTH = 64;
window.MAIN_PIN_HEIGHT = 80;

// -----------------------create-pin.js-----------------------
(function () {
  // Функция создания пинов
  var PIN_WHIDTH = 50;
  var PIN_HEIGHT = 70;
  window.createPin = function (array, id) {
    var pinTemplate = window.template.content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = array.location.x - PIN_WHIDTH / 2 + 'px';
    pinElement.style.top = array.location.y - PIN_HEIGHT + 'px';
    pinElement.dataset.id = id;
    pinElement.querySelector('img').src = array.author.avatar;
    pinElement.querySelector('img').alt = array.offer.title;

    return pinElement;
  };
})();
// --------------------------END -------------------------------------


// ------------------------- clear-dom.js
(function () {
  // Функция очистки DOM
  window.clearDom = function (classname) {
    var clear = window.template.content.querySelector(classname);
    clear.innerHTML = '';
  };
})();
// --------------------------- END ----------------------------

// ----------------------create-features.js----------------------------------------------
(function () {
  // Функция создания фич
  window.createFeatures = function (obj) {
    window.clearDom('.popup__features');
    var parentFeatures = window.template.content.querySelector('.popup__features');
    for (var i = 0; i < obj.offer.features.length; i++) {
      var createElement = document.createElement('li');
      createElement.className = 'popup__feature' + ' popup__feature--' + obj.offer.features[i];
      parentFeatures.appendChild(createElement);
    }
  };

})();
// --------------------------------END ---------------------------------

// ------------------------insert-photos.js ----------------------------------------
(function () {
  // Функция фото
  window.insertPhotos = function (obj) {
    window.clearDom('.popup__photos');
    var parentPhotos = window.template.content.querySelector('.popup__photos');
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

})();
// ----------------------------------END-------------------------------

// ------------------------------create-card.js-------------------------------------
(function () {
  // Функция создания карточки товара
  window.createCard = function (obj) {
    var typeHomes = {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    };

    window.createFeatures(obj);
    window.insertPhotos(obj);
    var cardTemplate = window.template.content.querySelector('.map__card');
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
})();
// -----------------------------------END------------------------------

// --------------------------------- insert-card -------------------------------------
(function () {
  // Функция вставки карточки
  var filtersContainer = document.querySelector('.map__filters-container');
  window.insertCard = function (obj) {
    window.removeCard();
    var fragment = document.createDocumentFragment();
    fragment.appendChild(window.createCard(obj));
    window.map.insertBefore(fragment, filtersContainer);
  };
})();
// -------------------------------------END----------------------------------

// -----------------------------------remove-card.js------------------------------------
(function () {
  // Функция удаления карточки
  window.removeCard = function () {
    var card = window.map.querySelector('.map__card');
    if (card) {
      window.map.removeChild(card);
    }
  };
})();
// -------------------------------------END------------------------------------------


// ---------------------------- insert-pin.js --------------------------------------
(function () {
  // Функция вставки пинов на карту / на входе массив объектов
  window.insertPin = function (array) {
    var pins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(window.createPin(array[i], i));
    }
    pins.appendChild(fragment);
  };
})();
// ------------------------------------END-------------------------------------------


// Удаление карточки по Esc
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    window.removeCard();
  }
});

window.map.addEventListener('click', function (evt) {
  if (evt.target.className === 'popup__close') {
    window.removeCard();
  }

  if (evt.target.dataset.id) {
    window.insertCard(window.items[evt.target.dataset.id]);

  } else if (evt.target.parentElement.dataset.id) {
    window.insertCard(window.items[evt.target.parentElement.dataset.id]);
  }
});

// --------------------------set-address.js---------------------------------------
(function () {

  window.setAddress = function (pinX, pinY) {
    var mainPinX = window.mainPin.offsetLeft + pinX / 2;
    var mainPinY = window.mainPin.offsetTop + pinY;
    var addressInput = document.querySelector('#address');
    addressInput.value = mainPinX + ', ' + mainPinY;
  };
})();
// ---------------------------------END---------------------------------------------
(function () {
  // Перемещение главного пина

  var pins = document.querySelector('.map__pins');

  window.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    activeMap();

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

      var pinTopStart = 130 - window.MAIN_PIN_HEIGHT - 1;
      var pinTopEnd = 630 - window.MAIN_PIN_HEIGHT + 1;
      var pinLeftStart = 0;
      var pinLeftEnd = window.map.offsetWidth - window.MAIN_PIN_WIDTH;

      if ((window.mainPin.offsetTop - shift.y > pinTopStart) && (window.mainPin.offsetTop - shift.y < pinTopEnd)) {
        window.mainPin.style.top = (window.mainPin.offsetTop - shift.y) + 'px';
      }

      if ((window.mainPin.offsetLeft - shift.x > pinLeftStart) && window.mainPin.offsetLeft - shift.x < pinLeftEnd) {
        window.mainPin.style.left = (window.mainPin.offsetLeft - shift.x) + 'px';
      }

      window.setAddress(window.MAIN_PIN_WIDTH, window.MAIN_PIN_HEIGHT);
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



// Форма

var forms = document.querySelector('.ad-form');
window.setAddress(window.MAIN_PIN_WIDTH, window.MAIN_PIN_HEIGHT / 2); // адрес при загрузке

// Дизаблим филдсеты
var disableFieldsets = function (swich) {
  var fieldsets = forms.querySelectorAll('fieldset');
  for (var i = 0; i < fieldsets.length; i++) {
    if (swich === 'off') {
      fieldsets[i].disabled = false;
    }
    if (swich === 'on') {
      fieldsets[i].disabled = true;
    }
  }
};
disableFieldsets('on');

var capacity = forms.querySelector('#capacity');
var title = forms.querySelector('#title');
var type = forms.querySelector('#type');
var price = forms.querySelector('#price');
var room = forms.querySelector('#room_number');
var timein = forms.querySelector('#timein');
var timeout = forms.querySelector('#timeout');
var button = forms.querySelector('.ad-form__submit');


var roomsObj = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

var priceObj = {
  bungalo: '0',
  flat: '1000',
  house: '5000',
  palace: '10000'
};

var setBorder = function (id) {
  id.style.border = '5px solid red';
};

var removeBorder = function (id) {
  id.style.border = '';
};

var checkValiation = function (id) {
  return !id.validity.valid ? setBorder(id) : removeBorder(id);
};

var onTitleInvalid = function () {
  checkValiation(title);
};

var onPriceInvalid = function () {
  checkValiation(price);
};

var onCapacityChange = function () {
  var rooms = Number(room.options[room.selectedIndex].value);
  var guests = Number(capacity.options[capacity.selectedIndex].value);
  if (roomsObj[rooms].indexOf(guests) === -1) {
    setBorder(capacity);
    capacity.setCustomValidity('Указанное количество мест не соответствует выбранному количеству комнат');
  } else {
    removeBorder(capacity);
    capacity.setCustomValidity('');
  }
};

var onTimeinChange = function () {
  timeout.options.selectedIndex = timein.options.selectedIndex;
};
var onTimeoutChange = function () {
  timein.options.selectedIndex = timeout.options.selectedIndex;
};


var onTypeChange = function () {
  price.min = priceObj[type.options[type.selectedIndex].value];
  price.placeholder = priceObj[type.options[type.selectedIndex].value];
};

// Функция активации карты и формы
var activeMap = function () {
  window.map.classList.remove('map--faded');
  forms.classList.remove('ad-form--disabled');

  disableFieldsets('off');
  window.setAddress(window.MAIN_PIN_WIDTH, window.MAIN_PIN_HEIGHT);
  window.insertPin(window.items);
  // dragAndDrop();

  // Активируем слушателей
  title.addEventListener('invalid', onTitleInvalid);
  title.addEventListener('input', onTitleInvalid);
  price.addEventListener('invalid', onPriceInvalid);
  price.addEventListener('input', onPriceInvalid);
  room.addEventListener('change', onCapacityChange);
  capacity.addEventListener('change', onCapacityChange);
  button.addEventListener('click', onCapacityChange);
  room.addEventListener('change', onCapacityChange);
  capacity.addEventListener('change', onCapacityChange);
  button.addEventListener('click', onCapacityChange);
  type.addEventListener('change', onTypeChange);
  timein.addEventListener('change', onTimeinChange);
  timeout.addEventListener('change', onTimeoutChange);
  reset.addEventListener('click', onFormReset);
};


// Сброс
var reset = document.querySelector('.ad-form__reset');

var onFormReset = function () {
  var mapPins = window.map.querySelectorAll('.map__pin');
  forms.reset();

  for (var i = 1; i < mapPins.length; i++) {
    mapPins[i].parentNode.removeChild(mapPins[i]);
  }
  window.removeCard();
  removeBorder(title);
  removeBorder(price);
  removeBorder(capacity);

  // возврат главного пина
  var startMainPinY = window.mainPin.offsetTop; // начальные значения главного пина
  var startMainPinX = window.mainPin.offsetLeft;
  window.mainPin.style.top = startMainPinY + 'px';
  window.mainPin.style.left = startMainPinX + 'px';
  window.setAddress(window.MAIN_PIN_WIDTH, window.MAIN_PIN_HEIGHT / 2);

  // сброс слушателей
  title.removeEventListener('invalid', onTitleInvalid);
  title.removeEventListener('input', onTitleInvalid);
  price.removeEventListener('invalid', onPriceInvalid);
  price.removeEventListener('input', onPriceInvalid);
  room.removeEventListener('change', onCapacityChange);
  capacity.removeEventListener('change', onCapacityChange);
  timein.removeEventListener('change', onTimeinChange);
  timeout.removeEventListener('change', onTimeoutChange);
  type.removeEventListener('change', onTypeChange);
  button.removeEventListener('click', onCapacityChange);
  reset.removeEventListener('click', onFormReset);

  window.map.classList.add('map--faded');
  forms.classList.add('ad-form--disabled');
  disableFieldsets('on');
};
