import React, { useContext } from 'react'

import { Container } from '@material-ui/core'

import { Context } from '../context'
import { CharacterType, StarshipType } from '../types'

import Card from './Card'

type GameDataType = {
  people: CharacterType[]
  starships: StarshipType[]
}

const Game: React.FC = () => {
  const gameData = useContext(Context) as GameDataType

  return <Container maxWidth="sm">lasldalsdlas</Container>
}

export default Game
