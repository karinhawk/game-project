//if have time- have a main menu!
//have some dialogue to click on at the start

// two dialogue options one good and one bad, if good then make love bar go up by 1 point
// say something good about lizards and you get 2 points!
// elements on page= lizard, table, background, lovebar, dialogue options, dialogue box

//love bar- change width of div
//array of dialogue options
//each option has a different response
//randomize array and choose 1 and 2 each time?
//use math.random to pull same amount of random numbers that the length of the array is, then

//make array (have in separate file!) of object value pairs- options and responses

//maybe do not able to choose the same player dialogue again
// if you run out of dialogue then the game is over :)

import {
    dialogueArray
} from "./dialogue.js";

console.log(dialogueArray);

const dialogueOption1 = document.querySelector("#dialogue-option-1");
const dialogueOption2 = document.querySelector("#dialogue-option-2");
const dialogueBox = document.querySelector(".dialogue-box")

let availableDialogue = [...dialogueArray];
console.log(availableDialogue);
let usedDialogue = [];
let randomizedDialogue1 = "";
let randomizedDialogue2 = "";
let playerDialogue1 = "";
let playerDialogue2 = "";
let playerDialogue = playerDialogue1 + playerDialogue2;

// handleRandomizer();

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
const handleRandomizer = (event) => {
    console.log("dialogue box!");
    let randomizedDialogue1 = availableDialogue[Math.floor(Math.random()*availableDialogue.length)];
    let randomizedDialogue2 = availableDialogue[Math.floor(Math.random()*availableDialogue.length)];
    if (randomizedDialogue1 !== randomizedDialogue2) {
        let playerDialogue1 = randomizedDialogue1.playerDialogue;
        let playerDialogue2 = randomizedDialogue2.playerDialogue;
        dialogueOption1.innerHTML = playerDialogue1;
        dialogueOption2.innerHTML = playerDialogue2;
        return playerDialogue1, playerDialogue2;
    }
    // console.log(randomizedDialogue1);
    // console.log(randomizedDialogue2);
    // console.log(playerDialogue1);
    // console.log(playerDialogue2);
}

//handle dialogue chosen. change innerhtml of dialogue box to be lizardDialogue
//push used dialogue into usedialogue array
//remove from available dialogue array
const handleDialogue1Chosen = (event) => {
   let lizardDialogue = randomizedDialogue1.lizardDialogue;
   dialogueBox.innerHTML = lizardDialogue

   handleUsedDialogue();
   
}

const handleDialogue2Chosen = (event) => {
    let lizardDialogue = randomizedDialogue1.lizardDialogue;
    dialogueBox.innerHTML = lizardDialogue
 
    handleUsedDialogue();
    
 }

const handleUsedDialogue = () => {
    let takeOutDialogue1 = availableDialogue.splice(randomizedDialogue1);
    let takeOutDialogue2 = availableDialogue.splice(randomizedDialogue2);
    randomizedDialogue1.push(takeOutDialogue1);
    randomizedDialogue2.push(takeOutDialogue2);
}

//love bar. if likesDialogue is true, increase love juice by 5%
// handleLoveBar = () => {}




dialogueOption1.addEventListener("click", handleDialogue1Chosen);

dialogueOption2.addEventListener("click", handleDialogue2Chosen);

dialogueBox.addEventListener("click", handleRandomizer);
