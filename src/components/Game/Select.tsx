import React from 'react'

import {
  Paper,
  Tab,
  Tabs,
  Typography,
  makeStyles,
} from '@material-ui/core'

import { GameType } from '../../types'

const useStyles = makeStyles({
  paper: {
    display: 'inline-block',
    marginBottom: 50,
  },
  select: {
    marginBottom: 10,
  },
})

type SelectGameProps = {
  gameType: GameType
  showMyCard: boolean

  setGameType: React.Dispatch<React.SetStateAction<GameType>>
}

export const GameSelect: React.FC<SelectGameProps> = ({
  gameType,
  showMyCard,

  setGameType,
}) => {
  const classes = useStyles()

  return (
    <>
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
    </>
  )
}
