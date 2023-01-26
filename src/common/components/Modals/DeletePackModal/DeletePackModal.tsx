import React from 'react'

import { Typography } from '@mui/material'

import { BasicModal } from '../BasicModal/BasicModal'

type PropsType = {
  icon: JSX.Element
  packId: string
  packName: string
  deleteCardPack: (packId: string) => void
}

export const DeletePackModal = (props: PropsType) => {
  const { icon, packId, packName, deleteCardPack } = props
  const callback = () => {
    deleteCardPack(packId)
  }

  return (
    <BasicModal
      buttonName={'Delete'}
      buttonColor={'error'}
      icon={icon}
      callback={callback}
      title={'Delete pack'}
    >
      <Typography
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      >
        <span
          style={{
            marginBottom: '30px',
            marginTop: '30px',
          }}
        >
          Do you really want to remove <b>{packName}</b>?<div>All Cards will be deleted.</div>
        </span>
      </Typography>
    </BasicModal>
  )
}
