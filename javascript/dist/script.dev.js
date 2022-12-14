"use strict";

var _dialogue = require("./dialogue.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

console.log(_dialogue.dialogueArray);
var dialogueOptions = document.querySelectorAll(".options__list__items");
var dialogueBox = document.querySelector(".dialogue");
var loveBar = document.querySelector(".love__bar");
var tableImage = document.querySelector(".capybara");
var dialogueOptionsBox = document.querySelector(".options__list");

var availableDialogue = _toConsumableArray(_dialogue.dialogueArray);

console.log(availableDialogue);
var randomizedDialogue1 = {};
var randomizedDialogue2 = {};
var objectIndex1;
var objectIndex2;
var capybaraDialogue1 = "";
var capybaraDialogue2 = "";
var capybaraResponse = "";
var usedDialogue = "";
var clicks = 0;

var doesRandomizerRun = function doesRandomizerRun() {
  capybaraResponse = "";
  dialogueBox.style.color = "white";
  dialogueBox.innerHTML = "";
  tableImage.style.backgroundImage = "url(./images/capybara.png)";

  if (availableDialogue.length <= 1) {
    dialogueOptions[0].innerHTML = "";
    dialogueOptions[1].innerHTML = "";
    handleGameOver();
  } else {
    handleRandomizer();
  }
};

var handleRandomizer = function handleRandomizer(event) {
  randomizedDialogue1 = availableDialogue[Math.floor(Math.random() * availableDialogue.length)];
  randomizedDialogue2 = availableDialogue[Math.floor(Math.random() * availableDialogue.length)];
  objectIndex1 = availableDialogue.indexOf(randomizedDialogue1);
  objectIndex2 = availableDialogue.indexOf(randomizedDialogue2);

  if (randomizedDialogue1 !== randomizedDialogue2) {
    var playerDialogue1 = randomizedDialogue1.playerDialogue;
    var playerDialogue2 = randomizedDialogue2.playerDialogue;
    capybaraDialogue1 = randomizedDialogue1.capybaraDialogue;
    capybaraDialogue2 = randomizedDialogue2.capybaraDialogue;
    dialogueOptions[0].innerHTML = playerDialogue1;
    dialogueOptions[1].innerHTML = playerDialogue2;
  } else {
    handleRandomizer();
  }
};

var handleDialogueChosen = function handleDialogueChosen(event) {
  dialogueOptions[0].innerHTML = "";
  dialogueOptions[1].innerHTML = "";

  if (event.target == dialogueOptions[0]) {
    usedDialogue = randomizedDialogue1;
    capybaraResponse = capybaraDialogue1;
  } else {
    usedDialogue = randomizedDialogue2;
    capybaraResponse = capybaraDialogue2;
  }

  setTimeout(handleTypingAnimation(0), 5000);
  handleSpook();
  handleUsedDialogue();
  handleLoveBar();
};

var handleUsedDialogue = function handleUsedDialogue(event) {
  if (usedDialogue == randomizedDialogue1) {
    availableDialogue.splice(objectIndex1, 1);
    console.log("removed 1", randomizedDialogue1);
  } else if (usedDialogue == randomizedDialogue2) {
    availableDialogue.splice(objectIndex2, 1);
    console.log("removed 2", randomizedDialogue2);
  }

  console.log("these are the remaining ones", availableDialogue);
};

var handleTypingAnimation = function handleTypingAnimation(i) {
  dialogueBox.removeEventListener("click", doesRandomizerRun);

  if (i < capybaraResponse.length) {
    dialogueBox.innerHTML += capybaraResponse.charAt(i);
    i++;
    setTimeout(handleTypingAnimation, 50, i);
  }

  dialogueBox.addEventListener("click", doesRandomizerRun);
};

var handleLoveBar = function handleLoveBar() {
  if (usedDialogue.likesDialogue === true) {
    loveBar.value += 12;
  }

  if (usedDialogue.likesDialogue !== true) {
    loveBar.value -= 10;
  }

  if (loveBar.value >= 100) {
    handleWin();
  }

  if (loveBar.value == 0) {
    handleGameOver();
  }
};

var loveBarClicked = function loveBarClicked(event) {
  clicks++;
  dialogueBox.innerHTML = "";
  dialogueBox.style.color = "pink";
};

var loveBarHarassed = function loveBarHarassed(event) {
  dialogueBox.innerHTML = "";

  switch (clicks) {
    case 1:
      dialogueBox.innerHTML = "Don't click up here, click down there.";
      break;

    case 3:
      dialogueBox.innerHTML = "You can't force love to happen. Stop messing around up here.";
      break;

    case 5:
      dialogueBox.innerHTML = "I think you're bullying me now!!";
      break;

    case 8:
      dialogueBox.innerHTML = "You're a HORRIBLE PERSON";
      break;

    default:
      dialogueBox.innerHTML = "...";
      break;
  }
};

var capybaraClicked = function capybaraClicked(event) {
  dialogueBox.innerHTML = "";
  dialogueBox.style.color = "pink";
  dialogueBox.innerHTML = "A very handsome capybara";

  if (loveBar.value >= 100) {
    dialogueBox.innerHTML = "does this capybara have any personal space?";
  }
};

var handleSpook = function handleSpook() {
  return regeneratorRuntime.async(function handleSpook$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (usedDialogue.playerDialogue == "BOO") {
            capybaraResponse = "";
            tableImage.style.backgroundImage = "url(./images/just-table.png)";
            dialogueBox.innerHTML = "Capybara hides under the table";
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

var handleBlush = function handleBlush() {
  setTimeout(function () {
    tableImage.style.backgroundImage = "url(./images/blush-capy.png)";
  }, 1000);
  dialogueBox.innerHTML = "*smooch*";
};

var handleWin = function handleWin() {
  capybaraResponse = "";
  dialogueBox.removeEventListener("click", doesRandomizerRun);
  setTimeout(function () {
    tableImage.style.backgroundImage = "url(./images/front-capy.png)";
    handleBlush();
  }, 1000);
  returnToInstructions();
};

var handleGameOver = function handleGameOver() {
  capybaraResponse = "";
  dialogueBox.removeEventListener("click", doesRandomizerRun);
  tableImage.style.backgroundImage = "url(./images/just-table.png)";
  dialogueBox.innerHTML = "Capybara got bored of this awful date and left...";
  returnToInstructions();
};

var returnToInstructions = function returnToInstructions() {
  var createdButton = document.createElement('a');
  createdButton.href = "index.html";
  var link = document.createTextNode("Go on another date?");
  createdButton.appendChild(link);
  createdButton.className += "button-class";
  dialogueOptionsBox.appendChild(createdButton);
};

dialogueOptions.forEach(function (option) {
  option.addEventListener("click", handleDialogueChosen);
});
dialogueBox.addEventListener("click", doesRandomizerRun);
tableImage.addEventListener("click", capybaraClicked);
loveBar.addEventListener("click", loveBarClicked);
loveBar.addEventListener("click", loveBarHarassed);