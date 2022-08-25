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

var availableDialogue = _toConsumableArray(_dialogue.dialogueArray);

console.log(availableDialogue);
var usedDialogue = [];
var randomizedDialogue1 = "";
var randomizedDialogue2 = "";
var playerDialogue1 = "";
var playerDialogue2 = "";
var playerDialogue = playerDialogue1 + playerDialogue2; // handleRandomizer();
//dialoguerandomizer event
//handleDialogueChosen- output dialogue value of dialogue key
//then call function to change love bar - true and false values and changing of bar view width:)
//for the next set of options
//when click dialogue box call randomiser function
//pull items from array
//happens on start up and when you click on lizard dialogue in dialogue box
//math.random then pull that number from dialogue array TIMES 2
//math.random is 0-1 so times it by number of objects in array
//changes innerhtml of dialogue options box :)

var handleRandomizer = function handleRandomizer(event) {
  console.log("dialogue box!");
  var randomizedDialogue1 = availableDialogue[Math.floor(Math.random() * availableDialogue.length)];
  var randomizedDialogue2 = availableDialogue[Math.floor(Math.random() * availableDialogue.length)];

  if (randomizedDialogue1 !== randomizedDialogue2) {
    var _playerDialogue = randomizedDialogue1.playerDialogue;
    var _playerDialogue2 = randomizedDialogue2.playerDialogue;
    dialogueOption1.innerHTML = _playerDialogue;
    dialogueOption2.innerHTML = _playerDialogue2;
    return _playerDialogue, _playerDialogue2;
  } // console.log(randomizedDialogue1);
  // console.log(randomizedDialogue2);
  // console.log(playerDialogue1);
  // console.log(playerDialogue2);

}; //handle dialogue chosen. change innerhtml of dialogue box to be lizardDialogue
//push used dialogue into usedialogue array
//remove from available dialogue array


var handleDialogue1Chosen = function handleDialogue1Chosen(event) {
  var lizardDialogue = randomizedDialogue1.lizardDialogue;
  dialogueBox.innerHTML = lizardDialogue;
  handleUsedDialogue();
};

var handleDialogue2Chosen = function handleDialogue2Chosen(event) {
  var lizardDialogue = randomizedDialogue1.lizardDialogue;
  dialogueBox.innerHTML = lizardDialogue;
  handleUsedDialogue();
};

var handleUsedDialogue = function handleUsedDialogue() {
  var takeOutDialogue1 = availableDialogue.splice(randomizedDialogue1);
  var takeOutDialogue2 = availableDialogue.splice(randomizedDialogue2);
  randomizedDialogue1.push(takeOutDialogue1);
  randomizedDialogue2.push(takeOutDialogue2);
}; //love bar. if likesDialogue is true, increase love juice by 5%
// handleLoveBar = () => {}


dialogueOption1.addEventListener("click", handleDialogue1Chosen);
dialogueOption2.addEventListener("click", handleDialogue2Chosen);
dialogueBox.addEventListener("click", handleRandomizer);