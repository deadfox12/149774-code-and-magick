'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var wizardColorsConfig = {
  'coat': {
    'arr': COLORS,
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

var getRandom = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getNextColor = function (color) {
  color.index++;
  if (color.index === color.arr.length) {
    color.index = 0;
  }

  return color.arr[color.index];
};

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
    wizards[i].name = getRandom(NAMES) + ' ' + getRandom(SURNAMES);
    wizards[i].coatColor = getRandom(COLORS);
    wizards[i].eyesColor = getRandom(EYES_COLORS);
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

var initHandlers = function () {
  var userNameInput = setup.querySelector('.setup-user-name');
  var setupOpen = document.querySelector('.setup-open-icon');
  var setupClose = setup.querySelector('.setup-close');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  userNameInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  userNameInput.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscPress);
  });

  userNameInput.addEventListener('invalid', invalidity);
};

var invalidity = function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (target.value.length > 25) {
    target.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (target.value.length === 0) {
    target.setCustomValidity('Обязательное поле');
  } else {
    target.setCustomValidity('');
  }
};

var changeWizardCoat = function () {
  var selectWizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var inputWizardCoat = setup.querySelector('[name="coat-color"]');
  selectWizardCoat.addEventListener('click', function () {
    selectWizardCoat.style.fill = inputWizardCoat.value =
        getNextColor(wizardColorsConfig.coat);
  });
};

var changeWizardEyes = function () {
  var selectWizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var inputWizardEyes = setup.querySelector('[name="eyes-color"]');
  selectWizardEyes.addEventListener('click', function () {
    selectWizardEyes.style.fill = inputWizardEyes.value =
        getNextColor(wizardColorsConfig.eyes);
  });
};

var changeWizardFireball = function () {
  var selectWizardFireball = setup.querySelector('.setup-fireball-wrap');
  var inputWizardFireball = setup.querySelector('[name="fireball-color"]');
  selectWizardFireball.addEventListener('click', function () {
    selectWizardFireball.style.backgroundColor = inputWizardFireball.value =
        getNextColor(wizardColorsConfig.fireball);
  });
};

var wizardSetupHandlers = function () {
  changeWizardCoat();
  changeWizardEyes();
  changeWizardFireball();
};

var setup = document.querySelector('.setup');
initHandlers();
addSimilarWizards();
wizardSetupHandlers();
