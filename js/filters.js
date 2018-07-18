'use strict';

(function () {

  var filterForm = document.querySelector('.map__filters');
  var type = filterForm.querySelector('#housing-type');
  var price = filterForm.querySelector('#housing-price');
  var room = filterForm.querySelector('#housing-rooms');
  var guest = filterForm.querySelector('#housing-guests');

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
  var checkGuest = function (offerObject, value) {
    return value === 'any' ? true : offerObject.offer.guests === +value;
  };

  // ОСНОВНАЯ
  filterForm.addEventListener('change', function () {

    var filterResult = window.items.filter(function (item) {
      return checkType(item, type.value) && checkPrice(item, price.value) && checkRoom(item, room.value) && checkGuest(item, guest.value);
    });

    console.log('ТИП ' + type.value + ' ПРАЙС ' + price.value + ' КОМНАТЫ ' + room.value + ' ГОСТИ ' + guest.value);

    console.log(filterResult);

  });

})();
