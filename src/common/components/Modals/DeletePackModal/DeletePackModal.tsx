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
      <Typography
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      >
        <span
          style={{
            marginBottom: '30px',
            marginTop: '30px',
          }}
        >
          Do you really want to remove <b>{props.packName}</b>?<div>All Cards will be deleted.</div>
        </span>
      </Typography>
    </BasicModal>
  )
}
