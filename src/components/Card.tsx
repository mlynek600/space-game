import React from 'react'

import {
  Card,
  CardContent,
  Typography,
  makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    width: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
  },
})

type GameCardProps = {
  name: string
  mass?: string
  height?: string
  length?: string
  hyperdriveRating?: string
}

const GameCard: React.FC<GameCardProps> = ({
  name,
  mass,
  height,
  length,
  hyperdriveRating,
}) => {
  const classes = useStyles()

  const bull = <span className={classes.bullet}>•</span>

  const firstFeature = mass ? `mass: ${mass}` : `length: ${length}`

  const secondFeature = height
    ? `height: ${mass}`
    : `hyperdrive rating: ${hyperdriveRating}`

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>

        <Typography className={classes.pos} color="textSecondary">
          {bull}
          {firstFeature}
        </Typography>

        <Typography variant="body2" component="p">
          {bull}
          {secondFeature}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default GameCard
