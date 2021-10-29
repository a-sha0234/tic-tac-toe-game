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
  const board = [];
  const winnable = [];
  return { board };
})();

//handle players turn
const playerTurn = (() => {
  //module
  let num = 0;
  return { num };
})();

const player = () => {
  const player1Move = (field) => {
    const h = field.classList[1];
    field.classList.add("used");
    gameBoard.board.push("x");
    selector(h).innerHTML = `<i class="fas fa-times"></i>`;
    playerTurn.num++;
  };

  const player2Move = (field) => {
    const h = field.classList[1];
    field.classList.add("used");
    gameBoard.board.push("o");
    selector(h).innerHTML = `<i class="far fa-circle"></i>`;
    playerTurn.num--;
  };

  let player1Score = 0;
  let player2Score = 0;

  return { player1Score, player2Score, player1Move, player2Move };
};

const player1 = player();
const player2 = player();

// handle events
function main() {
  gboard.forEach(function (field) {
    field.addEventListener("click", function () {
      if (playerTurn.num == 0 && checkIfOccupied(field) == false) {
        player1.player1Move(field);
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
    used = True;
  }
  return used;
}

main();
