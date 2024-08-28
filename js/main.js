/*
Code Copyright Carisdev, 2024.
Hi, this is all the main file based on jQuery library. I'm a dev, indie for now, and it's my pleasure presents to you this clicker.
I made it just to practice coding and learn about it.
*/

//Constants
const doubleCursorPrice = 10;
const autoClickPrice = 20;
const quadrupleCursorPrice = 30;
const autoClick2xPrice = 40;
const octupleCursorPrice = 50;
const sixteentimesCursorPrice = 70;
const porcentajeCursor = 20;
const sumPercentage = 0.1;
const doubleIncrement = 2;
const multiple_10 = 10;
const timeLimitWindow = 10;
const dimensionsLimit = 100;
const dimensionTomatoFalling = 960;
const dimensionWheelHorizontal = 685;

//Variables
let docName = document.title;
let backgroundMusic = document.getElementById("background-music");
let clickSound = document.getElementById("click-sound");
let tomatoSound = document.getElementById("tomato-sound");
let upgradeHoverSound = $("#upgrade-hover-sound")[0];
let upgradeAnimationSound = document.getElementById("upgrade-animation-sound");
let upgradeElements = document.getElementsByClassName("upgrade-one");
let idleCursorPrice = document.getElementById("idle-cursor-price").textContent;
let idleWheelPrice = document.getElementById("idle-wheel-price").textContent;
let idleCursorUpgrades = document.getElementById("idle-cursor-upgrades-headline").textContent;
let idleWheelUpgrades = document.getElementById("idle-wheel-upgrades-headline").textContent;
let secondsLeft = document.getElementById("seconds-left").textContent;
let slider = document.getElementById("myRange");
let output = document.getElementById("volume-percentage");
let sliderMusic = document.getElementById("myMusicRange");
let outputMusic = document.getElementById("music-percentage");
let doubleCursorUpgradeRemoved = false;
let autoClickUpgradeRemoved = false;
let quadrupleCursorUpgradeRemoved = false;
let autoClick2xUpgradeRemoved = false;
let octupleCursorUpgradeRemoved = false;
let sixteentimesCursorUpgradeRemoved = false;
let boughtUpgrade = false;
let muteVolumeUp = false;
let muteVolumeUp2 = false;
let muteHighVolume = false;
let muteMusicUp = false;
let muteMusicUp2 = false;
let muteHighMusic = false;
let saveIncrement = 0;
let clickingNumber = 0;
let tomatoFalling = 0;
let wheelMoving = 0;
let percentageIdleCursor = 0;
let percentageIdleWheel = 0;
let idleCursorIncrement = 2;
let intervalCursor;
let intervalWheel;
let autoWheel;
let loadTimer;
let roundedNumber;
let amountTomatoes = document.getElementById("tomato-headline-small").textContent;
let numTomatoes = 0;
let idleCursorPriceText;
let idleWheelPriceText;

function loadingPage() {
    //Set a loader for the main page.
    loadTimer = setTimeout(showPage, 1000);
    
    //Disable mouse selection
    //Internet Explorer
    document.onselectstart = function() {
        return false;
    }
    //Firefox / Other Browser
    document.onmousedown = function() {
        return false;
    }
    
    //Start all sounds with the same volume percentage as in the html file.
    tomatoSound.volume = 0.5;
    clickSound.volume = 0.5;
    upgradeHoverSound.volume = 0.5;
    upgradeAnimationSound.volume = 0.5;

    //The user must interact with the DOM.
    let promise = document.querySelector('audio').play();

    if (promise !== undefined) {
        promise.then(_ => {
            // Autoplay started!
        }).catch(() => {
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
        });
    }
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("clicker-container").style.display = "block";
    $("#loader-div").hide();
    
    $(document).ready(function() {
        console.log("Document is ready!");
    });
}

//Close the options menu when 'Esc' key has been pressed.
$(document).on('keydown', function(event) {
    if (event.key == "Escape") {
        $("#options-menu-div").hide();
        if($("body").width() <= "766") {
            $(".upgrades-div").hide();
        }
    }
});

//Open the upgrades menu
function openMenuUpgrades() {
    if($("body").width() <= "766") {
        $(".upgrades-div").css("height", "120px");
        $(".upgrades-div").toggle();
        $(".upgrades-headline").hide();
        $(".vertical-menu-upgrades").show();
        $(".idle-upgrades-headline").hide();
        $(".vertical-menu").hide();
        $(".idle-upgrades").hide();
    }
}

//Open the idle upgrades menu
function openMenuIdleUpgrades() {
    if($("body").width() <= "766") {
        $(".upgrades-div").css("height", "100%");
        $(".upgrades-div").toggle();
        $(".upgrades-headline").hide();
        $(".vertical-menu-upgrades").hide();
        $(".idle-upgrades-headline").hide();
        $(".vertical-menu").show();
        $(".idle-upgrades").show();
    }
}

//Show the options menu when clicked on the options button.
function optionsClick() {
    $("#options-menu-div").toggle();
}

$("#options-div").mouseenter(function() {
    $("#options-div").css("background-color", "black");
});

$("#options-div").mouseleave(function() {
    $("#options-div").css("background-color", "rgba(0, 0, 0, 0.6)");
});

$(".upgrade-one").mouseenter(function() {
    enableUpgrades();
});

//Change the subject in case of singular or plural.
function tomatoesSubject() {
    let tomatoesName = "";

    if(numTomatoes === 1) {
        tomatoesName = "tomato";
    }
    else {
        tomatoesName = "tomatoes";
    }

    return tomatoesName;
}

