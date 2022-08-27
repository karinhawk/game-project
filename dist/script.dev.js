"use strict";

var _dialogue = require("./dialogue.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

console.log(_dialogue.dialogueArray);
var dialogueOptions = document.querySelectorAll(".dialogue-options");
var dialogueBox = document.querySelector(".dialogue-box");
var loveBar = document.querySelector(".love-meter");
var tableImage = document.querySelector(".capybara-div");
var playerThoughts = document.querySelector(".player-thoughts");

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
var clicks = 0; // let loveWidth = loveBar.style.width;
// handleRandomizer();
//dialoguerandomizer event
//handleDialogueChosen- output dialogue value of dialogue key
//then call function to change love bar - true and false values and changing of bar view width:)
//for the next set of options
//when click dialogue box call randomiser function
//pull items from array
//happens on start up and when you click on capybara dialogue in dialogue box
//math.random then pull that number from dialogue array TIMES 2
//math.random is 0-1 so times it by number of objects in array
//changes innerhtml of dialogue options box :)

var handleUsedDialogue = function handleUsedDialogue(event) {
  if (dialogueOptions[0]) {
    availableDialogue.splice(objectIndex1, 1);
    console.log("removed 1", randomizedDialogue1);
  } else if (dialogueOptions[1]) {
    availableDialogue.splice(objectIndex2, 1);
    console.log("removed 2", randomizedDialogue2);
  }

  console.log("these are the remaining ones", availableDialogue);
};

var handleGameOver = function handleGameOver() {
  dialogueBox.removeEventListener("click", doesRandomizerRun);
  tableImage.style.backgroundImage = "url(./images/just-table.png)";
  dialogueBox.innerHTML = "Capybara got bored of this awful date and left...";
};

var doesRandomizerRun = function doesRandomizerRun() {
  dialogueBox.style.color = "white";
  dialogueBox.innerHTML = "";

  if (availableDialogue.length <= 1) {
    dialogueOptions[0].innerHTML = "";
    dialogueOptions[1].innerHTML = "";
    handleGameOver();
  } else {
    handleRandomizer();
  }
};

var handleRandomizer = function handleRandomizer(event) {
  console.log("dialogue box!");
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

  handleTypingAnimation(0);
  handleUsedDialogue();
  handleLoveBar();
};

var handleTypingAnimation = function handleTypingAnimation(i) {
  console.log(capybaraResponse.length);

  if (i < capybaraResponse.length) {
    dialogueBox.innerHTML += capybaraResponse.charAt(i);
    i++;
    setTimeout(handleTypingAnimation, 50, i);
  }
};

var handleLoveBar = function handleLoveBar() {
  if (usedDialogue.likesDialogue === true) {
    loveBar.value += 30;
  }

  if (usedDialogue.likesDialogue !== true) {
    loveBar.value -= 5;
  }

  if (loveBar.value >= 100) {
    handleWin();
  }
};

var handleBlush = function handleBlush() {
  setTimeout(function () {
    tableImage.style.backgroundImage = "url(./images/blush-capy.png)";
  }, 1000);
  dialogueBox.innerHTML = "*smooch*";
};

var handleWin = function handleWin() {
  dialogueBox.removeEventListener("click", doesRandomizerRun);
  setTimeout(function () {
    tableImage.style.backgroundImage = "url(./images/front-capy.png)";
    handleBlush();
  }, 1000);
};

var capybaraClicked = function capybaraClicked(event) {
  dialogueBox.innerHTML = "";
  dialogueBox.style.color = "pink";
  dialogueBox.innerHTML = "A very handsome capybara";

  if (loveBar.value >= 100) {
    dialogueBox.innerHTML = "does this capybara have any personal space?";
  }
};

var loveBarClicked = function loveBarClicked(event) {
  clicks++;
  dialogueBox.innerHTML = "";
  dialogueBox.style.color = "pink";
};

var loveBarHarassed = function loveBarHarassed(event) {
  dialogueBox.innerHTML = "";

  if (clicks == 1) {
    dialogueBox.innerHTML = "Don't click up here, click down there.";
  }

  if (clicks == 3) {
    dialogueBox.innerHTML = "You can't force love to happen. Stop messing around up here.";
  }

  if (clicks == 5) {
    dialogueBox.innerHTML = "I think you're bullying me now!!";
  }

  if (clicks == 8) {
    dialogueBox.innerHTML = "You're a HORRIBLE PERSON";
  }

  if (clicks >= 10) {
    dialogueBox.innerHTML = "...";
  }
};

dialogueOptions.forEach(function (option) {
  option.addEventListener("click", handleDialogueChosen);
});
dialogueBox.addEventListener("click", doesRandomizerRun);
tableImage.addEventListener("click", capybaraClicked);
loveBar.addEventListener("click", loveBarClicked);
loveBar.addEventListener("click", loveBarHarassed); //switch case of what mood- dependent on width of lovebar
//case percentage of love bar - 25% aloof 50% friendly 75% flirty 90% romantic
//click capybara
// click counter easter egg on love meter