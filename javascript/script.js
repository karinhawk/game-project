import {
    dialogueArray
} from "./dialogue.js";

console.log(dialogueArray);

const dialogueOptions = document.querySelectorAll(".options__list__items");
const dialogueBox = document.querySelector(".dialogue");
const loveBar = document.querySelector(".love__bar");
const tableImage = document.querySelector(".capybara");
const dialogueOptionsBox = document.querySelector(".options__list");

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

const doesRandomizerRun = () => {
    capybaraResponse = "";
        dialogueBox.style.color = ("white");
        dialogueBox.innerHTML = "";
        tableImage.style.backgroundImage = "url(./images/capybara.png)";
        if (availableDialogue.length <= 1) {
            dialogueOptions[0].innerHTML = "";
            dialogueOptions[1].innerHTML = "";
            handleGameOver();
        } else {
            handleRandomizer();
        }
}

const handleRandomizer = (event) => {
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
        setTimeout(handleTypingAnimation(0), 5000);
        handleSpook();
        handleUsedDialogue();
        handleLoveBar();
}

const handleUsedDialogue = (event) => {
    if (usedDialogue == randomizedDialogue1) {
        availableDialogue.splice(objectIndex1, 1);
        console.log("removed 1", randomizedDialogue1);
    } else if (usedDialogue == randomizedDialogue2) {
        availableDialogue.splice(objectIndex2, 1);
        console.log("removed 2", randomizedDialogue2);
    }
    console.log("these are the remaining ones", availableDialogue);
}


const handleTypingAnimation = (i) => {
    dialogueBox.removeEventListener("click", doesRandomizerRun);
    if (i < capybaraResponse.length) {
        dialogueBox.innerHTML += capybaraResponse.charAt(i);
        i++;
        setTimeout(handleTypingAnimation, 50, i);
    }
    dialogueBox.addEventListener("click", doesRandomizerRun);
}

const handleLoveBar = () => {
    if (usedDialogue.likesDialogue === true) {
        loveBar.value += 12;
    }
    if (usedDialogue.likesDialogue !== true) {
        loveBar.value -= 10;
    }
    if (loveBar.value >= 100) {
        handleWin();
    }
    if (loveBar.value == 0) {
        handleGameOver();
    }
}
const loveBarClicked = (event) => {
    clicks++;
    dialogueBox.innerHTML = "";
    dialogueBox.style.color = ("pink");
}

const loveBarHarassed = (event) => {
    dialogueBox.innerHTML = "";
    switch (clicks) {
        case 1:
            dialogueBox.innerHTML = "Don't click up here, click down there.";
            break;
        case 3:
            dialogueBox.innerHTML = "You can't force love to happen. Stop messing around up here.";
            break;
        case 5:
            dialogueBox.innerHTML = "I think you're bullying me now!!";
            break;
        case 8:
            dialogueBox.innerHTML = "You're a HORRIBLE PERSON";
            break;
        default:
            dialogueBox.innerHTML = "...";
            break;
    }
}

const capybaraClicked = (event) => {
    dialogueBox.innerHTML = "";
    dialogueBox.style.color = ("pink");
    dialogueBox.innerHTML = "A very handsome capybara"
    if (loveBar.value >= 100) {
        dialogueBox.innerHTML = "does this capybara have any personal space?"
    }
}

const handleSpook = async () => {
    if (usedDialogue.playerDialogue == "BOO") {
        capybaraResponse = "";
        tableImage.style.backgroundImage = "url(./images/just-table.png)";
        dialogueBox.innerHTML = "Capybara hides under the table"
    }
}

const handleBlush = () => {
    setTimeout(function () {
        tableImage.style.backgroundImage = "url(./images/blush-capy.png)";
    }, 1000);
    dialogueBox.innerHTML = "*smooch*";
}

const handleWin = () => {
    capybaraResponse = "";
    dialogueBox.removeEventListener("click", doesRandomizerRun);
    setTimeout(function () {
        tableImage.style.backgroundImage = "url(./images/front-capy.png)";
        handleBlush();
    }, 1000);
    returnToInstructions();
}

const handleGameOver = () => {
    capybaraResponse = "";
    dialogueBox.removeEventListener("click", doesRandomizerRun);
    tableImage.style.backgroundImage = "url(./images/just-table.png)";
    dialogueBox.innerHTML = "Capybara got bored of this awful date and left..."
    returnToInstructions();
}

const returnToInstructions = () => {
    const createdButton = document.createElement('a');
	createdButton.href = "index.html";
    const link = document.createTextNode("Go on another date?");
    createdButton.appendChild(link);
    createdButton.className += "button-class";
	dialogueOptionsBox.appendChild(createdButton);
}

dialogueOptions.forEach((option) => {
    option.addEventListener("click", handleDialogueChosen);
});
dialogueBox.addEventListener("click", doesRandomizerRun);
tableImage.addEventListener("click", capybaraClicked);
loveBar.addEventListener("click", loveBarClicked);
loveBar.addEventListener("click", loveBarHarassed);

