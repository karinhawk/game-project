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

const dialogueOptions = document.querySelectorAll(".dialogue-options");
const dialogueBox = document.querySelector(".dialogue-box");
const loveBar = document.querySelector(".love-juice");
const tableImage = document.querySelector(".capybara-div");

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
    //if else here so doesnt remove both
    if (event.target == dialogueOptions[0]) {
        availableDialogue.splice(objectIndex1, 1);
    } else if (event.target == dialogueOptions[1]) {
        availableDialogue.splice(objectIndex2, 1);
    }
    console.log("these are the remaining ones", availableDialogue);
}

const handleGameOver = () => {
    dialogueBox.removeEventListener("click", doesRandomizerRun);
    tableImage.style.backgroundImage = "./images/just-table.png";
}

const doesRandomizerRun = () => {
    if (availableDialogue.length <= 1) {
        handleGameOver();
    } else {
        handleRandomizer();
    }    
}

const handleRandomizer = (event) => {
    console.log("dialogue box!");
    randomizedDialogue1 = availableDialogue[Math.floor(Math.random() * availableDialogue.length)];
    randomizedDialogue2 = availableDialogue[Math.floor(Math.random() * availableDialogue.length)];
    objectIndex1 = availableDialogue.indexOf(randomizedDialogue1);
    objectIndex2 = availableDialogue.indexOf(randomizedDialogue2);
    
    if (randomizedDialogue1 !== randomizedDialogue2) {

        let playerDialogue1 = randomizedDialogue1.playerDialogue;
        let playerDialogue2 = randomizedDialogue2.playerDialogue;
        capybaraDialogue1 = randomizedDialogue1.capybaraDialogue;
        capybaraDialogue2 = randomizedDialogue2.capybaraDialogue;
        console.log(capybaraDialogue1);
        dialogueOptions[0].innerHTML = playerDialogue1;
        dialogueOptions[1].innerHTML = playerDialogue2;
    } else {
        handleRandomizer();
    }
}


const handleDialogueChosen = (event) => {
    if (event.target == dialogueOptions[0]) {
        console.log("got here");
        dialogueBox.innerHTML = capybaraDialogue1;
    } else {
        console.log("got here instead");
        dialogueBox.innerHTML = capybaraDialogue2;
    }
    handleUsedDialogue();
    handleLoveBar();
}



const handleLoveBar = () => {
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
}
//     console.log("getting to love1!");
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





dialogueOptions.forEach((option) => {
    option.addEventListener("click", handleDialogueChosen);
});

dialogueBox.addEventListener("click", doesRandomizerRun);