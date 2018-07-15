'use strict';

(function () {
  var dragAndDrop = function () {
    var pins = document.querySelector('.map__pins');

    window.variables.mainPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      window.form.active();
      window.form.setAddress(window.variables.mainPin.offsetLeft + window.variables.MAIN_PIN_WIDTH / 2, window.variables.mainPin.offsetTop + window.variables.MAIN_PIN_HEIGHT);

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

        var pinTopStart = 130 - window.variables.MAIN_PIN_HEIGHT - 1;
        var pinTopEnd = 630 - window.variables.MAIN_PIN_HEIGHT + 1;
        var pinLeftStart = 0;
        var pinLeftEnd = window.variables.map.offsetWidth - window.variables.MAIN_PIN_WIDTH;

        if ((window.variables.mainPin.offsetTop - shift.y > pinTopStart) && (window.variables.mainPin.offsetTop - shift.y < pinTopEnd)) {
          window.variables.mainPin.style.top = (window.variables.mainPin.offsetTop - shift.y) + 'px';
        }

        if ((window.variables.mainPin.offsetLeft - shift.x > pinLeftStart) && window.variables.mainPin.offsetLeft - shift.x < pinLeftEnd) {
          window.variables.mainPin.style.left = (window.variables.mainPin.offsetLeft - shift.x) + 'px';
        }

        window.form.setAddress(window.variables.mainPin.offsetLeft + window.variables.MAIN_PIN_WIDTH / 2, window.variables.mainPin.offsetTop + window.variables.MAIN_PIN_HEIGHT);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        pins.removeEventListener('mousemove', onMouseMove);
        pins.removeEventListener('mouseup', onMouseUp);
      };

      pins.addEventListener('mousemove', onMouseMove);
      pins.addEventListener('mouseup', onMouseUp);

    });
  };
  window.dragAndDrop = dragAndDrop;
})();