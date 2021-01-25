import React from 'react'
import ReactDOM from 'react-dom'

import 'fontsource-roboto'

import App from './components/App/App'
import ContextProvider from './context'
import reportWebVitals from './reportWebVitals'

import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