//Start the document title to be the same as the tomatoes clicked.
roundedNumber = nFormatter(numTomatoes);
document.title = roundedNumber + " " + tomatoesSubject() + " - " + docName;

//Enable the upgrades when have the money required for each one.
function enableUpgrades() {
    let imagesUpgrades = document.querySelectorAll("img");

    for(let i=0; i < imagesUpgrades.length; i++) {
        let ids = imagesUpgrades[i].id;
        switch(ids) {
            case "double-cursor-upgrade":
                if(numTomatoes >= doubleCursorPrice) {
                    $("#double-cursor-upgrade").css("filter", "brightness(110%)");
                    $("#double-click-description").css("filter", "brightness(110%)");
                    $("#double-click-money").css("color", "#38c500");
                }
                else{
                    $("#double-cursor-upgrade").css("filter", "brightness(80%)");
                    $("#double-click-description").css("filter", "brightness(80%)");
                    $("#double-click-money").css("color", "red");
                }
                break;
            case "auto-click-upgrade":
                if(numTomatoes >= autoClickPrice) {
                    $("#auto-click-upgrade").css("filter", "brightness(110%)");
                    $("#auto-click-description").css("filter", "brightness(110%)");
                    $("#auto-click-money").css("color", "#38c500");
                }
                else{
                    $("#auto-click-upgrade").css("filter", "brightness(80%)");
                    $("#auto-click-description").css("filter", "brightness(80%)");
                    $("#auto-click-money").css("color", "red");
                }
                break;
            case "quadruple-cursor-upgrade":
                if(numTomatoes >= quadrupleCursorPrice) {
                    $("#quadruple-cursor-upgrade").css("filter", "brightness(110%)");
                    $("#quadruple-click-description").css("filter", "brightness(110%)");
                    $("#quadruple-click-money").css("color", "#38c500");
                }
                else{
                    $("#quadruple-cursor-upgrade").css("filter", "brightness(80%)");
                    $("#quadruple-click-description").css("filter", "brightness(80%)");
                    $("#quadruple-click-money").css("color", "red");
                }
                break;
            case "auto-click-2x-upgrade":
                if(numTomatoes >= autoClick2xPrice) {
                    $("#auto-click-2x-upgrade").css("filter", "brightness(110%)");
                    $("#auto-click-2x-description").css("filter", "brightness(110%)");
                    $("#auto-click-2x-money").css("color", "#38c500");
                }
                else{
                    $("#auto-click-2x-upgrade").css("filter", "brightness(80%)");
                    $("#auto-click-2x-description").css("filter", "brightness(80%)");
                    $("#auto-click-2x-money").css("color", "red");
                }
                break;
            case "octuple-cursor-upgrade":
                if(numTomatoes >= octupleCursorPrice) {
                    $("#octuple-cursor-upgrade").css("filter", "brightness(110%)");
                    $("#octuple-click-description").css("filter", "brightness(110%)");
                    $("#octuple-click-money").css("color", "#38c500");
                }
                else{
                    $("#octuple-cursor-upgrade").css("filter", "brightness(80%)");
                    $("#octuple-click-description").css("filter", "brightness(80%)");
                    $("#octuple-click-money").css("color", "red");
                }
                break;
            case "sixteentimes-cursor-upgrade":
                if(numTomatoes >= sixteentimesCursorPrice) {
                    $("#sixteentimes-cursor-upgrade").css("filter", "brightness(110%)");
                    $("#sixteentimes-click-description").css("filter", "brightness(110%)");
                    $("#sixteentimes-click-money").css("color", "#38c500");
                }
                else{
                    $("#sixteentimes-cursor-upgrade").css("filter", "brightness(80%)");
                    $("#sixteentimes-click-description").css("filter", "brightness(80%)");
                    $("#sixteentimes-click-money").css("color", "red");
                }
                break;
            default:
                break;
        }
    }
}

//Show the clicking number going up.
function animationTomatoClicking(event) {
    clickingNumber++;

    $("#tomato-img").append('<div id="clickingNumber'+clickingNumber+'" hidden>+'+saveIncrement+'</div>');
    $("#clickingNumber"+clickingNumber).css("top", event.clientY - 30)
    .css("left", event.clientX - 10)
    .css("position", "absolute")
    .css("zIndex", "3")
    .css("width", "20px")
    .css("height", "20px")
    .css("color", "white")
    .css("font-weight", "bold")
    .css("font-size", "1.5em")
    .css("font-family", "Poetsen One")
    .css("text-shadow", "1px 1px #000")
    .css("animation", "GoUp 2s forwards linear")
    .show();

    const nodeChild = document.getElementById("clickingNumber"+clickingNumber);

    setTimeout(() => {
        nodeChild.parentNode.removeChild(nodeChild);
    }, 2000);
}

//Spawns tomatoes at random positions that fall on the tomato div background.
function animationTomatoFalling() {
    let tomatoDiv = document.querySelector(".tomato-div");
    let dimensions = tomatoDiv.getBoundingClientRect();
    let dimensionTop = dimensions.top;
    //960px is the distance from the left of the screen to the right side of the div.
    let dimensionLeft = Math.floor(Math.random()*dimensionTomatoFalling);

    tomatoFalling++;
    $(".tomato-div").append('<img src="images/tomato.png" id="tomatoFalling'+tomatoFalling+'" hidden>');
    $("#tomatoFalling"+tomatoFalling).css("top", dimensionTop + dimensionsLimit);
    if (dimensionLeft > (dimensions.left + dimensionsLimit) && dimensionLeft < (dimensions.right - dimensionsLimit)) {
        $("#tomatoFalling"+tomatoFalling).css("left", dimensionLeft);
    }
    $("#tomatoFalling"+tomatoFalling).css("position", "absolute")
    .css("zIndex", "1")
    .css("width", "40px")
    .css("height", "40px")
    .css("animation", "GoDown 3s forwards linear")
    .show();
        
    const nodeChild = document.getElementById("tomatoFalling"+tomatoFalling);

    setTimeout(() => {
        nodeChild.parentNode.removeChild(nodeChild);
    }, 3000);
}

