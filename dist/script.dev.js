"use strict";

var _dialogue = require("./dialogue.js");

// two dialogue options one good and one bad, if good then make love bar go up by 1 point
// say something good about lizards and you get 2 points!
// elements on page= lizard, table, background, lovebar, dialogue options, dialogue box
//love bar- change width of div
//array of dialogue options
//each option has a different response
//randomize array and choose 1 and 2 each time?
//use math.random to pull same amount of random numbers that the length of the array is, then
//make array (have in separate file!) of object value pairs- options and responses
console.log(_dialogue.dialogueArray);