"use strict";

//selectors
const gboard = document.querySelectorAll(".field");

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

function main() {
  // handle events
  gboard.forEach(function (field) {
    field.addEventListener("click", function () {
      if (playerTurn.num == 0 && checkIfOccupied(field) == false) {
        player1.player1Move(field);
        checkForWinner();
        //console.log(gameBoard.board);
      } else if (playerTurn.num == 1 && checkIfOccupied(field) == false) {
        player2.player2Move(field);
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

function checkForWinner() {
  let isPlayer1Win = false;
  let isPlayer2Win = false;

  let board = gameBoard.board[0];

  for (let i = 0; i < gameBoard.winnablePositions.length; i++) {
    let pos = gameBoard.winnablePositions[i];

    if (
      board.includes(pos[0]) &&
      board.includes(pos[1]) &&
      board.includes(pos[2])
    ) {
      console.log("Winner");
    }
  }
}

// first loop through the winnerpoitions and get each array into a variables
//then loop through each index, if each index of the array matched the board array
// the the game is over

main();
