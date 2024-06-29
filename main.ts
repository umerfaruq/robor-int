// Game Board: 1 | 2 | 3 | 4 | 5 | 6 | 1 | 2 | 3 | 4 | 5 | 6 | 1 | 2 | 3 | 4 | 5 | 6 | 1 | 2 | 3 | 4 | 5 | 6

function main() {
  let board1 = [
    1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6,
  ];

  let winner = gameloop(board1);
  console.log(winner + " Wins!");
}

/*
    Assumptions:
    - Dice does not have a zero
    - If dice are equal player moves to the next 2nd occurrence of that number on the board
*/
function gameloop(boardState: number[]): string {
  let p1Pos = 0;
  let p2Pos = 0;

  while (true) {
    if (p1Pos >= boardState.length || p2Pos >= boardState.length) {
      break;
    }

    console.log("Player 1 Turn:");
    p1Pos = playerTurn(p1Pos, boardState);

    console.log("Player 2 Turn:");
    p2Pos = playerTurn(p2Pos, boardState);
  }

  return p1Pos > p2Pos ? "Player 1" : "Player 2";
}

function playerTurn(playerPosition, boardState): number {
  let dice1 = diceRoll();
  let dice2 = diceRoll();

  if (dice1 === dice2) {
    let i = playerPosition;
    for (i; boardState[i] != 6; i++) {}
    for (i; i < boardState.length; i++) {
      if ((boardState[i] = dice1)) {
        playerPosition = i;
      }
    }
    if (i > boardState.length) playerPosition = i;
  } else {
    let maxDice = dice1 >= dice2 ? dice1 : dice2;
    for (let i = playerPosition + 1; i < boardState.length; i++) {
      if ((boardState[i] = maxDice)) {
        playerPosition = i;
      }
    }
  }

  return playerPosition;
}

function printBoard(p1Pos, p2Pos, board) {
  let printedBoard = "";
  for (let i = 0; i < board.length; i++) {
    printedBoard.concat("|" + i);
    if (p1Pos == i) printedBoard.concat("(P1)");
    if (p2Pos == i) printedBoard.concat("(P2)");
  }
  console.log(printedBoard);
}

function diceRoll() {
  return Math.floor(Math.random() * (6 - 1) + 1);
}
