import React from 'react'

import { Modal, makeStyles, Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  paper: {
    height: 100,
    width: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    outline: 'none',
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

type GameResultModalProps = {
  isModalOpen: boolean
  winner: 'me' | 'opponent' | 'draw' | null

  onCloseModal: () => void
}

export const GameResultModal: React.FC<GameResultModalProps> = ({
  isModalOpen,
  winner,

  onCloseModal,
}) => {
  const classes = useStyles()

  const modalText =
    winner === 'draw'
      ? 'Draw!'
      : winner === 'me'
      ? 'You won!'
      : 'You lost!'

  const body = (
    <Paper className={classes.paper}>
      <Typography color="primary" variant="h5">
        {modalText}
      </Typography>
    </Paper>
  )

  return (
    <Modal
      open={isModalOpen}
      onClose={onCloseModal}
      className={classes.modal}
    >
      {body}
    </Modal>
  )
}
