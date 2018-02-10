'use strict';
(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

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
      wizards[i].coatColor = window.colorize.getRandom('coat');
      wizards[i].eyesColor = window.colorize.getRandom('eyes');
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

  var changeWizardCoat = function () {
    var selectWizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
    var inputWizardCoat = setup.querySelector('[name="coat-color"]');
    selectWizardCoat.addEventListener('click', function () {
      selectWizardCoat.style.fill = inputWizardCoat.value =
          window.colorize.getNextColor('coat');
    });
  };

  var changeWizardEyes = function () {
    var selectWizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
    var inputWizardEyes = setup.querySelector('[name="eyes-color"]');
    selectWizardEyes.addEventListener('click', function () {
      selectWizardEyes.style.fill = inputWizardEyes.value =
          window.colorize.getNextColor('eyes');
    });
  };

  var changeWizardFireball = function () {
    var selectWizardFireball = setup.querySelector('.setup-fireball-wrap');
    var inputWizardFireball = setup.querySelector('[name="fireball-color"]');
    selectWizardFireball.addEventListener('click', function () {
      selectWizardFireball.style.backgroundColor = inputWizardFireball.value =
          window.colorize.getNextColor('fireball');
    });
  };

  var wizardSetupHandlers = function () {
    changeWizardCoat();
    changeWizardEyes();
    changeWizardFireball();
  };

  addSimilarWizards();
  wizardSetupHandlers();
})();
