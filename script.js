//if have time- have a main menu!
//have some dialogue to click on at the start


import {
    dialogueArray
} from "./dialogue.js";

console.log(dialogueArray);

const dialogueOptions = document.querySelectorAll(".dialogue-options");
const dialogueBox = document.querySelector(".dialogue-box");
const loveBar = document.querySelector(".love-meter");
const tableImage = document.querySelector(".capybara-div");
const playerThoughts = document.querySelector(".player-thoughts")

let availableDialogue = [...dialogueArray];
console.log(availableDialogue);

let randomizedDialogue1 = {};
let randomizedDialogue2 = {};
let objectIndex1;
let objectIndex2;
let capybaraDialogue1 = "";
let capybaraDialogue2 = "";
let capybaraResponse = "";
let usedDialogue = "";
let clicks = 0;
// let loveWidth = loveBar.style.width;



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


const handleUsedDialogue = (event) => {
    if (dialogueOptions[0]) {
        availableDialogue.splice(objectIndex1, 1);
        console.log("removed 1", randomizedDialogue1);
    } else if (dialogueOptions[1]) {
        availableDialogue.splice(objectIndex2, 1);
        console.log("removed 2", randomizedDialogue2);
    }
    console.log("these are the remaining ones", availableDialogue);
}

const handleGameOver = () => {
    dialogueBox.removeEventListener("click", doesRandomizerRun);
    tableImage.style.backgroundImage = "url(./images/just-table.png)";
    dialogueBox.innerHTML = "Capybara got bored of this awful date and left..."
}

const doesRandomizerRun = () => {
    dialogueBox.style.color = ("white");
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
}

const handleTypingAnimation = (i) => {
    console.log(capybaraResponse.length);
    if (i < capybaraResponse.length) {
        dialogueBox.innerHTML += capybaraResponse.charAt(i);
        i++;
        setTimeout(handleTypingAnimation, 50, i);
    }
}

const handleLoveBar = () => {
    if (usedDialogue.likesDialogue === true) {
        loveBar.value += 30;
    }
    if (usedDialogue.likesDialogue !== true) {
        loveBar.value -= 5;
    }
    if (loveBar.value >= 100) {
        handleWin();
    }
}

const handleBlush = () => {
    setTimeout(function () {
        tableImage.style.backgroundImage = "url(./images/blush-capy.png)";
    }, 1000);
    dialogueBox.innerHTML = "*smooch*";
}

const handleWin = () => {
    dialogueBox.removeEventListener("click", doesRandomizerRun);
    setTimeout(function () {
        tableImage.style.backgroundImage = "url(./images/front-capy.png)";
        handleBlush();
    }, 1000);
}

const capybaraClicked = (event) => {
    dialogueBox.innerHTML = "";
    dialogueBox.style.color = ("pink");
    dialogueBox.innerHTML = "A very handsome capybara"
    if (loveBar.value >= 100) {
        dialogueBox.innerHTML = "does this capybara have any personal space?"
    }
}

const loveBarClicked = (event) => {
    clicks++;
    dialogueBox.innerHTML = "";
    dialogueBox.style.color = ("pink");
}

const loveBarHarassed = (event) => {
    dialogueBox.innerHTML = "";
    if (clicks == 1) {
        dialogueBox.innerHTML = "Don't click up here, click down there."
    }
    if (clicks == 3) {
        dialogueBox.innerHTML = "You can't force love to happen. Stop messing around up here."
    }
    if (clicks == 5) {
        dialogueBox.innerHTML = "I think you're bullying me now!!"
    }
    if (clicks == 8) {
        dialogueBox.innerHTML = "You're a HORRIBLE PERSON"
    }
    if (clicks >= 10) {
        dialogueBox.innerHTML = "..."
    }
}



dialogueOptions.forEach((option) => {
    option.addEventListener("click", handleDialogueChosen);
});

dialogueBox.addEventListener("click", doesRandomizerRun);

tableImage.addEventListener("click", capybaraClicked);

loveBar.addEventListener("click", loveBarClicked);
loveBar.addEventListener("click", loveBarHarassed);

//switch case of what mood- dependent on width of lovebar
//case percentage of love bar - 25% aloof 50% friendly 75% flirty 90% romantic
//click capybara
// click counter easter egg on love meter