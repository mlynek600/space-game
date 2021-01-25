import React from 'react'

import { Box, Typography, makeStyles } from '@material-ui/core'

type GamePointsProps = {
  myPoints: number
  opponentPoints: number
}

const useStyles = makeStyles({
  box: { marginBottom: 20 },
})

const GamePoints: React.FC<GamePointsProps> = ({
  myPoints,
  opponentPoints,
}) => {
  const classes = useStyles()

  return (
    <Box className={classes.box}>
      <Typography variant="body1">Your points: {myPoints}</Typography>

      <Typography variant="body1">
        Opponent's points: {opponentPoints}
      </Typography>
    </Box>
  )
}

export default GamePoints
