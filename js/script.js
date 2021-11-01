"use strict";

//selectors
//globals
const gboard = document.querySelectorAll(".field");
const message = document.querySelector(".msg");
const player1Score = document.querySelector("#player1Score");
const player2Score = document.querySelector("#player2Score");
const playAgain = document.querySelector(".playagain");

function selector(name) {
  const sel = document.querySelector("." + name);
  return sel;
}

//handle gameboard
const gameBoard = (() => {
  //module
  const board = [[], []];
  const winnablePositions = [
    //rows
    ["f1", "f2", "f3"],
    ["f4", "f5", "f6"],
    ["f7", "f8", "f9"],
    //columns
    ["f1", "f4", "f7"],
    ["f2", "f5", "f8"],
    ["f3", "f6", "f9"],
    //diagonal
    ["f3", "f5", "f7"],
    ["f1", "f5", "f9"],
  ];
  return { board, winnablePositions };
})();

//handle players turn
const playerTurn = (() => {
  //module
  let num = 0;
  return { num };
})();

const player = () => {
  // factory function to hold method that each player had
  const player1Move = (field) => {
    const h = field.classList[1];
    field.classList.add("used");
    gameBoard.board[0].push(h);
    selector(h).innerHTML = `<i class="fas fa-times"></i>`;
    playerTurn.num++;
  };

  const player2Move = (field) => {
    const h = field.classList[1];
    field.classList.add("used");
    gameBoard.board[1].push(h);
    selector(h).innerHTML = `<i class="far fa-circle"></i>`;
    playerTurn.num--;
  };

  let playerScore = 0;

  return { playerScore, player1Move, player2Move };
};

const player1 = player(); //each instance is seperate from one another
const player2 = player();

player1Score.textContent = "Player 1 score: " + player1.playerScore; //display scores , this is global
player2Score.textContent = "Player 2 score: " + player2.playerScore;

function main() {
  // handle events
  gboard.forEach(function (field) {
    field.addEventListener("click", function () {
      if (playerTurn.num == 0 && checkIfOccupied(field) == false) {
        player1.player1Move(field);
        if (checkForWinner(0) == true) {
          //check if player 1 has won
          message.textContent = "player 1 wins!";
          player1.playerScore++;

          updateScore(player1Score, player1, 1);
        }
      } else if (playerTurn.num == 1 && checkIfOccupied(field) == false) {
        player2.player2Move(field);

        if (checkForWinner(1) == true) {
          //check if player 2 has won
          message.textContent = "player 2 wins!";
          player2.playerScore++;
          updateScore(player2Score, player2, 2);
        }
      }
    });
  });
}

function checkIfOccupied(field) {
  // function to check if field is occupied
  let used = false;
  if (field.classList.contains("used")) {
    used = true;
  }

  return used;
}

function checkForWinner(player) {
  //function to check if there is a winner
  let isPlayerWin = false;

  let board = gameBoard.board[player]; // the board of player 1

  for (let i = 0; i < gameBoard.winnablePositions.length; i++) {
    //loop through each array
    let pos = gameBoard.winnablePositions[i];

    if (
      board.includes(pos[0]) && //check each winnable combination and see if there is a match
      board.includes(pos[1]) &&
      board.includes(pos[2])
    ) {
      console.log("Winner");
      isPlayerWin = true;
    }
  }
  return isPlayerWin;
  // first loop through the winnerpoitions and get each array into a variables
  //then loop through each index, if each index of the array matched the board array
  // the the game is over
}
function playAgainf() {
  playAgain.addEventListener("click", function () {
    gameBoard.board[0].splice(0, gameBoard.board[0].length);
    gameBoard.board[1].splice(0, gameBoard.board[1].length); //remove fields stored in the board
    message.textContent = "";

    for (let i = 1; i < 10; i++) {
      //remove all fields with the used class and remove the html for the x's and o's
      const sel = document.querySelector(".f" + i);
      sel.innerHTML = "";
      if (sel.classList.contains("used")) {
        sel.classList.remove("used");
      }
    }
  });
}
//need to loop through all fields with used class and remove the injected html

function updateScore(player, playerNum, num) {
  player.textContent = "Player " + num + " score: " + playerNum.playerScore;
}

playAgainf();
main();
