//goals for today -    SORT THE BLOODY LOVE BAR ; PSEUDOCODE LEVELS OF AFFECTION


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
let capybaraResponse = "";
let usedDialogue = "";
let loveWidth = loveBar.style.width;



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
    tableImage.style.backgroundImage = "url(./images/just-table.png)";
    dialogueBox.innerHTML = "Capybara got bored of this awful date and left..."
}

const doesRandomizerRun = () => {
    dialogueBox.innerHTML = "";
    if (availableDialogue.length <= 1) {
        dialogueOptions[0].innerHTML = "";
        dialogueOptions[1].innerHTML = "";
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
        dialogueOptions[0].innerHTML = playerDialogue1;
        dialogueOptions[1].innerHTML = playerDialogue2;
    } else {
        handleRandomizer();
    }
}


const handleDialogueChosen = (event) => {
    if (event.target == dialogueOptions[0]) {
        console.log("got here");
        usedDialogue = randomizedDialogue1;
        capybaraResponse = capybaraDialogue1;
    } else {
        console.log("got here instead");
        usedDialogue = randomizedDialogue2;
        capybaraResponse = capybaraDialogue2;
    }
    handleTypingAnimation(0);
    handleUsedDialogue();
    handleLoveBar();
}

const handleTypingAnimation = (i) => {
    console.log(capybaraResponse.length);
        if (i < capybaraResponse.length) {
            console.log("typing");
          dialogueBox.innerHTML += capybaraResponse.charAt(i);
          i++;
          setTimeout(handleTypingAnimation, 50, i);
        }
}

const handleLoveBar = () => {
    if (usedDialogue.likesDialogue === true) {
        loveWidth += ("5%");
    } 
    if (usedDialogue.likesDialogue !== true) {
        loveWidth -= ("5%");
    }
}


dialogueOptions.forEach((option) => {
    option.addEventListener("click", handleDialogueChosen);
});

dialogueBox.addEventListener("click", doesRandomizerRun);

//switch case of what mood- dependent on width of lovebar
//case percentage of love bar - 25% aloof 50% friendly 75% flirty 90% romantic