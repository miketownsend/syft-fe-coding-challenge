import React from "react"
import classnames from "classnames"
import "./index.css"

const Cell = ({ value, x, y }) => {
  const id = `input-${x}-${y}`
  return (
    <li
      className={classnames("Cell", {
        [`CellPlayer${value}`]: !!value,
      })}
    >
      <label
        id={id}
        className={"VisuallyHidden"}
      >{`Row ${y}, Column ${x}`}</label>
      <button
        role="checkbox"
        aria-checked="mixed"
        aria-labelledby={id}
        className={"CellValue"}
      >
        {value ? value : ""}
      </button>
    </li>
  )
}

export default Cell