//Spawns tomatoes at random positions that fall on the tomato div background.
function animationWheelHorizontal() {
    let tomatoDiv = document.querySelector(".tomato-div");
    let dimensions = tomatoDiv.getBoundingClientRect();
    let dimensionLeft = dimensions.left;
    let dimensionTop = Math.floor(Math.random()*dimensionWheelHorizontal);

    wheelMoving++;
    $(".tomato-div").append('<img src="images/wheel2.png" id="wheelMoving'+wheelMoving+'" hidden>');
    $("#wheelMoving"+wheelMoving).css("left", dimensionLeft + dimensionsLimit);
    if (dimensionTop > (dimensions.top + dimensionsLimit) && dimensionTop < (dimensions.bottom - dimensionsLimit)) {
        $("#wheelMoving"+wheelMoving).css("top", dimensionTop);
    }
    $("#wheelMoving"+wheelMoving).css("position", "absolute")
    .css("zIndex", "1")
    .css("width", "40px")
    .css("height", "40px")
    .css("animation","GoRight 3s forwards linear")
    .show();

    const nodeChild = document.getElementById("wheelMoving"+wheelMoving);

    setTimeout(() => {
        nodeChild.parentNode.removeChild(nodeChild);
    }, 3000);
}

//Format the tomatoes number with the corresponding unit.
function nFormatter(num) {
    let numAbs = Math.abs(num);
    let result = 0;

    switch (true) {
        case numAbs >= Math.pow(10,3) && numAbs < Math.pow(10,6):
            result = Math.sign(num)*((numAbs/Math.pow(10,3)).toFixed(2)) + ' k';
            break;
        case numAbs >= Math.pow(10,6) && numAbs < Math.pow(10,9):
            result = Math.sign(num)*((numAbs/Math.pow(10,6)).toFixed(2)) + ' million';
            break;
        case numAbs >= Math.pow(10,9) && numAbs < Math.pow(10,12):
            result = Math.sign(num)*((numAbs/Math.pow(10,6)).toFixed(2)) + ' billion';
            break;
        case numAbs >= Math.pow(10,12) && numAbs < Math.pow(10,15):
            result = Math.sign(num)*((numAbs/Math.pow(10,9)).toFixed(2)) + ' trillion';
            break;
        case numAbs >= Math.pow(10,15) && numAbs < Math.pow(10,18):
            result = Math.sign(num)*((numAbs/Math.pow(10,12)).toFixed(2)) + ' quadrillion';
            break;
        case numAbs >= Math.pow(10,18) && numAbs < Math.pow(10,21):
            result = Math.sign(num)*((numAbs/Math.pow(10,15)).toFixed(2)) + ' quintillion';
            break;
        case numAbs >= Math.pow(10,21) && numAbs < Math.pow(10,24):
            result = Math.sign(num)*((numAbs/Math.pow(10,18)).toFixed(2)) + ' sextillion';
            break;
        case numAbs >= Math.pow(10,24) && numAbs < Math.pow(10,27):
            result = Math.sign(num)*((numAbs/Math.pow(10,18)).toFixed(2)) + ' septillion';
            break;
        case numAbs >= Math.pow(10,27) && numAbs < Math.pow(10,30):
            result = Math.sign(num)*((numAbs/Math.pow(10,18)).toFixed(2)) + ' octillion';
            break;
        case numAbs >= Math.pow(10,30) && numAbs < Math.pow(10,33):
            result = Math.sign(num)*((numAbs/Math.pow(10,18)).toFixed(2)) + ' nonillion';
            break;
        case numAbs >= Math.pow(10,33) && numAbs < Math.pow(10,36):
            result = Math.sign(num)*((numAbs/Math.pow(10,18)).toFixed(2)) + ' decillion';
            break;
        default:
            result = Math.sign(num)*numAbs;
            break;
    }

    return result;
}

//Update the whole tomatoes clicked
function tomatoClicking(event) {
    tomatoSound.play();
    
    //Check if there are any upgrade purchased by the user.
    if(boughtUpgrade === false) {
        numTomatoes++;
        saveIncrement = 1;
    }
    else{
        numTomatoes = numTomatoes + saveIncrement;
    }
    
    roundedNumber = nFormatter(numTomatoes);
    $("#tomato-headline-small").html(roundedNumber + " " + tomatoesSubject());
    document.title = roundedNumber + " " + tomatoesSubject() + " - " + docName;

    animationTomatoClicking(event);
    changeBrightnessIdleUpgrades();
    enableUpgrades();

    //Get the amount tomatoes that the user clicked each time.
    amountTomatoes = document.getElementById("tomato-headline-small").textContent;
}

//Increase the number of clicks on the tomato by up to double.
$(".double-cursor-img").click(function() {
    if(numTomatoes >= doubleCursorPrice) {
        clickSound.play();
        $("#double-click-description").hide();
        //Remove upgrade element once the user purchased it.
        $("#double-cursor-upgrade-div").remove();
        doubleCursorUpgradeRemoved = true;
        //Save the upgrade purchased.
        boughtUpgrade = true;
        //Subtract the tomato valor.
        numTomatoes = numTomatoes - doubleCursorPrice;
        roundedNumber = nFormatter(numTomatoes);
        $("#tomato-headline-small").html(roundedNumber + " " + tomatoesSubject());
        document.title = roundedNumber + " " + tomatoesSubject() + " - " + docName;
        saveIncrement = saveIncrement + 2;
    }
});

