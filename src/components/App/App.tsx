import React, { useContext, useState } from 'react'

import {
  Container,
  Typography,
  makeStyles,
  Button,
  Tabs,
  Tab,
  Paper,
  Box,
} from '@material-ui/core'

import { Context } from '../../context'
import {
  GameDataType,
  GameType,
  CharacterType,
  StarshipType,
} from '../../types'
import { getRandomCard, getBmiDifference } from '../../utils'

import GameCard from '../Game/Card'
import GameResultModal from '../Game/ResultModal'
import GamePoints from '../Game/Points'
import GameLegendTooltip from '../Game/LegendTooltip'

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
  drawCardButton: {
    marginRight: 30,
    marginBottom: 30,
  },
  paper: {
    display: 'inline-block',
    marginBottom: 50,
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 40,

    '@media (max-width: 600px)': {
      flexDirection: 'column',
    },
  },
  vs: {
    margin: '0 30px',
  },
})

const App: React.FC = () => {
  const classes = useStyles()

  const gameData = useContext(Context) as GameDataType

  const [gameType, setGameType] = useState<GameType>('characters')

  const [showMyCard, setShowMyCard] = useState(false)

  const [showOpponentCard, setShowOpponentCard] = useState(false)

  const [myCardData, setMyCardData] = useState<
    CharacterType | StarshipType | null
  >(null)

  const [opponentCardData, setOpponentCardData] = useState<
    CharacterType | StarshipType | null
  >(null)

  const [winner, setWinner] = useState<'me' | 'opponent' | 'draw' | null>(
    null
  )

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [myPoints, setMyPoints] = useState(0)
  const [opponentPoints, setOpponentPoints] = useState(0)

  const onCloseModal = () => {
    setIsModalOpen(false)
    setShowMyCard(false)
    setShowOpponentCard(false)

    if (winner === 'me') setMyPoints(myPoints + 1)
    else if (winner === 'opponent') setOpponentPoints(opponentPoints + 1)
  }

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

    return <GameCard name={name} mass={mass} height={height} />
  }

  const getStarshipCard = (isMine: boolean) => {
    const dataSource = isMine ? myCardData : opponentCardData

    const { name, length, hyperdrive_rating } = dataSource as StarshipType

    return (
      <GameCard
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

  const getCharacterBmiDifference = (isMine: boolean) => {
    const dataSource = isMine ? myCardData : opponentCardData

    const { mass, height } = dataSource as CharacterType

    return getBmiDifference(mass, height)
  }

  const getStarshipResult = (isMine: boolean) => {
    const dataSource = isMine ? myCardData : opponentCardData

    const { length, hyperdrive_rating } = dataSource as StarshipType

    const result =
      Number(length.replace(',', '')) * Number(hyperdrive_rating)

    return result
  }

  const onCharactersFight = () => {
    const myResult = getCharacterBmiDifference(true)

    const opponentResult = getCharacterBmiDifference(false)

    let winner: 'me' | 'opponent' | 'draw'

    if (myResult === opponentResult) winner = 'draw'
    else winner = myResult < opponentResult ? 'me' : 'opponent'

    setWinner(winner)
  }

  const onStarshipsFight = () => {
    const myResult = getStarshipResult(true)

    const opponentResult = getStarshipResult(false)

    let winner: 'me' | 'opponent' | 'draw'

    if (myResult === opponentResult) winner = 'draw'
    else winner = myResult > opponentResult ? 'me' : 'opponent'

    setWinner(winner)
  }

  const onFightButtonClick = () => {
    if (gameType === 'characters') onCharactersFight()
    else onStarshipsFight()

    setIsModalOpen(true)
  }

  return (
    <>
      <Container maxWidth="md" className={classes.root}>
        <Typography variant="h4">
          Let's play the Star Wars game!
        </Typography>
        <GameLegendTooltip />

        {winner && (
          <GamePoints
            myPoints={myPoints}
            opponentPoints={opponentPoints}
          />
        )}

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
            <Tab
              disabled={showMyCard}
              label="Starships"
              value="starships"
            />
          </Tabs>
        </Paper>

        <Box>
          <Button
            disabled={showMyCard}
            onClick={onDrawMyCard}
            variant="contained"
            className={classes.drawCardButton}
          >
            Draw your card!
          </Button>

          {showMyCard && (
            <Button
              disabled={showOpponentCard}
              onClick={onDrawOpponentCard}
              variant="contained"
              className={classes.drawCardButton}
            >
              Draw opponent's card!
            </Button>
          )}
        </Box>

        <Box className={classes.box}>
          {myCard}

          {showOpponentCard && (
            <Typography variant="h4" className={classes.vs}>
              vs.
            </Typography>
          )}

          {opponentCard}
        </Box>

        {showOpponentCard && (
          <Button
            onClick={onFightButtonClick}
            variant="contained"
            color="secondary"
            className={classes.pos}
          >
            Fight!
          </Button>
        )}
      </Container>

      <GameResultModal
        isModalOpen={isModalOpen}
        winner={winner}
        onCloseModal={onCloseModal}
      />
    </>
  )
}

export default App
