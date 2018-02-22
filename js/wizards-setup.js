'use strict';
(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setup = document.querySelector('.setup');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var getSimilarWizards = function () {
    var wizards = [];

    for (var i = 0; i < 4; i++) {
      wizards[i] = {};
      wizards[i].name = window.util.getRandom(NAMES) + ' ' +
          window.util.getRandom(SURNAMES);
      wizards[i].coatColor = window.util.getRandom(COAT_COLORS);
      wizards[i].eyesColor = window.util.getRandom(EYES_COLORS);
    }

    return wizards;
  };

  var addSimilarWizards = function () {
    var setupSimilar = document.querySelector('.setup-similar');
    var fragment = document.createDocumentFragment();
    var wizards = getSimilarWizards();

    for (var j = 0; j < wizards.length; j++) {
      fragment.appendChild(renderWizard(wizards[j]));
    }
    var similarListElement = document.querySelector('.setup-similar-list');
    similarListElement.appendChild(fragment);
    setupSimilar.classList.remove('hidden');
  };


  var fillElement = function (element, color) {
    element.style.fill = color;
  };

  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };

  var changeWizardCoat = function () {
    var coat = setup.querySelector('.setup-wizard .wizard-coat');
    var inputCoat = setup.querySelector('[name="coat-color"]');
    window.colorizeElement(coat, inputCoat, COAT_COLORS, fillElement);
  };

  var changeWizardEyes = function () {
    var eyes = setup.querySelector('.setup-wizard .wizard-eyes');
    var inputEyes = setup.querySelector('[name="eyes-color"]');
    window.colorizeElement(eyes, inputEyes, EYES_COLORS, fillElement);
  };

  var changeWizardFireball = function () {
    var fireball = setup.querySelector('.setup-fireball-wrap');
    var inputFireball = setup.querySelector('[name="fireball-color"]');
    window.colorizeElement(fireball, inputFireball, FIREBALL_COLORS, changeElementBackground);
  };


  var wizardSetupHandlers = function () {
    changeWizardCoat();
    changeWizardEyes();
    changeWizardFireball();
  };

  addSimilarWizards();
  wizardSetupHandlers();

})();
