import { combineEpics, ofType } from "redux-observable"
import { filter, map } from "rxjs/operators"
import { every, eq, pipe, map as lodashMap } from "lodash/fp"
import { SELECT_CELL, winGame, WIN_GAME } from "../actions/moves"

const selectBoard = (state) => state.board
const selectGame = (state) => state.game

const checkForWinningMove = (board, row, col, currentPlayer) => {
  return (
    checkRowForWinCondition(board, row, currentPlayer) ||
    checkColumnForWinCondition(board, col, currentPlayer)
  )
}

const checkColumnForWinCondition = (board, col, currentPlayer) => {
  return pipe(
    lodashMap((row) => row[col]),
    every(eq(currentPlayer))
  )(board)
}

const checkRowForWinCondition = (board, row, currentPlayer) =>
  every(eq(currentPlayer))(board[row])

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
