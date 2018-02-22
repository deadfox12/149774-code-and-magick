'use strict';

(function () {
  window.colorizeElement = function (element, input, colors, cb) {
    element.addEventListener('click', function () {
      var currentColor = window.util.getRandom(colors);
      input.value = currentColor;
      cb(element, currentColor);
    });
  };
})();
