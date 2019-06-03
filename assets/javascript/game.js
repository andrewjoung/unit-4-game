
$(document).ready(function(){

    //variable to hold information about the game state
    var gameState = {
        yourCharacter: {name:"", attackPoint: 0},
        remainingCharacters: [], //an array of character DOM elements
        defender: {name:"", attackPoint:0},
        playing: false,
        characterDomElement: null,
        defenderDomElement: null
    }

    var numClicks = 0;

    var kenobi = $("#kenobi");
    var skywalker = $("#skywalker");
    var maul = $("#maul");
    var vader = $("#vader");

    
    kenobi.data({name: "Obi-Wan Kenobi", attackPoint: 120});
    skywalker.data({name:"Luke Skywalker", attackPoint: 100});
    maul.data({name:"Darth Maul", attackPoint:150});
    vader.data({name:"Darth Vader", attackPoint: 180});

    
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
    

    gameState.remainingCharacters.push(kenobi);
    gameState.remainingCharacters.push(skywalker);
    gameState.remainingCharacters.push(maul);
    gameState.remainingCharacters.push(vader);

    console.log(gameState.remainingCharacters);
    
    /*
    gameState.remainingCharacters[0].data({name: "Obi-Wan Kenobi", attackPoint: 120});
    gameState.remainingCharacters[0].on("click", function(){
        initalizeGame(gameState.remainingCharacters[0]);
    });
    gameState.remainingCharacters[1].data({name:"Luke Skywalker", attackPoint: 100});
    gameState.remainingCharacters[1].on("click", function(){
        initalizeGame(gameState.remainingCharacters[1]);
    });
    gameState.remainingCharacters[2].data({name:"Darth Maul", attackPoint:150});
    gameState.remainingCharacters[2].on("click", function(){
        initalizeGame(gameState.remainingCharacters[2]);
    });
    gameState.remainingCharacters[3].data({name:"Darth Vader", attackPoint: 180});
    gameState.remainingCharacters[3].on("click", function(){
        initalizeGame(gameState.remainingCharacters[3]);
    });
    */

    function initalizeGame(characterSelected) {
        //if it is the first time user is clicking a character, this will be their fighting character
        if(numClicks === 0) {
            gameState.yourCharacter.name = characterSelected.data().name;
            gameState.yourCharacter.attackPoint = characterSelected.data().attackPoint;
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
                $("#charactChoiceDiv").css("display", "none");
                //gameState.remainingCharacters[j].remove();
            }
            numClicks++;
            //$("#characterChoiceDiv").remove();
        } else if (numClicks === 1) { //user is choosing their defender
            gameState.defender.name = characterSelected.data().name;
            gameState.defender.attackPoint = characterSelected.data().attackPoint;
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
            playing = true;
        } else { //invalid user has already selecter their fighters
            alert("You have already chosen your fighters");
        }
    }


});