import React, { createContext, useState, useEffect } from 'react'

import axios from 'axios'

import { CharacterType, StarshipType } from './types'

type DefaultContext = {
  people: CharacterType[] | null
  starships: StarshipType[] | null
}

export const Context = createContext<DefaultContext>({
  people: null,
  starships: null,
})

const ContextProvider: React.FC = ({ children }) => {
  useEffect(() => {
    getPeople()
    getStarships()
  }, [])

  const [people, setPeople] = useState<CharacterType[] | null>(null)
  const [starships, setStarships] = useState<StarshipType[] | null>(null)

  const getPeople = () => {
    axios
      .get('https://swapi.dev/api/people/?page=1')
      .then((response) => {
        setPeople(response.data.results)
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
    <Context.Provider value={{ people: people, starships: starships }}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider
