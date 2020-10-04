import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { Board } from "./components/Board"
import configureStore from "./store"
import { Provider } from "react-redux"

const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className={"page"}>
        <Board />
      </div>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
