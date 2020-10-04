import { combineEpics, ofType } from "redux-observable"
import { filter, map } from "rxjs/operators"
import { every, eq } from "lodash/fp"
import { SELECT_CELL, winGame, WIN_GAME } from "../actions/moves"

const selectBoard = (state) => state.board
const selectGame = (state) => state.game

const checkForWinningMove = (board, row, col, currentPlayer) => {
  return checkRowForWinningMove(board, row, currentPlayer)
}

const checkRowForWinningMove = (board, row, currentPlayer) =>
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