//Enable auto-click in tomatoes. Let the tomatoes do the job for you!
$(".cursor-auto-img").click(function() {
    if(numTomatoes >= autoClickPrice) {
        clickSound.play();
        $("#auto-click-description").hide();
        //Remove upgrade element once the user purchased it.
        $("#auto-click-upgrade-div").remove();
        autoClickUpgradeRemoved = true;
        //Save the upgrade purchased.
        boughtUpgrade = true;
        //Subtract the tomato valor.
        numTomatoes = numTomatoes - autoClickPrice;
        roundedNumber = nFormatter(numTomatoes);
        $("#tomato-headline-small").html(roundedNumber + " " + tomatoesSubject());
        document.title = roundedNumber + " " + tomatoesSubject() + " - " + docName;

        //Start the auto-counter.
        startAutoClick();
    }
});

function startAutoClick() {
    window.setInterval(() => {
        numTomatoes++;
        roundedNumber = nFormatter(numTomatoes);
        $("#tomato-headline-small").html(roundedNumber + " " + tomatoesSubject());
        document.title = roundedNumber + " " + tomatoesSubject() + " - " + docName;

        changeBrightnessIdleUpgrades();
        enableUpgrades();

        //Check there are no upgrades to show a message.
        if(upgradeElements.length === 0) {
            $("#no-upgrades").show();
        }
    }, 1000);
}

//Increase the number of clicks on the tomato by up to quadruple.
$(".quadruple-cursor-img").click(function() {
    if(numTomatoes >= quadrupleCursorPrice) {
        clickSound.play();
        $("#quadruple-click-description").hide();
        //Remove upgrade element once the user purchased it.
        $("#quadruple-cursor-upgrade-div").remove();
        quadrupleCursorUpgradeRemoved = true;
        //Save the upgrade purchased.
        boughtUpgrade = true;
        //Subtract the tomato valor.
        numTomatoes = numTomatoes - quadrupleCursorPrice;
        roundedNumber = nFormatter(numTomatoes);
        $("#tomato-headline-small").html(roundedNumber + " " + tomatoesSubject());
        document.title = roundedNumber + " " + tomatoesSubject() + " - " + docName;
        saveIncrement = saveIncrement + 4;
    }
});

//Enable auto-click x2 in tomatoes. Let the tomatoes do the job for you!
$(".cursor-auto-2x-img").click(function() {
    if(numTomatoes >= autoClick2xPrice) {
        clickSound.play();
        $("#auto-click-2x-description").hide();
        //Remove upgrade element once the user purchased it.
        $("#auto-click-2x-upgrade-div").remove();
        autoClick2xUpgradeRemoved = true;
        //Save the upgrade purchased.
        boughtUpgrade = true;
        //Subtract the tomato valor.
        numTomatoes = numTomatoes - autoClick2xPrice;
        roundedNumber = nFormatter(numTomatoes);
        $("#tomato-headline-small").html(roundedNumber + " " + tomatoesSubject());
        document.title = roundedNumber + " " + tomatoesSubject() + " - " + docName;

        //Start the auto-counter.
        startAutoClick2x();
    }
});

function startAutoClick2x() {
    window.setInterval(() => {
        numTomatoes++;
        roundedNumber = nFormatter(numTomatoes);
        $("#tomato-headline-small").html(roundedNumber + " " + tomatoesSubject());
        document.title = roundedNumber + " " + tomatoesSubject() + " - " + docName;

        changeBrightnessIdleUpgrades();
        enableUpgrades();
    }, 500);
}

//Increase the number of clicks on the tomato by up to octuple.
$(".octuple-cursor-img").click(function() {
    if(numTomatoes >= octupleCursorPrice) {
        clickSound.play();
        $("#octuple-click-description").hide();
        //Remove upgrade element once the user purchased it.
        $("#octuple-cursor-upgrade-div").remove();
        octupleCursorUpgradeRemoved = true;
        //Save the upgrade purchased.
        boughtUpgrade = true;
        //Subtract the tomato valor.
        numTomatoes = numTomatoes - octupleCursorPrice;
        roundedNumber = nFormatter(numTomatoes);
        $("#tomato-headline-small").html(roundedNumber + " " + tomatoesSubject());
        document.title = roundedNumber + " " + tomatoesSubject() + " - " + docName;
        saveIncrement = saveIncrement + 8;
    }
});

//Increase the number of clicks on the tomato by up to sixteen times.
$(".sixteentimes-cursor-img").click(function() {
    if(numTomatoes >= sixteentimesCursorPrice) {
        clickSound.play();
        $("#sixteentimes-click-description").hide();
        //Remove upgrade element once the user purchased it.
        $("#sixteentimes-cursor-upgrade-div").remove();
        sixteentimesCursorUpgradeRemoved = true;
        //Save the upgrade purchased.
        boughtUpgrade = true;
        //Subtract the tomato valor.
        numTomatoes = numTomatoes - sixteentimesCursorPrice;
        roundedNumber = nFormatter(numTomatoes);
        $("#tomato-headline-small").html(roundedNumber + " " + tomatoesSubject());
        document.title = roundedNumber + " " + tomatoesSubject() + " - " + docName;
        saveIncrement = saveIncrement + 16;
    }
});

//Show a description about each upgrade.
$("#double-cursor-upgrade").mouseenter(function(event) {
    let positionx = event.clientX + "px";
    let descDiv = document.getElementById("double-click-description");

    descDiv.style.left = positionx;

    $("#double-click-description").show();
});

