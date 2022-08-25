"use strict";

var _dialogue = require("./dialogue.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

console.log(_dialogue.dialogueArray);
var dialogueOption1 = document.querySelector("#dialogue-option-1");
var dialogueOption2 = document.querySelector("#dialogue-option-2");
var dialogueBox = document.querySelector(".dialogue-box");
var loveBar = document.querySelector(".love-juice");
var optionsBox = document.querySelector(".options-box");

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
  var removedDialogue1 = availableDialogue.splice(objectIndex1, 1);
  var removedDialogue2 = availableDialogue.splice(objectIndex2, 1);
  console.log("these have been removed", removedDialogue1, removedDialogue2);
  console.log("these are the remaining ones", availableDialogue);
};

var handleRandomizer = function handleRandomizer(event) {
  console.log("dialogue box!");
  randomizedDialogue1 = availableDialogue[Math.floor(Math.random() * availableDialogue.length)];
  randomizedDialogue2 = availableDialogue[Math.floor(Math.random() * availableDialogue.length)];
  objectIndex1 = availableDialogue.indexOf(randomizedDialogue1);
  objectIndex2 = availableDialogue.indexOf(randomizedDialogue2);
  console.log(objectIndex1, "this is object1", objectIndex2, "this is object2");
  console.log("chosen options array", randomizedDialogue1, randomizedDialogue2); //if available array is empty then call gameover function

  if (randomizedDialogue1 !== randomizedDialogue2) {
    var playerDialogue1 = randomizedDialogue1.playerDialogue;
    var playerDialogue2 = randomizedDialogue2.playerDialogue;
    capybaraDialogue1 = randomizedDialogue1.capybaraDialogue;
    capybaraDialogue2 = randomizedDialogue2.capybaraDialogue;
    console.log(capybaraDialogue1);
    dialogueOption1.innerHTML = playerDialogue1;
    dialogueOption2.innerHTML = playerDialogue2;
  } else {
    handleRandomizer();
  }
};

var handleDialogue1Chosen = function handleDialogue1Chosen(event) {
  console.log("no.1");
  console.log(capybaraDialogue1);
  capybaraDialogue1 = randomizedDialogue1.capybaraDialogue;
  dialogueBox.innerHTML = capybaraDialogue1;
  handleLoveBar1();
  handleUsedDialogue();
};

var handleDialogue2Chosen = function handleDialogue2Chosen(event) {
  console.log("no.2!");
  console.log(capybaraDialogue2);
  capybaraDialogue2 = randomizedDialogue2.capybaraDialogue;
  dialogueBox.innerHTML = capybaraDialogue2;
  handleLoveBar2();
  handleUsedDialogue();
}; //love bar. if likesDialogue is true, increase love juice by 5%
//switch case???????


var handleLoveBar1 = function handleLoveBar1() {
  console.log("getting to love1!");
  var width = loveBar.style.width.replace("%", "");

  if (randomizedDialogue1.likesDialogue === true) {
    width = parseInt(width) + 5;
    width = width + '%';
    loveBar.style.width = width;
    console.log("he likes!!");
  } else {
    console.log("hates!");
    width = parseInt(width) - 5;
    loveBar.style.width = width + '%';
  }
};

var handleLoveBar2 = function handleLoveBar2() {
  loveBar.style.width = '30%';
  console.log("getting to love2!");

  if (randomizedDialogue2.likesDialogue === true) {
    console.log("he likes!!");
    loveBar.style.width += '5%';
  } else {
    console.log("hates!");
    loveBar.style.width -= '5%';
  }
};

dialogueOption1.addEventListener("click", handleDialogue1Chosen);
dialogueOption2.addEventListener("click", handleDialogue2Chosen);
dialogueBox.addEventListener("click", handleRandomizer);