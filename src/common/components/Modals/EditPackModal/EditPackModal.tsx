import React, { ChangeEvent, useState } from 'react'

import { Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'

import { UpdatePackData } from '../../../../features/cardsPack/card-packs-api'
import { BasicModal } from '../BasicModal/BasicModal'

type PropsType = {
  icon: JSX.Element
  packId: string
  editCardPack: (data: UpdatePackData) => void
  packName: string
}

export const EditPackModal = (props: PropsType) => {
  const [packTitle, setPackTitle] = useState(props.packName)
  const [isPrivate, setIsPrivate] = useState(false)

  const callback = () => {
    const data = {
      _id: props.packId,
      name: packTitle,
      private: isPrivate,
    }

    props.editCardPack(data)
    setPackTitle('')
  }
  const packTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPackTitle(e.currentTarget.value)
  }
  const closeModal = () => {
    setIsPrivate(false)
  }

  return (
    <BasicModal
      handleOpen={() => setPackTitle(props.packName)}
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
          <Checkbox checked={isPrivate} onChange={() => setIsPrivate(!isPrivate)} />
          Make private
        </span>
      </Typography>
    </BasicModal>
  )
}
