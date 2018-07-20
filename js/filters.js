'use strict';

(function () {
  var PRICE_MIN = 10000;
  var PRICE_MAX = 50000;

  var filterForm = document.querySelector('.map__filters');
  var type = filterForm.querySelector('#housing-type');
  var price = filterForm.querySelector('#housing-price');
  var rooms = filterForm.querySelector('#housing-rooms');
  var guests = filterForm.querySelector('#housing-guests');

  var checkField = function (offerObject, value, param) {
    return value === 'any' ? true : param === value;
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

  var checkboxElements = document.querySelectorAll('.map__checkbox');
  var checkFeatures = function (offerObject, element) {
    var checkedArray = [];

    element.forEach(function (el) {
      if (el.checked) {
        checkedArray.push(el.value);
      }
    });

    if (checkedArray) {
      return (checkedArray.every(function (feature) {
        return (offerObject.offer.features.indexOf(feature) >= 0);
      }));
    } else {
      return true;
    }
  };

  var filterResult = function () {
    return window.items.filter(function (item) {
      return checkField(item, type.value, item.offer.type) && checkPrice(item, price.value) && checkField(item, rooms.value, item.offer.rooms) && checkField(item, guests.value, item.offer.guests) && checkFeatures(item, checkboxElements);
    });
  };

  window.filterResult = filterResult;
})();
