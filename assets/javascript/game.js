//Author: Andrew Joung
//June 3rd, 2019
//The JavaScript that adds logic and interactivity to the StarWars RPG game.
//Uses JQuery selectors and functions to allow the user to click on the players and play the game.
//Written for the UW Coding Bootcamp homework assignment number 4. 


//TODO:
//readjust the attack and counter attacks of each character

$(document).ready(function(){

    //orignal state of the DOM for when we want to restart the game
    var originalState = $(".container").clone();

    //a global object that will hold information about the game including the character chosen and their stats,
    //the defend that is chosen and their stats, as well as remaining characters, and chosen character dom elements
    var gameState = {
        yourCharacter: {name:"", health: 0, attack:0, baseAttack: 0, counter: 0},
        remainingCharacters: [], //an array of character DOM elements
        defender: {name:"", health: 0, attack: 0, baseAttack:0, counter: 0},
        playing: false,
        characterDomElement: null,
        defenderDomElement: null
    };

    //counter variable used for the selection process
    var numClicks = 0;

    //a reference to the player card DOM elements
    var kenobi = $("#kenobi");
    var skywalker = $("#skywalker");
    var maul = $("#maul");
    var vader = $("#vader");

    //disable the attack button to begin with 
    $("#attackButton").attr("disabled", true);

    //add data to each character that we can reference later
    kenobi.data({name: "Obi-Wan Kenobi", health: 120, attack: 8, baseAttack: 8, counter: 15});
    skywalker.data({name:"Luke Skywalker", health: 100, attack: 6, baseAttack: 6,  counter: 10});
    maul.data({name:"Darth Maul", health:150, attack: 10, baseAttack: 10, counter: 20});
    vader.data({name:"Darth Vader", health: 180, attack: 12, baseAttack: 12, counter: 25});
    
    //give each character card an on click function that will intalize the game
    kenobi.on("click", function(){
        initalizeGame(kenobi);
    });

    skywalker.on("click", function(){
        initalizeGame(skywalker);
    });

    maul.on("click", function(){
        initalizeGame(maul);
    });

    vader.on("click", function(){
        initalizeGame(vader);
    });
    
    //add each character to the gameState.remainingCharacter array
    gameState.remainingCharacters[0] = (kenobi);
    gameState.remainingCharacters[1] = (skywalker);
    gameState.remainingCharacters[2] = (maul);
    gameState.remainingCharacters[3] = (vader);

    //helper function that will initalized the game based on the characters clicked
    function initalizeGame(characterSelected) {
        //if it is the first time user is clicking a character, this will be their fighting character
        if(numClicks === 0) {
            //set the character data
            gameState.yourCharacter.name = characterSelected.data().name;
            gameState.yourCharacter.health = characterSelected.data().health;
            gameState.yourCharacter.attack = characterSelected.data().attack;
            gameState.yourCharacter.baseAttack = characterSelected.data().baseAttack;
            gameState.yourCharacter.counter = characterSelected.data().counter;
            gameState.characterDomElement = characterSelected;
            //delete character from remaining character array 
            for(var i = 0; i < gameState.remainingCharacters.length; i++) {
                if(gameState.remainingCharacters[i] === characterSelected) {
                    gameState.remainingCharacters.splice(i, 1);
                }
            }
            //remove the character selected from the current div
            //and move it over to the slected character div
            characterSelected.remove(); 
            gameState.characterDomElement.css("margin-left", 0);
            $("#selectedCharacterDiv").append(gameState.characterDomElement);
            $("#enemiesAvailable").css("height", "220px");
            
            //rearrange the remaining characters to the available enemies div
            for(var j = 0; j < gameState.remainingCharacters.length; j++) {
                gameState.remainingCharacters[j].css("border-color", "black");
                gameState.remainingCharacters[j].css("background-color", "#ff000085");
                $("#enemiesAvailable").append(gameState.remainingCharacters[j]);
                $("#characterChoiceDiv").css("display", "none");
            }
            numClicks++;
        } else if (numClicks === 1) { //user is choosing their defender
            //set the defender character data so that we can reference it throughout the rest of the code 
            gameState.defender.name = characterSelected.data().name;
            gameState.defender.health = characterSelected.data().health;
            gameState.defender.attack = characterSelected.data().attack;
            gameState.defender.baseAttack = characterSelected.data().baseAttack;
            gameState.defender.counter = characterSelected.data().counter;
            gameState.defenderDomElement = characterSelected;
            //remove the defender from the remaining characters array
            for(var i = 0; i < gameState.remainingCharacters.length; i++) {
                if(gameState.remainingCharacters[i] === characterSelected) {
                    gameState.remainingCharacters.splice(i, 1);
                }
            }
            //remove defender from available enemies section into the defender section
            characterSelected.remove();
            gameState.defenderDomElement.css("background-color", "black");
            gameState.defenderDomElement.css("border-color", "green");
            gameState.defenderDomElement.css("color", "#ffffff");
            $("#defenderDiv").append(gameState.defenderDomElement);
            numClicks++;
            gameState.playing = true;
            console.log(gameState.playing);

            //once all fighters have been chosen, we enable the attack button 
            $("#attackButton").attr("disabled", false);
        } else { //invalid, user has already selecter their fighters
            alert("You have already chosen your fighters");
        }
    }
    
    //attach an on click function to the attack button
    $("#attackButton").on("click", function(){

        //once the fighers have been chosen
        //not really necessary because the attack button is disabled until fighters are chosen
        //but I like to have this as part of the thought process 
        if(gameState.playing === true) {

            //console.log("attacking");

            //grab the intial health point DOM elements of both characters 
            var characterHealthElement = $("#selectedCharacterDiv > .characterCard > .healthPoint");
            var defenderHealthElement = $("#defenderDiv > .characterCard > .healthPoint");

            //change the value in the DOM and the global variable so that we have something to reference as 
            //the user keeps attacking
            defenderHealthElement.text(gameState.defender.health - gameState.yourCharacter.attack);
            gameState.defender.health -= gameState.yourCharacter.attack;

            //change value of the user character health points in both DOM and variable 
            characterHealthElement.text(gameState.yourCharacter.health - gameState.defender.counter);
            gameState.yourCharacter.health -= gameState.defender.counter;

            //display information about the attack process 
            var attackText = $("#attackText");
            attackText.text("You've attacked " + gameState.defender.name + " for " + gameState.yourCharacter.attack + " damage");
            var attackedText = $("#attackedText");
            attackedText.text(gameState.defender.name + " attacked you for " + gameState.defender.counter + " damage");
            
            //user character attack power increases after every attack
            gameState.yourCharacter.attack += gameState.yourCharacter.baseAttack;
 
        }

        //create a new DOM element that will act as a restart button
        var restartButton = $("<button>");
        restartButton.attr("id", "restartButton");
        restartButton.text("Restart");

        //add an on click listener to the restart button
        //pressing the button will refresh the page allowing the DOM and the JavaScript to go back to the orignal state
        restartButton.on("click", function(){
            location.reload();
        });

        //defender has been taken out 
        if(gameState.defender.health <= 0) {
            numClicks = 1; //set numClicks back to one so that the user may choose another defender
            gameState.playing = false;  
            //reset the attack text
            $("#attackText").text("");
            $("#attackedText").text("")
            //disable the attack button until user has selected a defender
            $("#attackButton").attr("disabled", true);
            //remove the defender from the game
            gameState.defenderDomElement.remove();
            if(gameState.remainingCharacters.length === 0) {
                var winText = $("<p>");
                winText.attr("id", "winText");
                winText.text("You've won!");
                $("#attackTextDiv").append(winText);
                $("#restart").append(restartButton);
            }
        } 
        
        //if user's character has been taken out
        if(gameState.yourCharacter.health <= 0) { 
            //the game is no longer in play, disable the attack button
            $("#attackButton").attr("disabled", true);
            gameState.playing = false;

            //add the restart button to the DOM
            $("#restart").append(restartButton);

            //display text that the user has lost
            var gameOver = $("<p>");
            gameOver.attr("id", "gameOverText");
            gameOver.text("You've been killed by " + gameState.defender.name);
            $("#attackTextDiv").append(gameOver)
        } 
    }); 

});