import React from 'react'

import {
  Card,
  CardContent,
  Typography,
  makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    width: 250,
    height: 250,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 5px',
  },
  pos: {
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 50,
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
    ? `height: ${height}`
    : `hyperdrive rating: ${hyperdriveRating}`

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" className={classes.title}>
          {name}
        </Typography>

        <Typography className={classes.pos}>
          {bull}
          {firstFeature}
        </Typography>

        <Typography>
          {bull}
          {secondFeature}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default GameCard
