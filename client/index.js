import React from 'react'
import ReactDOM from 'react-dom'

const App = (props) => (
  <div>Hello!</div>
)

if (module.hot) {
  module.hot.accept()
}

ReactDOM.render(<App />, document.getElementById('root'))
