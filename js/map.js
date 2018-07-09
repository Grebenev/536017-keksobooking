'use strict';


// Удаление карточки по Esc
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    window.card.removeCard();
  }
});

window.map.addEventListener('click', function (evt) {
  if (evt.target.className === 'popup__close') {
    window.card.removeCard();
  }

  if (evt.target.dataset.id) {
    window.card.insertCard(window.createItems(window.CARD_QUANTITY)[evt.target.dataset.id]);

  } else if (evt.target.parentElement.dataset.id) {
    window.card.insertCard(window.createItems(window.CARD_QUANTITY)[evt.target.parentElement.dataset.id]);
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
  window.pin.insertPin(window.createItems(8));
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
  window.card.removeCard();
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
