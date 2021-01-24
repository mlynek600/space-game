import React, { useContext, useState } from 'react'

import {
  Container,
  Typography,
  makeStyles,
  Button,
  ButtonGroup,
  Tabs,
  Tab,
  Paper,
  Box,
} from '@material-ui/core'

import { Context } from '../context'
import {
  GameDataType,
  GameType,
  CharacterType,
  StarshipType,
} from '../types'
import { getRandomCard } from '../utils'

import Card from './Card'

const useStyles = makeStyles({
  root: {
    height: '100%',
    paddingTop: '30px',
  },
  pos: {
    marginBottom: 30,
  },
  select: {
    marginBottom: 10,
  },
  drawButtons: {
    display: 'block',
    marginBottom: 50,
  },
  paper: {
    display: 'inline-block',
    marginBottom: 50,
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 40,
  },
  vs: {
    margin: '0 30px',
  },
})

const Game: React.FC = () => {
  const classes = useStyles()

  const [gameType, setGameType] = useState<GameType>('characters')

  const [showMyCard, setShowMyCard] = useState(false)

  const [showOpponentCard, setShowOpponentCard] = useState(false)

  const [myCardData, setMyCardData] = useState<
    CharacterType | StarshipType | null
  >(null)

  const [opponentCardData, setOpponentCardData] = useState<
    CharacterType | StarshipType | null
  >(null)

  const gameData = useContext(Context) as GameDataType

  const onDrawMyCard = () => {
    const myCardData = getRandomCard(gameData, gameType)

    setMyCardData(myCardData)

    setShowMyCard(true)
  }

  const onDrawOpponentCard = () => {
    const opponentCardData = getRandomCard(gameData, gameType)

    setOpponentCardData(opponentCardData)

    setShowOpponentCard(true)
  }

  const getCharacterCard = (isMine: boolean) => {
    const dataSource = isMine ? myCardData : opponentCardData

    const { name, mass, height } = dataSource as CharacterType

    return <Card name={name} mass={mass} height={height} />
  }

  const getStarshipCard = (isMine: boolean) => {
    const dataSource = isMine ? myCardData : opponentCardData

    const { name, length, hyperdrive_rating } = dataSource as StarshipType

    return (
      <Card
        name={name}
        length={length}
        hyperdriveRating={hyperdrive_rating}
      />
    )
  }

  const myCard =
    showMyCard &&
    (gameType === 'characters'
      ? getCharacterCard(true)
      : getStarshipCard(true))

  const opponentCard =
    showOpponentCard &&
    (gameType === 'characters'
      ? getCharacterCard(false)
      : getStarshipCard(false))

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography variant="h4" className={classes.pos}>
        Let's play the Star Wars game!
      </Typography>
      <Typography variant="h6" className={classes.select}>
        Select the type:
      </Typography>
      <Paper square className={classes.paper}>
        <Tabs
          value={gameType}
          onChange={(_, value) => setGameType(value)}
          indicatorColor="primary"
        >
          <Tab
            disabled={showMyCard}
            label="Characters"
            value="characters"
          />
          <Tab disabled={showMyCard} label="Starships" value="starships" />
        </Tabs>
      </Paper>
      <ButtonGroup size="large" className={classes.drawButtons}>
        <Button disabled={showMyCard} onClick={onDrawMyCard}>
          Draw your card!
        </Button>

        {showMyCard && (
          <Button disabled={showOpponentCard} onClick={onDrawOpponentCard}>
            Draw opponent's card!
          </Button>
        )}
      </ButtonGroup>

      <Box className={classes.box}>
        {myCard}

        <Typography variant="h4" className={classes.vs}>
          vs.
        </Typography>

        {opponentCard}
      </Box>

      <Button
        // disabled={showOpponentCard}
        // onClick={onDrawOpponentCard}
        variant="contained"
        color="secondary"
      >
        Fight!
      </Button>
    </Container>
  )
}

export default Game
