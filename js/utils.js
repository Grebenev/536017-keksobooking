'use strict';

(function () {
  window.utils.onPressEsc = function (evt, fun {
    if (evt.keyCode === window.variables.ESC_KEYCODE) {
      fun();
    }
  };
})();
