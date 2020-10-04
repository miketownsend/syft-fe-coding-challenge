import { combineEpics, ofType } from "redux-observable"
import { filter, map } from "rxjs/operators"
import { every, eq, pipe, range, map as _map, tap } from "lodash/fp"
import { SELECT_CELL, winGame, WIN_GAME } from "../actions/moves"

const BOARD_SIZE = 3

const selectBoard = (state) => state.board
const selectGame = (state) => state.game

const checkForWinningMove = (board, row, col, currentPlayer) => {
  return (
    checkRowForWinCondition(board, row, currentPlayer) ||
    checkColumnForWinCondition(board, col, currentPlayer) ||
    checkDiagonalWinConditions(board, currentPlayer)
  )
}

const checkColumnForWinCondition = (board, col, currentPlayer) => {
  return pipe(
    _map((row) => row[col]),
    every(eq(currentPlayer))
  )(board)
}

const checkRowForWinCondition = (board, row, currentPlayer) =>
  every(eq(currentPlayer))(board[row])

const checkDiagonalWinConditions = (board, currentPlayer) => {
  const topLeftToBottomRightWin = pipe(
    _map((index) => board[index][index]),
    every(eq(currentPlayer))
  )(range(0, BOARD_SIZE - 1))
  if (topLeftToBottomRightWin) return topLeftToBottomRightWin

  const topRightToBottomLeftWin = pipe(
    _map((index) => board[index][BOARD_SIZE - index - 1]),
    every(eq(currentPlayer))
  )(range(0, BOARD_SIZE - 1))

  return topRightToBottomLeftWin
}

const winnerEpic = (action$, state$) =>
  action$.pipe(
    ofType(SELECT_CELL),
    filter(({ row, col, currentPlayer }) => {
      const board = selectBoard(state$.value)
      return checkForWinningMove(board, row, col, currentPlayer)
    }),
    map(({ currentPlayer }) => winGame(currentPlayer))
  )

export default combineEpics(winnerEpic)
