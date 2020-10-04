import React from "react"
import { cleanup, render, screen } from "@testing-library/react"
import { Board } from "."
import configureStore from "../../store"
import { Provider } from "react-redux"

describe("Tic Tac Toe rendering", () => {
  beforeAll(() => {
    render(
      <Provider store={configureStore()}>
        <Board />
      </Provider>
    )
  })

  afterAll(cleanup)

  it("renders all the cells", () => {
    expect(screen.getByText("Row 0, Column 0")).toBeInTheDocument()
    expect(screen.getByText("Row 1, Column 0")).toBeInTheDocument()
    expect(screen.getByText("Row 2, Column 0")).toBeInTheDocument()
    expect(screen.getByText("Row 2, Column 2")).toBeInTheDocument()
  })
})
