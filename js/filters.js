'use strict';

(function () {
  var PRICE_MIN = 10000;
  var PRICE_MAX = 50000;

  var filterForm = document.querySelector('.map__filters');
  var type = filterForm.querySelector('#housing-type');
  var price = filterForm.querySelector('#housing-price');
  var rooms = filterForm.querySelector('#housing-rooms');
  var guests = filterForm.querySelector('#housing-guests');

  var checkType = function (object, value) {
    return value === 'any' ? true : object.offer.type === value;
  };

  var checkPrice = function (object, value) {
    switch (value) {
      case 'middle':
        return object.offer.price >= PRICE_MIN && object.offer.price <= PRICE_MAX;
      case 'low':
        return object.offer.price < PRICE_MIN;
      case 'high':
        return object.offer.price > PRICE_MAX;
    }
    return true;
  };

  var checkRooms = function (object, value) {
    return value === 'any' ? true : object.offer.rooms === +value;
  };

  var checkGuests = function (object, value) {
    return value === 'any' ? true : object.offer.guests === +value; // возвращает TRUE или FALSE
  };


  var checkFeatures = function (object) {
    var checkboxElements = window.variables.mapFilters.querySelectorAll('input:checked');
    var checkedArray = [];
    checkboxElements.forEach(function (item) {
      checkedArray.push(item.value);
    });

    if (checkedArray) {
      return (checkedArray.every(function (feature) {
        return (object.offer.features.indexOf(feature) >= 0);
      }));
    }
    return true;
  };

  var filterResult = function () {
    return window.items.filter(function (item) {
      return checkType(item, type.value) && checkPrice(item, price.value) && checkRooms(item, rooms.value) && checkGuests(item, guests.value) && checkFeatures(item);
    });
  };

  window.filterResult = filterResult;
})();