$("#double-cursor-upgrade").mouseleave(function() {
    $("#double-click-description").hide();
});

$("#auto-click-upgrade").mouseenter(function(event) {
    let positionx = event.clientX + "px";
    let descDiv = document.getElementById("auto-click-description");

    descDiv.style.left = positionx;

    $("#auto-click-description").show();
});

$("#auto-click-upgrade").mouseleave(function() {
    $("#auto-click-description").hide();
});

$("#quadruple-cursor-upgrade").mouseenter(function(event) {
    let positionx = event.clientX + "px";
    let descDiv = document.getElementById("quadruple-click-description");

    descDiv.style.left = positionx;

    $("#quadruple-click-description").show();
});

$("#quadruple-cursor-upgrade").mouseleave(function() {
    $("#quadruple-click-description").hide();
});

$("#auto-click-2x-upgrade").mouseenter(function(event) {
    let positionx = event.clientX + "px";
    let descDiv = document.getElementById("auto-click-2x-description");

    descDiv.style.left = positionx;

    $("#auto-click-2x-description").show();
});

$("#auto-click-2x-upgrade").mouseleave(function() {
    $("#auto-click-2x-description").hide();
});

$("#octuple-cursor-upgrade").mouseenter(function(event) {
    let positionx = event.clientX + "px";
    let descDiv = document.getElementById("octuple-click-description");

    descDiv.style.left = positionx;

    $("#octuple-click-description").show();
});

$("#octuple-cursor-upgrade").mouseleave(function() {
    $("#octuple-click-description").hide();
});

$("#sixteentimes-cursor-upgrade").mouseenter(function(event) {
    let positionx = event.clientX + "px";
    let descDiv = document.getElementById("sixteentimes-click-description");

    descDiv.style.left = positionx;

    $("#sixteentimes-click-description").show();
});

$("#sixteentimes-cursor-upgrade").mouseleave(function() {
    $("#sixteentimes-click-description").hide();
});

//Idle upgrades
function changeBrightnessIdleUpgrades() {
    let idleUpgradeOne = document.querySelectorAll("li");

    for (let i = 0; i < idleUpgradeOne.length; i++) {
        let ids = idleUpgradeOne[i].id;

        switch(ids) {
            case "idle-cursor":
                if(numTomatoes >= idleCursorPrice) {
                    $("#idle-cursor").css("filter", "brightness(110%)");
                    $("#idle-cursor-description").css("filter", "brightness(110%)");
                    $("#idle-cursor-price").css("color", "#38c500");
                    $("#idle-cursor-upgrade-money").css("color", "#38c500");
                }
                else{
                    $("#idle-cursor").css("filter", "brightness(80%)");
                    $("#idle-cursor-description").css("filter", "brightness(80%)");
                    $("#idle-cursor-price").css("color", "red");
                    $("#idle-cursor-upgrade-money").css("color", "red");
                }
                break;
            case "idle-wheel":
                if(numTomatoes >= idleWheelPrice) {
                    $("#idle-wheel").css("filter", "brightness(110%)");
                    $("#idle-wheel-description").css("filter", "brightness(110%)");
                    $("#idle-wheel-price").css("color", "#38c500");
                    $("#idle-wheel-upgrade-money").css("color", "#38c500");
                }
                else{
                    $("#idle-wheel").css("filter", "brightness(80%)");
                    $("#idle-wheel-description").css("filter", "brightness(80%)");
                    $("#idle-wheel-price").css("color", "red");
                    $("#idle-wheel-upgrade-money").css("color", "red");
                }
                break;
            default:
                break;
        }        
    }
}

//The description dialog box follows the mouse until its exits the update dialog box.
function moveDoubleCursorDescription(event) {
    let positionx = event.clientX + "px";
    let positiony = event.clientY;
    let descDiv = document.getElementById("double-click-description");

    positiony = positiony - 70 + "px";

    descDiv.style.left = positionx;
    descDiv.style.top = positiony;

    $("#double-click-description").show();
    changeBrightnessIdleUpgrades();
}

function moveAutoClickDescription(event) {
    let positionx = event.clientX + "px";
    let positiony = event.clientY;
    let descDiv = document.getElementById("auto-click-description");

    positiony = positiony - 70 + "px";

    descDiv.style.left = positionx;
    descDiv.style.top = positiony;

    $("#auto-click-description").show();
    changeBrightnessIdleUpgrades();
}

function moveQuadrupleCursorDescription(event) {
    let positionx = event.clientX + "px";
    let positiony = event.clientY;
    let descDiv = document.getElementById("quadruple-click-description");

    positiony = positiony - 70 + "px";

    descDiv.style.left = positionx;
    descDiv.style.top = positiony;

    $("#quadruple-click-description").show();
    changeBrightnessIdleUpgrades();
}

function moveAutoClick2xDescription(event) {
    let positionx = event.clientX + "px";
    let positiony = event.clientY;
    let descDiv = document.getElementById("auto-click-2x-description");

    positiony = positiony - 70 + "px";

    descDiv.style.left = positionx;
    descDiv.style.top = positiony;

    $("#auto-click-2x-description").show();
    changeBrightnessIdleUpgrades();
}

function moveOctupleCursorDescription(event) {
    let positionx = event.clientX + "px";
    let positiony = event.clientY;
    let descDiv = document.getElementById("octuple-click-description");

    positiony = positiony - 70 + "px";

    descDiv.style.left = positionx;
    descDiv.style.top = positiony;

    $("#octuple-click-description").show();
    changeBrightnessIdleUpgrades();
}

