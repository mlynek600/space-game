import React from 'react'

import InfoIcon from '@material-ui/icons/Info'

import { Tooltip, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  tooltip: {
    marginBottom: 20,
    marginTop: 10,
  },
})

const GameLegendTooltip: React.FC = () => {
  const classes = useStyles()

  const tooltipTitle = (
    <>
      <span>
        A character with better <strong>BMI</strong> wins.
      </span>
      <br />
      <span>
        A starship with higher result of{' '}
        <strong>length • hyperdrive rating</strong> wins.
      </span>
    </>
  )

  return (
    <Tooltip
      title={tooltipTitle}
      arrow
      className={classes.tooltip}
      enterTouchDelay={1}
    >
      <InfoIcon />
    </Tooltip>
  )
}

export default GameLegendTooltip
