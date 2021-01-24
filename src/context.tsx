import React, { createContext, useState, useEffect } from 'react'

import axios from 'axios'

import { CharacterType, StarshipType } from './types'

type DefaultContext = {
  characters: CharacterType[] | null
  starships: StarshipType[] | null
}

export const Context = createContext<DefaultContext>({
  characters: null,
  starships: null,
})

const ContextProvider: React.FC = ({ children }) => {
  useEffect(() => {
    getCharacters()
    getStarships()
  }, [])

  const [characters, setCharacters] = useState<CharacterType[] | null>(
    null
  )
  const [starships, setStarships] = useState<StarshipType[] | null>(null)

  const getCharacters = () => {
    axios
      .get('https://swapi.dev/api/people/?page=1')
      .then((response) => {
        setCharacters(response.data.results)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getStarships = () => {
    axios
      .get('https://swapi.dev/api/starships/?page=1')
      .then((response) => {
        setStarships(response.data.results)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Context.Provider
      value={{ characters: characters, starships: starships }}
    >
      {children}
    </Context.Provider>
  )
}

export default ContextProvider
