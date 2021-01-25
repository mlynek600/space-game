import React from 'react'

import { Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  button: {
    marginRight: 30,
    marginBottom: 30,
  },
})

type GameDrawButtonProps = {
  disabled: boolean
  text: string

  onDrawButtonClick: () => void
}

export const GameDrawButton: React.FC<GameDrawButtonProps> = ({
  disabled,
  text,

  onDrawButtonClick,
}) => {
  const classes = useStyles()

  return (
    <Button
      disabled={disabled}
      onClick={onDrawButtonClick}
      variant="contained"
      className={classes.button}
    >
      {text}
    </Button>
  )
}
