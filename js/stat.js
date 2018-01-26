'use strict';

window.renderStatistics = function (ctx, names, times) {
  // Cloud
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_COORD_X = 100;
  var CLOUD_COORD_Y = 10;
  var CLOUD_COLOR = '#fff';
  var SHADOW_COORD_X = 110;
  var SHADOW_COORD_Y = 20;
  var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
  var STEP = 2.5;
  var DEFLECTION = 5;
  var SECOND_STEP = 7.5;
  var THIRD_STEP = 10;

  // Text
  var COLOR_BLACK = '#000';
  var CUSTOM_FONT = '16px PT Mono';
  var VICTORY = 'Ура вы победили!';
  var VICTORY_COORD_X = 120;
  var VICTORY_COORD_Y = 40;
  var RESULT = 'Список результатов:';
  var RESULT_COORD_X = 120;
  var RESULT_COORD_Y = 60;

  // HISTOGRAM
  var HISTOGRAM_HEIGHT = 150;
  var COLUMN_WIDTH = 40;
  var INITIAL_COORD_X = 155;
  var INITIAL_COORD_Y = 245;
  var COLUMN_INDENT = 50;
  var NAME_INDENT = 15;
  var POINTS_INDENT = 5;
  var YOUR_NAME = 'Вы';
  var YOUR_COLOR = 'rgba(255, 0, 0, 1)';
  var COLOR_BEFORE_ALPHA = 'rgba(0, 0, 255, ';
  var COLOR_AFTER_ALPHA = ')';

  var drawCloud = function (staticX, staticY, width, height, color) {
    ctx.fillStyle = color;
    var x = staticX;
    var y = staticY;

    ctx.beginPath();
    ctx.moveTo(staticX, staticY);
    while (y < staticY + height) {
      ctx.bezierCurveTo(x + DEFLECTION, y + STEP, x - DEFLECTION, y + SECOND_STEP, x, y += THIRD_STEP);
    }
    while (x < staticX + width) {
      ctx.bezierCurveTo(x + STEP, y - DEFLECTION, x + SECOND_STEP, y + DEFLECTION, x += THIRD_STEP, y);
    }
    while (y > staticY) {
      ctx.bezierCurveTo(x - DEFLECTION, y - STEP, x + DEFLECTION, y - SECOND_STEP, x, y -= THIRD_STEP);
    }
    while (x > staticX) {
      ctx.bezierCurveTo(x - STEP, y + DEFLECTION, x - SECOND_STEP, y - DEFLECTION, x -= THIRD_STEP, y);
    }
    ctx.closePath();
    ctx.fill();
  };

  var getMaxElement = function (arr) {
    var maxElement = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  };

  drawCloud(SHADOW_COORD_X, SHADOW_COORD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, SHADOW_COLOR);
  drawCloud(CLOUD_COORD_X, CLOUD_COORD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_COLOR);

  ctx.fillStyle = COLOR_BLACK;
  ctx.font = CUSTOM_FONT;

  ctx.fillText(VICTORY, VICTORY_COORD_X, VICTORY_COORD_Y);
  ctx.fillText(RESULT, RESULT_COORD_X, RESULT_COORD_Y);

  var step = HISTOGRAM_HEIGHT / getMaxElement(times);

  for (var j = 0; j < times.length; j++) {
    var columnHeight = times[j] * step;
    var coordX = INITIAL_COORD_X + (COLUMN_INDENT + COLUMN_WIDTH) * j;
    var coordY = INITIAL_COORD_Y - columnHeight;
    ctx.fillStyle = names[j] === YOUR_NAME ? YOUR_COLOR : COLOR_BEFORE_ALPHA + Math.random() + COLOR_AFTER_ALPHA;

    ctx.fillRect(coordX, coordY, COLUMN_WIDTH, columnHeight);
    ctx.fillStyle = COLOR_BLACK;
    ctx.fillText(names[j], coordX, INITIAL_COORD_Y + NAME_INDENT);
    ctx.fillText(Math.round(times[j]), coordX, coordY - POINTS_INDENT);
  }
};
