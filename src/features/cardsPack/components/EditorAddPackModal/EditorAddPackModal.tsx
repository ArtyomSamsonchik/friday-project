import React, { ChangeEvent, FC, KeyboardEvent, memo, useCallback, useState } from 'react'

import { SxProps } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { string, ValidationError } from 'yup'

import {
  ConfirmModal,
  ConfirmModalProps,
} from '../../../../common/components/Modals/ConfirmModal/ConfirmModal'
import { ModalMediaLoader } from '../../../../common/components/Modals/ConfirmModal/ModalMediaLoader'
import { useAppDispatch } from '../../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../../utils/hooks/useAppSelector'
import { AddPackData } from '../../card-packs-api'
import { selectCardPack, selectPacksStatus } from '../../cards-pack-selectors'
import { addCardPackTC, updateCardPackTC } from '../../cards-pack-slice'

const validationSchema = string().trim().required('pack name should not be empty!')
const modalMediaSxProps: SxProps = { mb: 3 }

type EditorAddPackModalProps = Pick<ConfirmModalProps, 'isOpen' | 'title' | 'onClose'> & {
  packId: string
}

export const EditorAddPackModal: FC<EditorAddPackModalProps> = memo(props => {
  const { packId, onClose, ...restProps } = props

  const pack = useAppSelector(state => selectCardPack(state, packId))
  const status = useAppSelector(selectPacksStatus)
  const initPackName = pack?.name || ''
  const initImageSrc = pack?.deckCover || ''

  const [packName, setPackName] = useState(initPackName)
  const [isPrivate, setIsPrivate] = useState(false)
  const [imageSrc, setImageSrc] = useState(initImageSrc)
  const [error, setError] = useState<string | null>(null)
  const dispatch = useAppDispatch()

  const handlePackTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setPackName(e.currentTarget.value)
  }

  const handleIsPrivateChange = () => setIsPrivate(isPrivate => !isPrivate)

  const handleModalSubmit = async () => {
    try {
      const newPackName = validationSchema.validateSync(packName)
      const packData: AddPackData = {
        name: newPackName,
        private: isPrivate,
        deckCover: imageSrc,
      }

      if (pack) {
        const newPack = await dispatch(updateCardPackTC({ ...packData, _id: packId }))

        if (newPack) setPackName(newPack.name)
      } else {
        await dispatch(addCardPackTC(packData))
        setPackName('')
      }

      onClose()
    } catch (e) {
      if (ValidationError.isError(e)) setError(e.errors[0])
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      // noinspection JSIgnoredPromiseFromCall
      handleModalSubmit()
      e.preventDefault()
    }
  }

  const handleEditModalClose = () => {
    onClose()
    setPackName(initPackName)
    setImageSrc(initImageSrc)
    setError(null)
  }

  const handleImageUpload = useCallback((file64: string) => setImageSrc(file64), [])

  const handleImageRemove = useCallback(() => setImageSrc(''), [])

  return (
    <ConfirmModal
      isLoading={status === 'adding item' || status === 'updating'}
      primaryButtonName="Save"
      primaryButtonIsDisabled={!!error}
      onPrimaryButtonClick={handleModalSubmit}
      onClose={handleEditModalClose}
      {...restProps}
    >
      <Stack>
        <TextField
          autoFocus
          label="Pack Name"
          variant="standard"
          value={packName}
          error={!!error}
          helperText={error || ' '}
          onChange={handlePackTitleChange}
          onKeyDown={handleKeyDown}
          sx={{ mb: '10px' }}
        />
        <ModalMediaLoader
          buttonName="Add cover"
          imageSrc={imageSrc}
          onUploadImage={handleImageUpload}
          onRemoveImage={handleImageRemove}
          sx={modalMediaSxProps}
        />
        <FormControlLabel
          control={<Checkbox checked={isPrivate} onChange={handleIsPrivateChange} />}
          label="Private"
          sx={{ width: 'fit-content' }}
        />
      </Stack>
    </ConfirmModal>
  )
})
