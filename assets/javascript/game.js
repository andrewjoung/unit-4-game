

$(document).ready(function(){

    //variable to hold information about the game state
    var gameState = {
        yourCharacter: {name:"", health: 0, attack:0, baseAttack: 0, counter: 0},
        remainingCharacters: [], //an array of character DOM elements
        defender: {name:"", health: 0, attack: 0, baseAttack:0, counter: 0},
        playing: false,
        characterDomElement: null,
        defenderDomElement: null
    };

    var numClicks = 0;

    var kenobi = $("#kenobi");
    var skywalker = $("#skywalker");
    var maul = $("#maul");
    var vader = $("#vader");

    $("#attackButton").attr("disabled", true);

    kenobi.data({name: "Obi-Wan Kenobi", health: 120, attack: 8, baseAttack: 8, counter: 15});
    skywalker.data({name:"Luke Skywalker", health: 100, attack: 6, baseAttack: 6,  counter: 10});
    maul.data({name:"Darth Maul", health:150, attack: 10, baseAttack: 10, counter: 20});
    vader.data({name:"Darth Vader", health: 180, attack: 12, baseAttack: 12, counter: 25});
    
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
    
    

    gameState.remainingCharacters[0] = (kenobi);
    gameState.remainingCharacters[1] = (skywalker);
    gameState.remainingCharacters[2] = (maul);
    gameState.remainingCharacters[3] = (vader);

    console.log(gameState.remainingCharacters);

    function initalizeGame(characterSelected) {
        //if it is the first time user is clicking a character, this will be their fighting character
        if(numClicks === 0) {
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
            characterSelected.remove(); 
            gameState.characterDomElement.css("margin-left", 0);
            $("#selectedCharacterDiv").append(gameState.characterDomElement);
            $("#enemiesAvailable").css("height", "220px");
            
            for(var j = 0; j < gameState.remainingCharacters.length; j++) {
                //gameState.remainingCharacters[j].remove();
                gameState.remainingCharacters[j].css("border-color", "black");
                gameState.remainingCharacters[j].css("background-color", "#ff000085");
                $("#enemiesAvailable").append(gameState.remainingCharacters[j]);
                $("#characterChoiceDiv").css("display", "none");
                //gameState.remainingCharacters[j].remove();
            }
            numClicks++;
            //$("#characterChoiceDiv").remove();
        } else if (numClicks === 1) { //user is choosing their defender
            gameState.defender.name = characterSelected.data().name;
            gameState.defender.health = characterSelected.data().health;
            gameState.defender.attack = characterSelected.data().attack;
            gameState.defender.baseAttack = characterSelected.data().baseAttack;
            gameState.defender.counter = characterSelected.data().counter;
            gameState.defenderDomElement = characterSelected;
            for(var i = 0; i < gameState.remainingCharacters.length; i++) {
                if(gameState.remainingCharacters[i] === characterSelected) {
                    gameState.remainingCharacters.splice(i, 1);
                }
            }
            characterSelected.remove();
            gameState.defenderDomElement.css("background-color", "black");
            gameState.defenderDomElement.css("border-color", "green");
            gameState.defenderDomElement.css("color", "#ffffff");
            $("#defenderDiv").append(gameState.defenderDomElement);
            numClicks++;
            gameState.playing = true;
            //startGame();
            $("#attackButton").attr("disabled", false);
        } else { //invalid, user has already selecter their fighters
            alert("You have already chosen your fighters");
        }
    }

    $("#attackButton").on("click", function(){

        console.log(gameState);

        if(gameState.playing === true) {

            var characterHealthElement = $("#selectedCharacterDiv > .characterCard > .healthPoint");
            var defenderHealthElement = $("#defenderDiv > .characterCard > .healthPoint");

            defenderHealthElement.text(gameState.defender.health - gameState.yourCharacter.attack);
            gameState.defender.health -= gameState.yourCharacter.attack;

            console.log(gameState.defender.health);

            characterHealthElement.text(gameState.yourCharacter.health - gameState.defender.counter);
            gameState.yourCharacter.health -= gameState.defender.counter;

            console.log(gameState.yourCharacter.health);

            gameState.yourCharacter.attack += gameState.yourCharacter.baseAttack;

            //defender has been taken out 
            if(gameState.defender.health <= 0) {
                numClicks = 1;
                gameState.playing = false; 
                $("#attackButton").attr("disabled", true);
                gameState.defenderDomElement.remove();
            } else if(gameState.yourCharacter.health <= 0) { //user has lost
                alert("You've lost!");
            }

        }
    });


});