'use strict';

(function () {

  var filterForm = document.querySelector('.map__filters');
  var type = filterForm.querySelector('#housing-type');
  var price = filterForm.querySelector('#housing-price');
  var room = filterForm.querySelector('#housing-rooms');
  var guest = filterForm.querySelector('#housing-guests');
  var wifi = filterForm.querySelector('#filter-wifi');

  // ТИП
  var checkType = function (offerObject, value) {
    return value === 'any' ? true : offerObject.offer.type === value;
  };

  // ПРАЙС
  var checkPrice = function (offerObject, value) {
    var resultPrice;
    if (value === 'low') {
      resultPrice = offerObject.offer.price < 10000;
    }
    if (value === 'high') {
      resultPrice = offerObject.offer.price > 50000;
    }
    if (value === 'middle') {
      resultPrice = (offerObject.offer.price >= 10000) && (offerObject.offer.price <= 50000);
    }
    if (value === 'any') {
      return true;
    }
    return resultPrice;
  };

  // КОМНАТЫ
  var checkRoom = function (offerObject, value) {
    return value === 'any' ? true : offerObject.offer.rooms === +value;
  };

  // ГОСТИ
  //
  var checkGuest = function (offerObject, value) {
    return value === 'any' ? true : offerObject.offer.guests === +value; // возвращает TRUE или FALSE
  };

  // ЧЕКБОКСЫ
  var checkFeatures = function (offerObject, value) {

    var checked = filterForm.querySelectorAll('input[type ="checkbox"]:checked'); // Ищем все чекнутые чекбоксы

    checked.forEach(function (element) { // листаем массив чекбоксов

      console.log('Включен ' + element.value); // покажем значение включенного

    });

    // console.log('from ' + offerObject.offer.title + offerObject.offer.features.indexOf(value));

    return offerObject.offer.features.indexOf(value) + 1;

  };

  // ОСНОВНАЯ
  filterForm.addEventListener('change', function () {

    var filterResult = window.items.filter(function (item) {
      return checkType(item, type.value) && checkPrice(item, price.value) && checkRoom(item, room.value) && checkGuest(item, guest.value) && checkFeatures(item, 'wifi');
    });

    console.log('ТИП ' + type.value + ' ПРАЙС ' + price.value + ' КОМНАТЫ ' + room.value + ' ГОСТИ ' + guest.value);

    console.log(filterResult);

  });

})();