function moveSixteentimesCursorDescription(event) {
    let positionx = event.clientX + "px";
    let positiony = event.clientY;
    let descDiv = document.getElementById("sixteentimes-click-description");

    positiony = positiony - 70 + "px";

    descDiv.style.left = positionx;
    descDiv.style.top = positiony;

    $("#sixteentimes-click-description").show();
    changeBrightnessIdleUpgrades();
}

function moveCursorDescription(event) {
    let positionx = event.clientX + "px";
    let positiony = event.clientY;
    let descDiv = document.getElementById("idle-cursor-description");

    positiony = positiony - 70 + "px";

    descDiv.style.left = positionx;
    descDiv.style.top = positiony;

    $("#idle-cursor-description").show();
    changeBrightnessIdleUpgrades();
}

function moveWheelDescription(event) {
    let positionx = event.clientX + "px";
    let positiony = event.clientY;
    let descDiv = document.getElementById("idle-wheel-description");

    positiony = positiony - 70 + "px";

    descDiv.style.left = positionx;
    descDiv.style.top = positiony;

    $("#idle-wheel-description").show();
    changeBrightnessIdleUpgrades();
}

//Changing hover property.
$("#double-cursor-upgrade").mouseenter(function() {
    if(numTomatoes >= doubleCursorPrice) {
        upgradeHoverSound.play();
    }
});

$("#double-cursor-upgrade").mouseleave(function() {
    $("#double-click-description").hide();
});

$("#auto-click-upgrade").mouseenter(function() {
    if(numTomatoes >= autoClickPrice) {
        upgradeHoverSound.play();
    }
});

$("#auto-click-upgrade").mouseleave(function() {
    $("#auto-click-description").hide();
});

$("#quadruple-cursor-upgrade").mouseenter(function() {
    if(numTomatoes >= quadrupleCursorPrice) {
        upgradeHoverSound.play();
    }
});

$("#quadruple-cursor-upgrade").mouseleave(function() {
    $("#quadruple-click-description").hide();
});

$("#auto-click-2x-upgrade").mouseenter(function() {
    if(numTomatoes >= autoClick2xPrice) {
        upgradeHoverSound.play();
    }
});

$("#auto-click-2x-upgrade").mouseleave(function() {
    $("#auto-click-2x-description").hide();
});

$("#octuple-cursor-upgrade").mouseenter(function() {
    if(numTomatoes >= octupleCursorPrice) {
        upgradeHoverSound.play();
    }
});

$("#octuple-cursor-upgrade").mouseleave(function() {
    $("#octuple-click-description").hide();
});

$("#sixteentimes-cursor-upgrade").mouseenter(function() {
    if(numTomatoes >= sixteentimesCursorPrice) {
        upgradeHoverSound.play();
    }
});

$("#sixteentimes-cursor-upgrade").mouseleave(function() {
    $("#sixteentimes-click-description").hide();
});

$("#idle-cursor").mouseenter(function() {
    if(numTomatoes >= idleCursorPrice) {
        upgradeHoverSound.play();
    }
});

$("#idle-cursor").mouseleave(function() {
    $("#idle-cursor-description").hide();
});

$("#idle-wheel").mouseenter(function() {
    if(numTomatoes >= idleWheelPrice) {
        upgradeHoverSound.play();
    }
});

$("#idle-wheel").mouseleave(function() {
    $("#idle-wheel-description").hide();
});

//Buy each idle upgrade
idleCursorPrice = Number.parseInt(idleCursorPrice);
$("#idle-cursor").click(function() {
    if(numTomatoes >= idleCursorPrice) {
        clickSound.play();
        /*Updating how many upgrades the user purchased.*/
        idleCursorUpgrades++;
        $("#idle-cursor-upgrades-headline").html(idleCursorUpgrades);
        numTomatoes = numTomatoes - idleCursorPrice;
        roundedNumber = nFormatter(numTomatoes);
        $("#tomato-headline-small").html(roundedNumber + " " + tomatoesSubject());
        document.title = roundedNumber + " " + tomatoesSubject() + " - " + docName;
        percentageIdleCursor = percentageIdleCursor + sumPercentage;
        idleCursorPrice = Math.floor(idleCursorPrice + (idleCursorPrice * percentageIdleCursor));
        roundedNumber = nFormatter(idleCursorPrice);
        idleCursorPriceText = roundedNumber.toString();
        $("#idle-cursor-price").html(" " + idleCursorPriceText);
        $("#idle-cursor-upgrade-money").html(" " + idleCursorPriceText);
        //The number of clicks increases more and more each time the user purchased by this idle upgrade.
        idleCursorIncrement = idleCursorIncrement * doubleIncrement;
        saveIncrement = saveIncrement + idleCursorIncrement;
        //Refresh normal tomato clicks every time you have purchased ten upgrades.
        if(idleCursorUpgrades % multiple_10 == 0) {
            saveIncrement = saveIncrement * doubleIncrement;
        }
        //Activate a trigger that alerts the user to click the tomato with more powerful clicks.
        showsCursorTimeDiv();
    }
    changeBrightnessIdleUpgrades();
});

function showsCursorTimeDiv() {
    if(intervalCursor) {
        clearInterval(intervalCursor);
    }
    $("#idle-cursor").css('pointer-events','none');
    $("#idle-wheel").css('pointer-events','none');
    $("#time-limit-div").show();
    intervalCursor = setInterval(function() {
        activateCursorTimeCountdown();
    }, 1000);
}

