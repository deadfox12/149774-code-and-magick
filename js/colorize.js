'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var colors = {
    'coat': {
      'arr': COAT_COLORS,
      'index': 0
    },
    'eyes': {
      'arr': EYES_COLORS,
      'index': 0
    },
    'fireball': {
      'arr': FIREBALL_COLORS,
      'index': 0
    }
  };

  window.colorize = {
    getNextColor: function (item) {
      var color = colors[item];
      color.index++;
      if (color.index === color.arr.length) {
        color.index = 0;
      }
      var nextColor = color.arr[color.index];
      return nextColor;
    },
    getRandom: function (item) {
      var color = colors[item];
      var randomColor = window.util.getRandom(color.arr);
      return randomColor;
    }
  };
})();
