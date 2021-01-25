import React from 'react'

import {
  Card,
  CardContent,
  Typography,
  makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles({
  card: {
    width: 240,
    height: 240,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 5px',
  },
  marginBottom: {
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 50,
    height: 50,
  },
})

type GameCardProps = {
  name: string
  mass?: string
  height?: string
  length?: string
  hyperdriveRating?: string
}

export const GameCard: React.FC<GameCardProps> = ({
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
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" className={classes.title}>
          {name}
        </Typography>

        <Typography className={classes.marginBottom}>
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
