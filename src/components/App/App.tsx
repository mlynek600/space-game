import React, { useContext, useState } from 'react'

import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles,
} from '@material-ui/core'

import { Context } from '../../context'
import {
  CardDataType,
  CharacterType,
  GameDataType,
  GameType,
  StarshipType,
  WinnerType,
} from '../../types'
import {
  getRandomCard,
  getCharacterBmiDifference,
  getStarshipResult,
} from '../../utils'

import {
  GameCard,
  GameLegendTooltip,
  GamePoints,
  GameResultModal,
  GameSelect,
} from '../Game'

const useStyles = makeStyles({
  box: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 40,

    '@media (max-width: 600px)': {
      flexDirection: 'column',
    },
  },
  container: {
    height: '100%',
    paddingTop: '30px',
  },
  drawCardButton: {
    marginRight: 30,
    marginBottom: 30,
  },
  marginBottom: {
    marginBottom: 30,
  },
  vsText: {
    margin: '0 30px',
  },
})

const App: React.FC = () => {
  const classes = useStyles()

  const gameData = useContext(Context) as GameDataType

  const [gameType, setGameType] = useState<GameType>('characters')

  const [showMyCard, setShowMyCard] = useState(false)
  const [showOpponentCard, setShowOpponentCard] = useState(false)

  const [myCardData, setMyCardData] = useState<CardDataType>(null)
  const [opponentCardData, setOpponentCardData] = useState<CardDataType>(
    null
  )

  const [winner, setWinner] = useState<'me' | 'opponent' | 'draw' | null>(
    null
  )

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [myPoints, setMyPoints] = useState(0)
  const [opponentPoints, setOpponentPoints] = useState(0)

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

  const onCharactersFight = () => {
    const myResult = getCharacterBmiDifference(myCardData)

    const opponentResult = getCharacterBmiDifference(opponentCardData)

    let winner: WinnerType

    if (myResult === opponentResult) winner = 'draw'
    else winner = myResult < opponentResult ? 'me' : 'opponent'

    setWinner(winner)
  }

  const onStarshipsFight = () => {
    const myResult = getStarshipResult(myCardData)

    const opponentResult = getStarshipResult(opponentCardData)

    let winner: WinnerType

    if (myResult === opponentResult) winner = 'draw'
    else winner = myResult > opponentResult ? 'me' : 'opponent'

    setWinner(winner)
  }

  const onFightButtonClick = () => {
    if (gameType === 'characters') onCharactersFight()
    else onStarshipsFight()

    setIsModalOpen(true)
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
    setShowMyCard(false)
    setShowOpponentCard(false)

    if (winner === 'me') setMyPoints(myPoints + 1)
    else if (winner === 'opponent') setOpponentPoints(opponentPoints + 1)
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h4">Let's play the Star Wars game!</Typography>

      <GameLegendTooltip />

      {winner && (
        <GamePoints myPoints={myPoints} opponentPoints={opponentPoints} />
      )}

      <GameSelect
        gameType={gameType}
        showMyCard={showMyCard}
        setGameType={setGameType}
      />

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
          <Typography variant="h4" className={classes.vsText}>
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
          className={classes.marginBottom}
        >
          Fight!
        </Button>
      )}

      <GameResultModal
        isModalOpen={isModalOpen}
        winner={winner}
        onCloseModal={onCloseModal}
      />
    </Container>
  )
}

export default App
