import React, { useContext } from 'react'

import {
  Container,
  Typography,
  makeStyles,
  Button,
  ButtonGroup,
} from '@material-ui/core'

import { Context } from '../context'
import { CharacterType, StarshipType } from '../types'

import Card from './Card'

type GameDataType = {
  people: CharacterType[]
  starships: StarshipType[]
}

const useStyles = makeStyles({
  root: {
    height: '100%',
    paddingTop: '100px',
  },
  pos: {
    marginBottom: 30,
  },
})

const Game: React.FC = () => {
  const gameData = useContext(Context) as GameDataType

  const classes = useStyles()

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography variant="h4" className={classes.pos}>
        Let's play the Star Wars game!
      </Typography>

      <Typography variant="h6" className={classes.pos}>
        Select the type
      </Typography>

      <ButtonGroup size="large">
        <Button>Characters</Button>
        <Button>Starships</Button>
      </ButtonGroup>
    </Container>
  )
}

export default Game
