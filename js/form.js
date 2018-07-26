'use strict';

(function () {
  var TIMEOUT_MESSAGE = 1500;

  var showMessage = function (message) {
    var node = document.createElement('div');
    node.style = 'z-index: 2; margin: 0 auto; padding: 10px; text-align: center; border: 1px solid #fff';
    node.style.position = 'fixed';
    node.style.top = 50 + '%';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '20px';
    node.style.color = '#fff';
    node.style.background = 'red';
    node.className = 'message';


    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);

    var removeElement = function () {
      var notification = document.querySelector('.message');
      document.body.removeChild(notification);
    };

    setTimeout(removeElement, TIMEOUT_MESSAGE);
  };

  var onError = function (message) {
    showMessage(message);
  };

  var onLoad = function (data) {
    window.items = data;
    window.pin.insertPin(window.filterResult().slice(0, 5)); // вставляем пины по загрузке data
  };

  var onFilterChange = function () {
    window.pin.removePin();
    window.card.removeCard();

    window.pin.insertPin(window.filterResult().slice(0, 5));
  };

  var capacity = window.variables.forms.querySelector('#capacity');
  var title = window.variables.forms.querySelector('#title');
  var type = window.variables.forms.querySelector('#type');
  var price = window.variables.forms.querySelector('#price');
  var room = window.variables.forms.querySelector('#room_number');
  var timein = window.variables.forms.querySelector('#timein');
  var timeout = window.variables.forms.querySelector('#timeout');
  var button = window.variables.forms.querySelector('.ad-form__submit');
  var form = document.querySelector('.ad-form');
  var reset = form.querySelector('.ad-form__reset');

  var startMainPinY = window.variables.mainPin.offsetTop; // начальные значения главного пина
  var startMainPinX = window.variables.mainPin.offsetLeft;

  var disableFieldsets = function (value) {
    var fieldsets = window.variables.forms.querySelectorAll('fieldset');
    fieldsets.forEach(function (element) {
      switch (value) {
        case 'off':
          element.disabled = false;
          break;
        case 'on':
          element.disabled = true;
          break;
      }
    });

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

  var priceObject = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };

  var onTypeChange = function () {
    price.min = priceObject[type.options[type.selectedIndex].value];
    price.placeholder = priceObject[type.options[type.selectedIndex].value];
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


  var activate = function () {
    window.backend.load(onLoad, onError);
    window.variables.map.classList.remove('map--faded');
    window.variables.forms.classList.remove('ad-form--disabled');
    disableFieldsets('off');

    var onSubmit = function (evt) {
      window.backend.upLoad(new FormData(form), function () {
        onFormReset(evt);
        var success = document.querySelector('.success');
        success.classList.remove('hidden');

        var onPressEsc = function (event) {
          if (event.keyCode === window.variables.ESC_KEYCODE) {
            document.querySelector('.success').classList.add('hidden');
          }
          removeEventListener('keydown', onPressEsc);
        };

        var onClick = function () {
          document.querySelector('.success').classList.add('hidden');
          removeEventListener('click', onClick);
        };

        document.addEventListener('keydown', onPressEsc);
        success.addEventListener('click', onClick);
      }, onError);

      form.removeEventListener('submit', onSubmit);
      evt.preventDefault();
    };

    form.addEventListener('submit', onSubmit);
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
    reset.addEventListener('click', onFormReset);
    window.variables.map.addEventListener('click', window.pin.onPinClick);
    window.variables.mapFilters.addEventListener('change', window.debounce(onFilterChange));
  };

  var onFormReset = function (evt) {
    evt.preventDefault();
    window.variables.forms.reset();
    window.variables.mapFilters.reset();
    window.pin.removePin();
    window.card.removeCard();
    removeBorder(title);
    removeBorder(price);
    removeBorder(capacity);
    price.placeholder = priceObject.flat;
    window.variables.mainPin.style.top = startMainPinY + 'px';
    window.variables.mainPin.style.left = startMainPinX + 'px';

    setAddress(startMainPinX + window.variables.MAIN_PIN_WIDTH / 2, startMainPinY + window.variables.MAIN_PIN_HEIGHT / 2);

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
    window.variables.map.removeEventListener('click', window.pin.onPinClick);

    window.variables.mapFilters.removeEventListener('change', onFilterChange);

    window.variables.map.classList.add('map--faded');
    window.variables.forms.classList.add('ad-form--disabled');
    disableFieldsets('on');
  };

  window.form = {
    setAddress: setAddress,
    activate: activate
  };

  disableFieldsets('on');
})();
