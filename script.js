//goals for today -    SORT THE BLOODY LOVE BAR ; ASK FOR HELP ABOUT CONDENSING ; SORT OUT THE AVAILABLE ARRAY BUG LOOP


//BUGS!!!!!!!!!!
//

//if have time- have a main menu!
//have some dialogue to click on at the start

// two dialogue options one good and one bad, if good then make love bar go up by 1 point
// say something good about capybaras and you get 2 points!
// elements on page= capybara, table, background, lovebar, dialogue options, dialogue box

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
const dialogueBox = document.querySelector(".dialogue-box");
const loveBar = document.querySelector(".love-juice");
const optionsBox = document.querySelector(".options-box")

let availableDialogue = [...dialogueArray];
console.log(availableDialogue);
//let usedDialogue = "";
let randomizedDialogue1 = {};
let randomizedDialogue2 = {};
let objectIndex1;
let objectIndex2;
let capybaraDialogue1 = "";
let capybaraDialogue2 = "";

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


const handleUsedDialogue = () => {
    let removedDialogue1 = availableDialogue.splice(objectIndex1, 1);
    let removedDialogue2 = availableDialogue.splice(objectIndex2, 1);
    console.log("these have been removed", removedDialogue1, removedDialogue2);
    console.log("these are the remaining ones", availableDialogue);
}

const handleRandomizer = (event) => {
    console.log("dialogue box!");
    randomizedDialogue1 = availableDialogue[Math.floor(Math.random()*availableDialogue.length)];
    randomizedDialogue2 = availableDialogue[Math.floor(Math.random()*availableDialogue.length)];
    objectIndex1 = availableDialogue.indexOf(randomizedDialogue1);
    objectIndex2 = availableDialogue.indexOf(randomizedDialogue2);
    console.log(objectIndex1, "this is object1", objectIndex2, "this is object2");
    console.log("chosen options array", randomizedDialogue1, randomizedDialogue2);

    //if available array is empty then call gameover function

    if (randomizedDialogue1 !== randomizedDialogue2) {

        let playerDialogue1 = randomizedDialogue1.playerDialogue;
        let playerDialogue2 = randomizedDialogue2.playerDialogue;
        capybaraDialogue1 = randomizedDialogue1.capybaraDialogue;
        capybaraDialogue2 = randomizedDialogue2.capybaraDialogue;
        console.log(capybaraDialogue1);
        dialogueOption1.innerHTML = playerDialogue1;
        dialogueOption2.innerHTML = playerDialogue2;
    } else {
        handleRandomizer();
    }
}



const handleDialogue1Chosen = (event) => {
    console.log("no.1");
    console.log(capybaraDialogue1);
   capybaraDialogue1 = randomizedDialogue1.capybaraDialogue;
   dialogueBox.innerHTML = capybaraDialogue1;
   handleLoveBar1();
   handleUsedDialogue();
}

const handleDialogue2Chosen = (event) => {
    console.log("no.2!");
    console.log(capybaraDialogue2);
   capybaraDialogue2 = randomizedDialogue2.capybaraDialogue;
   dialogueBox.innerHTML = capybaraDialogue2;
   handleLoveBar2();
   handleUsedDialogue();
}



//love bar. if likesDialogue is true, increase love juice by 5%
//switch case???????
const handleLoveBar1 = () => {
    console.log("getting to love1!");
    let width = loveBar.style.width.replace("%", "");
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
}

const handleLoveBar2 = () => {
    loveBar.style.width = '30%';
    console.log("getting to love2!");
    if (randomizedDialogue2.likesDialogue === true) {
        console.log("he likes!!");
        loveBar.style.width += '5%';
    } else {
        console.log("hates!");
        loveBar.style.width -= '5%';
    }
}




dialogueOption1.addEventListener("click", handleDialogue1Chosen);

dialogueOption2.addEventListener("click", handleDialogue2Chosen);

dialogueBox.addEventListener("click", handleRandomizer);
