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
  return { board };
})();

//handle players turn
const playerTurn = (() => {
  const num = 0;
  return { num };
})();

//handle players
const player1 = () => {
  //factory
  const player1 = 0;
  return { player1 };
};

const player2 = () => {
  //factory
  const player2 = 0;
  return { player2 };
};

// display board
function renderBoard() {
  let index = 0;
  gboard.forEach(function (field) {
    field.addEventListener("click", function () {
      const h = field.classList[1];

      if (playerTurn.num == 0) {
        gameBoard.board.push("x");
        selector(h).textContent = gameBoard.board[index];
        index++;
        playerTurn.num++;
      } else if (playerTurn.num == 1) {
        gameBoard.board.push("o");
        selector(h).textContent = gameBoard.board[index];
        index++;
        playerTurn.num--;
      }
    });
  });
}

renderBoard();
