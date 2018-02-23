'use strict';
(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setup = document.querySelector('.setup');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var addSimilarWizards = function () {
    var setupSimilar = document.querySelector('.setup-similar');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(window.wizards[i]));
    }

    var similarListElement = document.querySelector('.setup-similar-list');
    similarListElement.appendChild(fragment);
    setupSimilar.classList.remove('hidden');
  };

  var onSuccessLoad = function (data) {
    window.wizards = data;
    addSimilarWizards();
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

  window.backend.load(onSuccessLoad, window.backend.onError);
  wizardSetupHandlers();
})();
