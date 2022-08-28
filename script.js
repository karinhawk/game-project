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
const dialogueOptionsBox = document.querySelector(".options-box");


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
    returnToInstructions();
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
    returnToInstructions();
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

//make switch case!!
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

const returnToInstructions = () => {
    const createdButton = document.createElement('a');
	createdButton.href = "index.html";
    const link = document.createTextNode("Go on another date?");
    createdButton.appendChild(link);
    createdButton.className += "button-class";
    styleButton;
	dialogueOptionsBox.appendChild(createdButton);
}

const styleButton = () => {
    link.style.fontSize = "30px";
    link.style.color = "white";
    link.style.border = "1px solid pink";
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
