import { combineReducers } from "redux"
import { SELECT_CELL, WIN_GAME } from "../actions/moves"

export const createBoard = (i) =>
  Array(i)
    .fill(null)
    .map((_) => Array(i).fill(null))

export const board = (state = createBoard(3), action) => {
  switch (action.type) {
    case SELECT_CELL: {
      const newBoard = JSON.parse(JSON.stringify(state))
      newBoard[action.row][action.col] = action.currentPlayer
      return newBoard
    }
    default: {
      return state
    }
  }
}

export const game = (state = { currentPlayer: "X", winner: null }, action) => {
  switch (action.type) {
    case SELECT_CELL: {
      return {
        ...state,
        currentPlayer: state.currentPlayer === "X" ? "O" : "X",
      }
    }
    case WIN_GAME: {
      return {
        ...state,
        winner: action.currentPlayer,
      }
    }
    default: {
      return state
    }
  }
}

export default combineReducers({
  board,
  game,
})
