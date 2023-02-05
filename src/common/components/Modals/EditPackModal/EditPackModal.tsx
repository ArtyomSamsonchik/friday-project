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
  isPrivate: boolean
}

export const EditPackModal = (props: PropsType) => {
  console.log('re')
  const { icon, packId, editCardPack, packName, isPrivate } = props
  const [packTitle, setPackTitle] = useState(packName)
  const [privatePack, setPrivatePack] = useState(isPrivate)
  const callback = () => {
    const data = {
      _id: packId,
      name: packTitle,
      private: privatePack,
    }

    editCardPack(data)
    setPackTitle('')
  }
  const packTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPackTitle(e.currentTarget.value)
  }
  const closeModal = () => {
    setPackTitle(packName)
    setPrivatePack(isPrivate)
  }

  return (
    <BasicModal
      buttonName={'Save'}
      icon={icon}
      handleOpen={() => setPackTitle(packName)}
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
          <Checkbox checked={isPrivate} onChange={() => setPrivatePack(!privatePack)} /> Private
        </span>
      </Typography>
    </BasicModal>
  )
}
