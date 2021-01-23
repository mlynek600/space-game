import React from 'react'
import './App.css'
import Game from './components/Game'
import ContextProvider from './context'
import 'fontsource-roboto'

const App: React.FC = () => {
  return (
    <ContextProvider>
      <div className="App">
        <Game />
      </div>
    </ContextProvider>
  )
}

export default App
