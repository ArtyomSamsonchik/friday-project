import React, { FC, useCallback } from 'react'

import { capitalize, SxProps } from '@mui/material'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'
import { useField } from 'formik'

import { ModalMediaLoader } from '../../../../common/components/ConfirmModal/ModalMediaLoader'

import { CardModalFormValues, Tabs } from './EditorAddCardModal'

const modalMediaSxProps: SxProps = {
  mb: 1,
  '& .MuiButton-root:not(:last-child)': {
    minWidth: 210,
  },
}

type SwitchableModalInputProps = {
  tab: Tabs
  label: string
  field: keyof Omit<CardModalFormValues, 'tab'>
  autoFocus?: boolean
}

export const SwitchableModalInput: FC<SwitchableModalInputProps> = props => {
  const { tab, field, label, autoFocus } = props

  const [_, meta, helpers] = useField<string>(field)

  const { value, error } = meta
  const { setValue, setError } = helpers

  const handleFieldChange = useCallback((value: string) => {
    setValue(value)
    setError(undefined)
  }, [])

  const handleImageRemove = useCallback(() => {
    setValue('')
  }, [])

  return tab === Tabs.Text ? (
    <TextField
      label={capitalize(label)}
      autoFocus={autoFocus}
      fullWidth
      variant="standard"
      value={value}
      error={!!error}
      helperText={error || ' '}
      onChange={e => handleFieldChange(e.currentTarget.value)}
    />
  ) : (
    <>
      <ModalMediaLoader
        buttonName={`Add ${label} image`}
        imageSrc={value}
        error={!!error}
        hideCloseButton
        onUploadImage={handleFieldChange}
        onRemoveImage={handleImageRemove}
        sx={modalMediaSxProps}
      />
      <FormHelperText error sx={{ '&:not(:last-of-type)': { mb: 2 } }}>
        {error || ' '}
      </FormHelperText>
    </>
  )
}
