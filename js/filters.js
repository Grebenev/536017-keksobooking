'use strict';

(function () {

  var filterForm = document.querySelector('.map__filters');
  var type = filterForm.querySelector('#housing-type');
  var price = filterForm.querySelector('#housing-price');
  var rooms = filterForm.querySelector('#housing-rooms');
  var guests = filterForm.querySelector('#housing-guests');
  // var wifi = filterForm.querySelector('#filter-wifi');


  // ТИП
  var checkType = function (offerObject, value) {
    return value === 'any' ? true : offerObject.offer.type === value;
  };

  // ПРАЙС
  var checkPrice = function (offerObject, value) {
    switch (value) {
      case 'middle':
        return offerObject.offer.price >= 10000 && offerObject.offer.price <= 50000;
      case 'low':
        return offerObject.offer.price < 10000;
      case 'high':
        return offerObject.offer.price > 50000;
    }
    return true;
  };

  // КОМНАТЫ
  var checkRooms = function (offerObject, value) {
    return value === 'any' ? true : offerObject.offer.rooms === +value;
  };

  // ГОСТИ
  var checkGuests = function (offerObject, value) {
    return value === 'any' ? true : offerObject.offer.guests === +value; // возвращает TRUE или FALSE
  };

  // ЧЕКБОКСЫ
  // var checkFeatures = function (offerObject, value) {
  //
  // };

  // // ОСНОВНАЯ
  var filterResult = function () {
    return window.items.filter(function (item) {
      return checkType(item, type.value) && checkPrice(item, price.value) && checkRooms(item, rooms.value) && checkGuests(item, guests.value);
    });
  };

  window.filterResult = filterResult;
})();
