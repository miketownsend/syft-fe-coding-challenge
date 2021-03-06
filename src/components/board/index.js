import React from "react"
import "./index.css"
import { useSelector, useDispatch } from "react-redux"

import Cell from "../Cell"
import { selectCell, restartGame } from "../../store/actions/moves"

const selectBoard = (state) => state.board
const selectGame = (state) => state.game

const getRandomCell = (i) => Math.floor(Math.random() * i)

export const Board = () => {
  const board = useSelector(selectBoard)
  const game = useSelector(selectGame)
  const dispatch = useDispatch()

  const onCellClick = (row, column) => {
    dispatch(selectCell(game.currentPlayer, row, column))
  }

  const onBannerClick = (row, column) => {
    dispatch(restartGame())
  }

  return (
    <div className="Board">
      <h2>Mike Townsend's Tic Tac Toe</h2>
      <h1>Player {game.currentPlayer}'s turn</h1>
      <ul className={"Cells"}>
        {board.map((rows, rowIndex) =>
          rows.map((cell, columnIndex) => (
            <Cell
              key={`cell-${rowIndex}-${columnIndex}`}
              value={cell}
              column={columnIndex}
              row={rowIndex}
              onClick={onCellClick}
            />
          ))
        )}
      </ul>
      {game.winner && (
        <div className={"WinnerOverlay"} onClick={onBannerClick}>
          <h1 className={"WinnerBanner"}>Player {game.winner} Wins!!!</h1>
          <p className={"RestartMessage"}>Click to restart</p>
        </div>
      )}
    </div>
  )
}