function activateCursorTimeCountdown() {
    if(secondsLeft > 0) {
        $(".tomato-div").addClass('laser');
        upgradeAnimationSound.play();
        secondsLeft--;
        $("#time-limit-div").show();
        setTimeout(function() {
            animationTomatoFalling();
        }, 100);
        setTimeout(function() {
            animationTomatoFalling();
        }, 500);
        $("#seconds-left").html(secondsLeft);
    }
    else {
        saveIncrement = saveIncrement - idleCursorIncrement;
        $("#time-limit-div").hide();
        secondsLeft = timeLimitWindow;
        $("#seconds-left").html(secondsLeft);
        clearInterval(intervalCursor);
        $("#idle-cursor").css('pointer-events','auto');
        $("#idle-wheel").css('pointer-events','auto');
        upgradeAnimationSound.pause();
        upgradeAnimationSound.currentTime = 0;
        $(".tomato-div").removeClass('laser');
    }
}

idleWheelPrice = Number.parseInt(idleWheelPrice);
$("#idle-wheel").click(function() {
    if(numTomatoes >= idleWheelPrice) {
        clickSound.play();
        /*Updating how many upgrades the user purchased.*/
        idleWheelUpgrades++;
        $("#idle-wheel-upgrades-headline").html(idleWheelUpgrades);
        numTomatoes = numTomatoes - idleWheelPrice;
        roundedNumber = nFormatter(numTomatoes);
        $("#tomato-headline-small").html(roundedNumber + " " + tomatoesSubject());
        document.title = roundedNumber + " " + tomatoesSubject() + " - " + docName;
        percentageIdleWheel = percentageIdleWheel + sumPercentage;
        idleWheelPrice = Math.floor(idleWheelPrice + (idleWheelPrice * percentageIdleWheel));
        roundedNumber = nFormatter(idleWheelPrice);
        idleWheelPriceText = roundedNumber.toString();
        $("#idle-wheel-price").html(" " + idleWheelPriceText);
        $("#idle-wheel-upgrade-money").html(" " + idleWheelPriceText);
        //Shows the 10 seconds time div by another idle upgrade. It's going to increase the auto-clicks speed.
        showsWheelTimeDiv();
    }
    changeBrightnessIdleUpgrades();
});

function showsWheelTimeDiv() {
    if(intervalWheel) {
        clearInterval(intervalWheel);
    }
    $("#idle-cursor").css('pointer-events','none');
    $("#idle-wheel").css('pointer-events','none');
    $("#time-limit-div").show();
    intervalWheel = setInterval(function() {
        activateWheelTimeCountdown();
    }, 1000);
}

function activateWheelTimeCountdown() {
    if(autoWheel) {
        clearInterval(autoWheel);
    }
    if(secondsLeft > 0) {
        $(".tomato-div").addClass('laser');
        upgradeAnimationSound.play();
        secondsLeft--;
        $("#time-limit-div").show();
        //Creates wheels at different times. 
        setTimeout(function() {
            animationWheelHorizontal();
        }, 100);
        setTimeout(function() {
            animationWheelHorizontal();
        }, 500);
        $("#seconds-left").html(secondsLeft);
        autoWheel = setInterval(function() {
            numTomatoes++;
            roundedNumber = nFormatter(numTomatoes);
            $("#tomato-headline-small").html(roundedNumber + " " + tomatoesSubject());
            document.title = roundedNumber + " " + tomatoesSubject() + " - " + docName;
        }, 10);
    }
    else {
        $("#time-limit-div").hide();
        //Restart animation
        $("#tomato-img").removeClass("run-animation");
        secondsLeft = timeLimitWindow;
        $("#seconds-left").html(secondsLeft);
        clearInterval(intervalWheel);
        clearInterval(autoWheel);
        $("#idle-cursor").css('pointer-events','auto');
        $("#idle-wheel").css('pointer-events','auto');
        upgradeAnimationSound.pause();
        upgradeAnimationSound.currentTime = 0;
        $(".tomato-div").removeClass('laser');
    }
}

//Volume control
//Calculates the volume and changes its value with slider interaction.
function controlVolume(slider, output) {
    output.innerHTML = Math.floor(slider.value * 100) + "%";
    let volume = document.getElementById('myRange').value;
    let audios = document.querySelectorAll("audio");

    if(volume == 0) {
        $("#volume-img").attr("src", "images/muted.png");
    }
    else {
        if(volume < 0.5) {
            $("#volume-img").attr("src", "images/volume-up.png");
        } else if(volume >= 0.5 && volume < 0.75) {
            $("#volume-img").attr("src", "images/volume-up-2.png");
        } else if(volume >= 0.75) {
            $("#volume-img").attr("src", "images/high-volume.png");
        }
    }

    for(let i=0; i < audios.length; i++) {
        let ids = audios[i].id;
        switch(ids) {
            case "tomato-sound":
                tomatoSound.volume = volume;
                output.innerHTML = Math.floor(tomatoSound.volume * 100) + "%";
                break;
            case "click-sound":
                clickSound.volume = volume;
                output.innerHTML = Math.floor(clickSound.volume * 100) + "%";
                break;
            case "upgrade-hover-sound":
                upgradeHoverSound.volume = volume;
                output.innerHTML = Math.floor(upgradeHoverSound.volume * 100) + "%";
                break;
            case "upgrade-animation-sound":
                upgradeAnimationSound.volume = volume;
                output.innerHTML = Math.floor(upgradeAnimationSound.volume * 100) + "%";
                break;
            default:
                break;
        }
    }
}

