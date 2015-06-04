var player1 = null;
var player2 = null;
var currentPlayer = null;
var round = null;

function Player(name) {
  this.name = name;
  this.score = 0;
}

function Round() {
  this.score = 0;
}

Round.prototype.increaseRoundScore = function(amount) {
  this.score += amount;
}

Round.prototype.resetRoundScore = function() {
  this.score = 0;
}

Player.prototype.increaseScore = function(amount) {
  this.score += amount;
}

Player.prototype.currentPlayer = function() {
  return this === currentPlayer;
}

Player.prototype.setAsCurrentPlayer = function() {
  currentPlayer = this;
}

function switchToOtherPlayer() {
    if (player1.currentPlayer()) {
      player2.setAsCurrentPlayer();
    } else {
      player1.setAsCurrentPlayer();
    }
    updateGameboard();
}

function updateHeaderPlayer() {
  $("div#whoseTurn").text(currentPlayer.name.toUpperCase() + "'S TURN!");
}

function updateTotalScores() {
  $("span#player1totalScore").text(player1.score);
  $("span#player2totalScore").text(player2.score);
}

function updateRoundScores() {
  if (player1.currentPlayer()) {
    $("#player1turnScore").text(round.score);
  } else{
    $("#player2turnScore").text(round.score);
  }
}

function setExpandableSections() {
  if (player1.currentPlayer()) {
    $("#player2panel").slideUp( "slow", function() {});
    $("#player1panel").slideDown( "slow", function() {});
  } else {
    $("#player1panel").slideUp( "slow", function() {});
    $("#player2panel").slideDown( "slow", function() {});
  }
}

function selectRandomFirstPlayer() {
  var players = [player1, player2];
  currentPlayer = players[Math.round(Math.random())];
}

var rollDice = function() {
  return Math.floor((Math.random() * 6) + 1);
}

function processDiceScore(score) {
  if (score === 1) {
    round.resetRoundScore();
    switchToOtherPlayer();
  } else {
    round.increaseRoundScore(score);
  }
}

var dotDice = function(number, jqDiceDiv) {
  jqDiceDiv.empty();
  console.log("rolled a " + number);

switch(number) {
  case 1:
    addDot("32px","32px", jqDiceDiv);
  break;
  case 2:
    addDot("19px","19px", jqDiceDiv);
    addDot("38px","38px", jqDiceDiv);
  break;
  case 3:
    addDot("12px","12px", jqDiceDiv);
    addDot("32px","32px", jqDiceDiv);
    addDot("52px","52px", jqDiceDiv);
  break;
  case 4:
    addDot("12px","12px", jqDiceDiv);
    addDot("12px","60px", jqDiceDiv);
    addDot("60px","12px", jqDiceDiv);
    addDot("60px","60px", jqDiceDiv);
  break;
  case 5:
    addDot("12px","12px", jqDiceDiv);
    addDot("12px","60px", jqDiceDiv);
    addDot("60px","12px", jqDiceDiv);
    addDot("60px","60px", jqDiceDiv);
    addDot("32px","32px", jqDiceDiv);
  break;
  case 6:
    addDot("12px","12px", jqDiceDiv);
    addDot("12px","32px", jqDiceDiv);
    addDot("12px","60px", jqDiceDiv);
    addDot("60px","12px", jqDiceDiv);
    addDot("60px","32px", jqDiceDiv);
    addDot("60px","60px", jqDiceDiv);
  break;
  }
}

var addDot = function(x, y, dice) {
  dice.append("<div class='dots'></div>");
  dice.children(".dots:last").css({ top: y, left: x });
  // $("div.dots:last").css({ top: y, left: x });
}

var updateGameboard = function() {
  updateHeaderPlayer();
  updateTotalScores();

  round = new Round();
  updateRoundScores();
  setExpandableSections();
};

$(document).ready(function() {

  $("div#modalOverlay").show();

  $("form#newGame").submit(function(event) {
    event.preventDefault();
    player1 = new Player($("input#player1").val());
    player2 = new Player($("input#player2").val());
    $("span#player1name").text(player1.name);
    $("span#player2name").text(player2.name);
    $("div#modalOverlay").hide();
    selectRandomFirstPlayer();

    updateGameboard();
  })

  $("#player1hold").click(function() {
    round.updateTotalScoresndScore();

    // switch to player2 as currentPlayer
    player2.setAsCurrentPlayer();
    updateGameboard();
  });

  $("#player2hold").click(function() {
    round.resetRoundScore();
    // switch to player1 as currentPlayer
    player1.setAsCurrentPlayer();
    updateGameboard();
  });

  $("#player1dice").click(function() {
    var diceScore = rollDice();
    processDiceScore(diceScore);
    dotDice(diceScore, $(this));
    updateRoundScores();
  });

  $("#player2dice").click(function() {
    var diceScore = rollDice();
    processDiceScore(diceScore);
    dotDice(diceScore, $(this));
    updateRoundScores();
  });
});
