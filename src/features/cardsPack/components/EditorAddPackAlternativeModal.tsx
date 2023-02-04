import React, { ChangeEvent, FC, memo, useEffect, useState } from 'react'

import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'

import {
  AlternativeAddModal,
  AlternativeAddModalProps,
} from '../../../common/components/AlternativeModals/AlternativeAddModal'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { addCardPackTC, updateCardPackTC } from '../cards-pack-slice'

type Add_EditPackAlternativeModalProps = Omit<AlternativeAddModalProps, 'onSave'> & {
  packId: string
  packName: string
}

export const EditorAddPackAlternativeModal: FC<Add_EditPackAlternativeModalProps> = memo(props => {
  const { packId, packName, ...restProps } = props

  const [packTitle, setPackTitle] = useState(packName)
  const [isPrivate, setIsPrivate] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (packName) {
      setPackTitle(packName)
    }
  }, [packName])

  const handlePackTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPackTitle(e.currentTarget.value)
  }

  const handleIsPrivateChange = () => setIsPrivate(isPrivate => !isPrivate)

  const editorAddPack = () => {
    if (packName) {
      dispatch(updateCardPackTC({ _id: packId, name: packTitle, private: isPrivate }))
    } else {
      dispatch(addCardPackTC({ name: packTitle, private: isPrivate }))
    }
  }

  return (
    <AlternativeAddModal onSave={editorAddPack} {...restProps}>
      <FormGroup>
        <TextField
          label="Pack Name"
          variant="standard"
          value={packTitle}
          onChange={handlePackTitleChange}
        />
        <FormControlLabel
          control={<Checkbox checked={isPrivate} onChange={handleIsPrivateChange} />}
          label="Private"
        ></FormControlLabel>
      </FormGroup>
    </AlternativeAddModal>
  )
})
