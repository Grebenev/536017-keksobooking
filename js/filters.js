'use strict';

(function () {
  var PRICE_MIN = 10000;
  var PRICE_MAX = 50000;

  var filterForm = document.querySelector('.map__filters');
  var type = filterForm.querySelector('#housing-type');
  var price = filterForm.querySelector('#housing-price');
  var rooms = filterForm.querySelector('#housing-rooms');
  var guests = filterForm.querySelector('#housing-guests');

  var checkType = function (offerObject, value) {
    return value === 'any' ? true : offerObject.offer.type === value;
  };

  var checkPrice = function (offerObject, value) {
    switch (value) {
      case 'middle':
        return offerObject.offer.price >= PRICE_MIN && offerObject.offer.price <= PRICE_MAX;
      case 'low':
        return offerObject.offer.price < PRICE_MIN;
      case 'high':
        return offerObject.offer.price > PRICE_MAX;
    }
    return true;
  };

  var checkRooms = function (offerObject, value) {
    return value === 'any' ? true : offerObject.offer.rooms === +value;
  };

  var checkGuests = function (offerObject, value) {
    return value === 'any' ? true : offerObject.offer.guests === +value; // возвращает TRUE или FALSE
  };

  var checkboxElement = document.querySelectorAll('.map__checkbox');
  var checkFeatures = function (offerObject, element) {
    var checkedArray = [];

    element.forEach(function (el) {
      if (el.checked) {
        checkedArray.push(el.value);
      }
    });

    switch (checkedArray) {
      case checkedArray:
        return (checkedArray.every(function (feature) {
          return (offerObject.offer.features.indexOf(feature) >= 0);
        }));

      default: return true;
    }
  };

  var filterResult = function () {
    return window.items.filter(function (item) {
      return checkType(item, type.value) && checkPrice(item, price.value) && checkRooms(item, rooms.value) && checkGuests(item, guests.value) && checkFeatures(item, checkboxElement);
    });
  };

  window.filterResult = filterResult;
})();
