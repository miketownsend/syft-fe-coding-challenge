import React from "react"
import "./index.css"
import { useSelector, useDispatch } from "react-redux"

import Cell from "../Cell"
import { selectCell } from "../../store/actions/moves"

const selectBoard = (state) => state.board
const selectGame = (state) => state.game

const getRandomCell = (i) => Math.floor(Math.random() * i)

export const Board = () => {
  const board = useSelector(selectBoard)
  const game = useSelector(selectGame)
  const dispatch = useDispatch()

  return (
    <div className="Board">
      <h2>Mike Townsend's Tic Tac Toe</h2>
      <h1
        onClick={() =>
          dispatch(
            selectCell(
              game.currentPlayer,
              getRandomCell(board.length),
              getRandomCell(board.length)
            )
          )
        }
      >
        Player {game.currentPlayer}'s turn
      </h1>
      <ul className={"Cells"}>
        {board.map((rows, y) =>
          rows.map((cell, x) => (
            <Cell key={`cell-${x}-${y}`} value={cell} x={x} y={y} />
          ))
        )}
      </ul>
    </div>
  )
}
