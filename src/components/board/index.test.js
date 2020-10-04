import React from "react"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { Board } from "."
import configureStore from "../../store"
import { Provider } from "react-redux"

const renderBoard = () => {
  render(
    <Provider store={configureStore()}>
      <Board />
    </Provider>
  )
}

const buildCellLabel = (row, column) => `Row ${row}, Column ${column}`

const clickCell = async (row, column) => {
  const el = screen.getByLabelText(buildCellLabel(row, column))
  fireEvent.click(el)
}

const getCell = (row, column) => {
  return screen.getByLabelText(buildCellLabel(row, column))
}

describe("Tic tac toe", () => {
  beforeEach(renderBoard)
  afterEach(cleanup)

  test("when initially rendered, the cells and initial player are shown", () => {
    expect(screen.getByText("Row 0, Column 0")).toBeInTheDocument()
    expect(screen.getByText("Row 1, Column 0")).toBeInTheDocument()
    expect(screen.getByText("Row 2, Column 0")).toBeInTheDocument()
    expect(screen.getByText("Row 2, Column 2")).toBeInTheDocument()

    expect(screen.getByText("Player X's turn")).toBeInTheDocument()
  })

  test("when a cell is clicked, the value is set and the current player changes", () => {
    clickCell(0, 0)
    expect(getCell(0, 0)).toHaveTextContent("X")
    expect(screen.getByText("Player O's turn")).toBeInTheDocument()
  })

  test("three cells in a row are clicked by the same player, the win condition is set", () => {
    clickCell(0, 0) // player x
    clickCell(0, 1) // player o
    clickCell(1, 0) // player x
    clickCell(0, 2) // player o
    clickCell(2, 0) // player x

    expect(screen.getByText("Player X wins", { exact: false }))
    expect(screen.getByText("Click to restart"))
  })

  test("three cells from top left -> bottom right diagonel are clicked by the same player, the win condition is set", () => {
    clickCell(0, 0) // player x
    clickCell(0, 1) // player o
    clickCell(1, 1) // player x
    clickCell(0, 2) // player o
    clickCell(2, 2) // player x

    expect(screen.getByText("Player X wins", { exact: false }))
    expect(screen.getByText("Click to restart"))
  })

  test("three cells from top right -> bottom left diagonel are clicked by the same player, the win condition is set", () => {
    clickCell(0, 2) // player x
    clickCell(0, 0) // player o
    clickCell(1, 1) // player x
    clickCell(0, 1) // player o
    clickCell(2, 0) // player x

    expect(screen.getByText("Player X wins", { exact: false }))
    expect(screen.getByText("Click to restart"))
  })

  // some other tests I would do if I had more time
  // - three cells by same player in non-winning places doesnt result in a win
  // - three cells by player O results in a win
  // - clicking the reset results in initial state
  // - unit test other win conditions straight on the epic
  // - wouldn't add more unit tests for actions / reducer for a project this simple as
  //   behaviour is covered in the Board tests
})
