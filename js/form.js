'use strict';

// Создадим объект FORM
(function () {
  var items = window.createItems(8);
  var map = document.querySelector('.map');
  var forms = document.querySelector('.ad-form');
  var capacity = forms.querySelector('#capacity');
  var title = forms.querySelector('#title');
  var type = forms.querySelector('#type');
  var price = forms.querySelector('#price');
  var room = forms.querySelector('#room_number');
  var timein = forms.querySelector('#timein');
  var timeout = forms.querySelector('#timeout');
  var button = forms.querySelector('.ad-form__submit');
  var reset = document.querySelector('.ad-form__reset');

  var mainPin = document.querySelector('.map__pin--main');

  var startMainPinY = mainPin.offsetTop; // начальные значения главного пина
  var startMainPinX = mainPin.offsetLeft;

  window.form = {
    disableFieldsets: function (swich) {
      var fieldsets = forms.querySelectorAll('fieldset');
      for (var i = 0; i < fieldsets.length; i++) {
        if (swich === 'off') {
          fieldsets[i].disabled = false;
        }
        if (swich === 'on') {
          fieldsets[i].disabled = true;
        }
      }
    },

    onCapacityChange: function () {
      var roomsObj = {
        1: [1],
        2: [1, 2],
        3: [1, 2, 3],
        100: [0]
      };
      var rooms = Number(room.options[room.selectedIndex].value);
      var guests = Number(capacity.options[capacity.selectedIndex].value);
      if (roomsObj[rooms].indexOf(guests) === -1) {
        window.form.setBorder(capacity);
        capacity.setCustomValidity('Указанное количество мест не соответствует выбранному количеству комнат');
      } else {
        window.form.removeBorder(capacity);
        capacity.setCustomValidity('');
      }
    },

    onTimeinChange: function () {
      timeout.options.selectedIndex = timein.options.selectedIndex;
    },

    onTimeoutChange: function () {
      timein.options.selectedIndex = timeout.options.selectedIndex;
    },

    onTypeChange: function () {
      var priceObj = {
        bungalo: '0',
        flat: '1000',
        house: '5000',
        palace: '10000'
      };
      price.min = priceObj[type.options[type.selectedIndex].value];
      price.placeholder = priceObj[type.options[type.selectedIndex].value];
    },

    checkValiation: function (id) {
      return !id.validity.valid ? window.form.setBorder(id) : window.form.removeBorder(id);
    },

    onTitleInvalid: function () {
      window.form.checkValiation(title);
    },

    onPriceInvalid: function () {
      window.form.checkValiation(price);
    },

    setBorder: function (id) {
      id.style.border = '5px solid red';
    },

    removeBorder: function (id) {
      id.style.border = '';
    },

    setAddress: function (x, y) {
      var addressInput = document.querySelector('#address');
      addressInput.value = x + ', ' + y;
    },

    active: function () {
      map.classList.remove('map--faded');
      forms.classList.remove('ad-form--disabled');

      window.form.disableFieldsets('off');
      window.pin.insertPin(items);

      // Активируем слушателей
      title.addEventListener('invalid', window.form.onTitleInvalid);
      title.addEventListener('input', window.form.onTitleInvalid);
      price.addEventListener('invalid', window.form.onPriceInvalid);
      price.addEventListener('input', window.form.onPriceInvalid);
      room.addEventListener('change', window.form.onCapacityChange);
      capacity.addEventListener('change', window.form.nCapacityChange);
      button.addEventListener('click', window.form.onCapacityChange);
      room.addEventListener('change', window.form.onCapacityChange);
      capacity.addEventListener('change', window.form.onCapacityChange);
      button.addEventListener('click', window.form.onCapacityChange);
      type.addEventListener('change', window.form.onTypeChange);
      timein.addEventListener('change', window.form.onTimeinChange);
      timeout.addEventListener('change', window.form.onTimeoutChange);
      reset.addEventListener('click', window.form.reset);
    },

    reset: function () {
      var mapPins = map.querySelectorAll('.map__pin');
      forms.reset();
      for (var i = 1; i < mapPins.length; i++) {
        mapPins[i].parentNode.removeChild(mapPins[i]);
      }

      window.card.removeCard();
      window.form.removeBorder(title);
      window.form.removeBorder(price);
      window.form.removeBorder(capacity);

      // возврат главного пина

      // var startMainPinY = 570; // начальные значения главного пина
      // var startMainPinX = 375;
      mainPin.style.top = startMainPinY + 'px';
      mainPin.style.left = startMainPinX + 'px';
      // mainPin.style.top = 200 + 'px';
      // mainPin.style.left = 200 + 'px';
      // window.form.setAddress(startMainPinX, startMainPinY);

      // сброс слушателей
      title.removeEventListener('invalid', window.form.onTitleInvalid);
      title.removeEventListener('input', window.form.onTitleInvalid);
      price.removeEventListener('invalid', window.form.onPriceInvalid);
      price.removeEventListener('input', window.form.onPriceInvalid);
      room.removeEventListener('change', window.form.onCapacityChange);
      capacity.removeEventListener('change', window.form.onCapacityChange);
      timein.removeEventListener('change', window.form.onTimeinChange);
      timeout.removeEventListener('change', window.form.onTimeoutChange);
      type.removeEventListener('change', window.form.onTypeChange);
      button.removeEventListener('click', window.form.onCapacityChange);
      reset.removeEventListener('click', window.form.reset);

      map.classList.add('map--faded');
      forms.classList.add('ad-form--disabled');
      window.form.disableFieldsets('on');
    }
  };

  window.form.disableFieldsets('on');
})();
