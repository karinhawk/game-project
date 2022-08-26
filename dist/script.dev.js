"use strict";

var _dialogue = require("./dialogue.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

console.log(_dialogue.dialogueArray);
var dialogueOptions = document.querySelectorAll(".dialogue-options");
var dialogueBox = document.querySelector(".dialogue-box");
var loveBar = document.querySelector(".love-juice");
var tableImage = document.querySelector(".capybara-div");

var availableDialogue = _toConsumableArray(_dialogue.dialogueArray);

console.log(availableDialogue); //let usedDialogue = "";

var randomizedDialogue1 = {};
var randomizedDialogue2 = {};
var objectIndex1;
var objectIndex2;
var capybaraDialogue1 = "";
var capybaraDialogue2 = ""; // handleRandomizer();
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

var handleUsedDialogue = function handleUsedDialogue() {
  //if else here so doesnt remove both
  if (event.target == dialogueOptions[0]) {
    availableDialogue.splice(objectIndex1, 1);
  } else if (event.target == dialogueOptions[1]) {
    availableDialogue.splice(objectIndex2, 1);
  }

  console.log("these are the remaining ones", availableDialogue);
};

var handleGameOver = function handleGameOver() {
  dialogueBox.removeEventListener("click", doesRandomizerRun);
  tableImage.style.backgroundImage = "./images/just-table.png";
};

var doesRandomizerRun = function doesRandomizerRun() {
  if (availableDialogue.length <= 1) {
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
    console.log(capybaraDialogue1);
    dialogueOptions[0].innerHTML = playerDialogue1;
    dialogueOptions[1].innerHTML = playerDialogue2;
  } else {
    handleRandomizer();
  }
};

var handleDialogueChosen = function handleDialogueChosen(event) {
  if (event.target == dialogueOptions[0]) {
    console.log("got here");
    dialogueBox.innerHTML = capybaraDialogue1;
  } else {
    console.log("got here instead");
    dialogueBox.innerHTML = capybaraDialogue2;
  }

  handleUsedDialogue();
  handleLoveBar();
};

var handleLoveBar = function handleLoveBar() {
  //guard clause here!!
  if (dialogueOptions[0]) {
    if (randomizedDialogue1.likesDialogue === true) {
      console.log("likes");
    } else {
      console.log("hates!");
    }
  } else if (randomizedDialogue2) {
    console.log("likes");
  } else {
    console.log("hates!");
  }
}; //     console.log("getting to love1!");
//     let width = loveBar.style.width.replace("%", "");
//     if (randomizedDialogue1.likesDialogue === true) {
//         width = parseInt(width) + 5;
//         width = width + '%';
//         loveBar.style.width = width;
//         console.log("he likes!!");
//     } else {
//         console.log("hates!");
//         width = parseInt(width) - 5;
//         loveBar.style.width = width + '%';
//     }


dialogueOptions.forEach(function (option) {
  option.addEventListener("click", handleDialogueChosen);
});
dialogueBox.addEventListener("click", doesRandomizerRun);