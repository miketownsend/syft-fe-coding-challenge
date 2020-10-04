export const SELECT_CELL = "SELECT_CELL"
export const WIN_GAME = "WIN_GAME"

export function selectCell(currentPlayer, row, col) {
  return {
    type: SELECT_CELL,
    currentPlayer,
    row,
    col,
  }
}

export function winGame(currentPlayer) {
  return {
    type: WIN_GAME,
    currentPlayer,
  }
}
