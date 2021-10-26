"use strict";

//selectors
const gboard = document.querySelectorAll(".field");

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
  console.log(gameBoard.board);
}

renderBoard();