$("#myRange").mouseenter(function() {
    //Allows interact with the slider.
    document.onselectstart = function() {
        return true;
    }
    document.onmousedown = function() {
        return true;
    }

    //Set the volume when the user finishes playing with the slider.
    slider.oninput = function() {
        controlVolume(slider, output);
    }

    //Avoid any text interaction outside of the slider.
    $("#myRange").mouseleave(function() {
        document.onselectstart = function() {
            return false;
        }
        document.onmousedown = function() {
            return false;
        }
    });
});

//Muted the volume by the next button. If there are no volume, will not change.
$("#volume-div-img").click(function() {
    let volumeImage = document.getElementById("volume-img").getAttribute("src");

    switch(volumeImage) {
        case "images/volume-up.png":
            $("#volume-img").attr("src", "images/muted.png");
            muteVolumeUp = true;
            tomatoSound.volume = 0;
            clickSound.volume = 0;
            upgradeHoverSound.volume = 0;
            upgradeAnimationSound.volume = 0;
            break;
        case "images/volume-up-2.png":
            $("#volume-img").attr("src", "images/muted.png");
            muteVolumeUp2 = true;
            tomatoSound.volume = 0;
            clickSound.volume = 0;
            upgradeHoverSound.volume = 0;
            upgradeAnimationSound.volume = 0;
            break;
        case "images/high-volume.png":
            $("#volume-img").attr("src", "images/muted.png");
            muteHighVolume = true;
            tomatoSound.volume = 0;
            clickSound.volume = 0;
            upgradeHoverSound.volume = 0;
            upgradeAnimationSound.volume = 0;
            break;
        case "images/muted.png":
            if (muteVolumeUp) {
                muteVolumeUp = false;
                $("#volume-img").attr("src", "images/volume-up.png");
            }
            if (muteVolumeUp2) {
                muteVolumeUp2 = false;
                $("#volume-img").attr("src", "images/volume-up-2.png");
            }
            if (muteHighVolume) {
                muteHighVolume = false;
                $("#volume-img").attr("src", "images/high-volume.png");
            }
            tomatoSound.volume = slider.value;
            clickSound.volume = slider.value;
            upgradeHoverSound.volume = slider.value;
            upgradeAnimationSound.volume = slider.value;
            if(tomatoSound.volume == 0 && clickSound.volume == 0 && upgradeHoverSound.volume == 0 && upgradeAnimationSound.volume == 0) {
                $("#volume-img").attr("src", "images/muted.png");
            }
            break;
        default:
            $("#volume-img").attr("src", "images/muted.png");
            tomatoSound.volume = 0;
            clickSound.volume = 0;
            upgradeHoverSound.volume = 0;
            upgradeAnimationSound.volume = 0;
            break;
    }
});

//Music control
//Calculates the music volume and changes its value with slider interaction.
//Also activates the background music and sets it on loop.
function controlMusic(sliderMusic, outputMusic) {
    outputMusic.innerHTML = Math.floor(sliderMusic.value * 100) + "%";
    let volume = document.getElementById('myMusicRange').value;
    let audios = document.querySelectorAll("audio");

    if(volume == 0) {
        $("#music-img").attr("src", "images/muted.png");
    }
    else {
        if(volume < 0.5) {
            $("#music-img").attr("src", "images/volume-up.png");
        } else if(volume >= 0.5 && volume < 0.75) {
            $("#music-img").attr("src", "images/volume-up-2.png");
        } else if(volume >= 0.75) {
            $("#music-img").attr("src", "images/high-volume.png");
        }
    }

    for(let i=0; i < audios.length; i++) {
        let ids = audios[i].id;

        if(ids === "background-music") {
            backgroundMusic.volume = volume;
            outputMusic.innerHTML = Math.floor(backgroundMusic.volume * 100) + "%";
            backgroundMusic.play();
            backgroundMusic.loop = true;
        }
    }
}

$("#myMusicRange").mouseenter(function() {
    //Allows interact with the slider.
    document.onselectstart = function() {
        return true;
    }
    document.onmousedown = function() {
        return true;
    }

    //Set the volume when the user finishes playing with the slider.
    sliderMusic.oninput = function() {
        controlMusic(sliderMusic, outputMusic);
    }

    //Avoid any text interaction outside of the slider.
    $("#myMusicRange").mouseleave(function() {
        document.onselectstart = function() {
            return false;
        }
        document.onmousedown = function() {
            return false;
        }
    });
});

//Muted the volume by the next button. If there are no volume, it will not change.
$("#music-div-img").click(function() {
    let musicImage = document.getElementById("music-img").getAttribute("src");

    switch(musicImage) {
        case "images/volume-up.png":
            $("#music-img").attr("src", "images/muted.png");
            muteMusicUp = true;
            backgroundMusic.volume = 0;
            break;
        case "images/volume-up-2.png":
            $("#music-img").attr("src", "images/muted.png");
            muteMusicUp2 = true;
            backgroundMusic.volume = 0;
            break;
        case "images/high-volume.png":
            $("#music-img").attr("src", "images/muted.png");
            muteHighMusic = true;
            backgroundMusic.volume = 0;
            break;
        case "images/muted.png":
            if (muteMusicUp) {
                muteMusicUp = false;
                $("#music-img").attr("src", "images/volume-up.png");
            }
            if (muteMusicUp2) {
                muteMusicUp2 = false;
                $("#music-img").attr("src", "images/volume-up-2.png");
            }
            if (muteHighMusic) {
                muteHighMusic = false;
                $("#music-img").attr("src", "images/high-volume.png");
            }
            backgroundMusic.volume = sliderMusic.value;
            if(backgroundMusic.volume == 0) {
                $("#music-img").attr("src", "images/muted.png");                
            }
            break;
        default:
            $("#music-img").attr("src", "images/muted.png");
            backgroundMusic.volume = 0;
            break;
    }
});