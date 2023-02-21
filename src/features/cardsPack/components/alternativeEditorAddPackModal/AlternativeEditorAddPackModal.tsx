import React, { ChangeEvent, FC, memo, useState, KeyboardEvent } from 'react'

import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { string, ValidationError } from 'yup'

import {
  AlternativeBasicModal,
  AlternativeBasicModalProps,
} from '../../../../common/components/AlternativeBasicModal/AlternativeBasicModal'
import { useAppDispatch } from '../../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../../utils/hooks/useAppSelector'
import { selectCardPack } from '../../cards-pack-selectors'
import { addCardPackTC, updateCardPackTC } from '../../cards-pack-slice'

type AlternativeEditorAddPackModalProps = Pick<
  AlternativeBasicModalProps,
  'isOpen' | 'title' | 'onClose'
> & { packId: string }

const validationSchema = string().trim().required('pack name should not be empty!')

export const AlternativeEditorAddPackModal: FC<AlternativeEditorAddPackModalProps> = memo(props => {
  const { packId, onClose, ...restProps } = props

  const pack = useAppSelector(state => selectCardPack(state, packId))
  const initPackName = pack?.name || ''

  const [packName, setPackName] = useState(initPackName)
  const [isPrivate, setIsPrivate] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const dispatch = useAppDispatch()

  const handlePackTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setPackName(e.currentTarget.value)
  }

  const handleIsPrivateChange = () => setIsPrivate(isPrivate => !isPrivate)

  const handleEditorAddPack = () => {
    try {
      const newPackName = validationSchema.validateSync(packName)

      if (pack) {
        dispatch(updateCardPackTC({ _id: packId, name: newPackName, private: isPrivate }))
      } else {
        dispatch(addCardPackTC({ name: newPackName, private: isPrivate }))
      }
      setPackName(newPackName)
      onClose()
    } catch (e) {
      if (ValidationError.isError(e)) setError(e.errors[0])
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditorAddPack()
      e.preventDefault()
    }
  }

  const handleEditModalClose = () => {
    onClose()
    setPackName(initPackName)
    setError(null)
  }

  return (
    <AlternativeBasicModal
      primaryButtonName="Save"
      primaryButtonIsDisabled={!!error}
      onPrimaryButtonClick={handleEditorAddPack}
      onClose={handleEditModalClose}
      {...restProps}
    >
      <Stack maxHeight="45vh">
        <TextField
          autoFocus
          label="Pack Name"
          variant="standard"
          value={packName}
          error={!!error}
          helperText={error || ' '}
          onChange={handlePackTitleChange}
          onKeyDown={handleKeyDown}
        />
        <FormControlLabel
          control={<Checkbox checked={isPrivate} onChange={handleIsPrivateChange} />}
          label="Private"
        />
      </Stack>
    </AlternativeBasicModal>
  )
})
