'use strict';

(function () {
  var items = window.createItems(8);
  var capacity = window.variables.forms.querySelector('#capacity');
  var title = window.variables.forms.querySelector('#title');
  var type = window.variables.forms.querySelector('#type');
  var price = window.variables.forms.querySelector('#price');
  var room = window.variables.forms.querySelector('#room_number');
  var timein = window.variables.forms.querySelector('#timein');
  var timeout = window.variables.forms.querySelector('#timeout');
  var button = window.variables.forms.querySelector('.ad-form__submit');
  var reset = document.querySelector('.ad-form__reset');

  var startMainPinY = window.variables.mainPin.offsetTop; // начальные значения главного пина
  var startMainPinX = window.variables.mainPin.offsetLeft;

  var disableFieldsets = function (swich) {
    var fieldsets = window.variables.forms.querySelectorAll('fieldset');
    for (var i = 0; i < fieldsets.length; i++) {
      if (swich === 'off') {
        fieldsets[i].disabled = false;
      }
      if (swich === 'on') {
        fieldsets[i].disabled = true;
      }
    }
  };

  var onCapacityChange = function () {
    var roomsObj = {
      1: [1],
      2: [1, 2],
      3: [1, 2, 3],
      100: [0]
    };
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
    var priceObj = {
      bungalo: '0',
      flat: '1000',
      house: '5000',
      palace: '10000'
    };
    price.min = priceObj[type.options[type.selectedIndex].value];
    price.placeholder = priceObj[type.options[type.selectedIndex].value];
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

  var setBorder = function (id) {
    id.style.border = '5px solid red';
  };

  var removeBorder = function (id) {
    id.style.border = '';
  };

  var setAddress = function (x, y) {
    var addressInput = document.querySelector('#address');
    addressInput.value = x + ', ' + y;
  };
  setAddress(startMainPinX + window.variables.MAIN_PIN_WIDTH / 2, startMainPinY + window.variables.MAIN_PIN_HEIGHT / 2);

  var active = function () {
    window.variables.map.classList.remove('map--faded');
    window.variables.forms.classList.remove('ad-form--disabled');

    disableFieldsets('off');
    window.insertPin(items);

    // Активируем слушателей
    title.addEventListener('invalid', onTitleInvalid);
    title.addEventListener('input', onTitleInvalid);
    price.addEventListener('invalid', onPriceInvalid);
    price.addEventListener('input', onPriceInvalid);
    room.addEventListener('change', onCapacityChange);
    capacity.addEventListener('change', window.form.nCapacityChange);
    button.addEventListener('click', onCapacityChange);
    room.addEventListener('change', onCapacityChange);
    capacity.addEventListener('change', onCapacityChange);
    button.addEventListener('click', onCapacityChange);
    type.addEventListener('change', onTypeChange);
    timein.addEventListener('change', onTimeinChange);
    timeout.addEventListener('change', onTimeoutChange);
    reset.addEventListener('click', resetForm);
  };

  var resetForm = function () {
    var mapPins = window.variables.map.querySelectorAll('.map__pin');
    window.variables.forms.reset();
    for (var i = 1; i < mapPins.length; i++) {
      mapPins[i].parentNode.removeChild(mapPins[i]);
    }

    window.removeCard();
    removeBorder(title);
    removeBorder(price);
    removeBorder(capacity);

    // возврат главного пина
    window.variables.mainPin.style.top = startMainPinY + 'px';
    window.variables.mainPin.style.left = startMainPinX + 'px';

    setAddress(startMainPinX + window.variables.MAIN_PIN_WIDTH / 2, startMainPinY + window.variables.MAIN_PIN_HEIGHT / 2);

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
    reset.removeEventListener('click', resetForm);

    window.variables.map.classList.add('map--faded');
    window.variables.forms.classList.add('ad-form--disabled');
    disableFieldsets('on');
  };

  window.form = {
    setAddress: setAddress,
    active: active
  };

  disableFieldsets('on');
})();
