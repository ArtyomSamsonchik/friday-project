import React from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

import { BasicModal } from '../BasicModal/BasicModal'

type PropsType = {
  icon: JSX.Element
  packId: string
  packName: string
  deleteCardPack: (packId: string) => void
}

export const DeletePackModal = (props: PropsType) => {
  const callback = () => {
    props.deleteCardPack(props.packId)
  }

  return (
    <BasicModal
      buttonName={'Delete'}
      buttonColor={'error'}
      icon={props.icon}
      callback={callback}
      title={'Delete pack'}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography component="span" sx={{ my: '30px' }}>
          Do you really want to remove <b>{props.packName}</b>?
          <br />
          All Cards will be deleted.
        </Typography>
      </Box>
    </BasicModal>
  )
}
