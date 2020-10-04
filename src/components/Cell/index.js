import React from "react"
import classnames from "classnames"
import "./index.css"

const noop = () => {}

const Cell = ({ value, row, column, onClick }) => {
  const id = `input-${row}-${column}`
  return (
    <li
      className={classnames("Cell", {
        [`CheckedCell`]: !!value,
      })}
    >
      <label
        id={id}
        className={"VisuallyHidden"}
      >{`Row ${row}, Column ${column}`}</label>
      <div
        role="checkbox"
        aria-checked="mixed"
        aria-labelledby={id}
        className={"CellValue"}
        onClick={value ? noop : () => onClick(row, column)}
      >
        {value ? value : ""}
      </div>
    </li>
  )
}

export default Cell
