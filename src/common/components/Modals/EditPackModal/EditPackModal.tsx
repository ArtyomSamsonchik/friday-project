import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'

import { Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'

import { AddPackData } from '../../../../features/cardsPack/card-packs-api'
import { BasicModal } from '../BasicModal/BasicModal'

type PropsType = {
  icon: JSX.Element
  packId: string
  editCardPack: (data: AddPackData) => void
  packName: string
}

export const EditPackModal = (props: PropsType) => {
  const [packTitle, SetPackTitle] = useState(props.packName)
  const [isPrivate, SetIsPrivate] = useState(false)

  const callback = () => {
    const data = {
      _id: props.packId,
      name: packTitle,
      private: isPrivate,
    }

    props.editCardPack(data)
    SetPackTitle('')
  }
  const packTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    SetPackTitle(e.currentTarget.value)
  }
  const closeModal = () => {
    SetPackTitle(props.packName)
    SetIsPrivate(false)
  }

  return (
    <BasicModal
      buttonName={'Save'}
      icon={props.icon}
      closeModal={closeModal}
      callback={callback}
      title={'Edit pack'}
    >
      <Typography
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      >
        <TextField
          label="Pack Name"
          margin="normal"
          type="email"
          variant="standard"
          value={packTitle}
          onChange={packTitleChange}
        />
        <span style={{ marginBottom: '30px', marginTop: '30px' }}>
          <Checkbox checked={isPrivate} onChange={() => SetIsPrivate(!isPrivate)} /> Private
        </span>
      </Typography>
    </BasicModal>
  )
}
