import React, { FC, memo } from 'react'

import { Collapse, SxProps, Theme } from '@mui/material'
import Box from '@mui/material/Box'

import { AddItemButton, AddItemButtonProps } from '../AddItemButton/AddItemButton'

import { ModalMediaPreview } from './styled'

type ModalMediaLoaderProps = {
  buttonName: string
  imageSrc: string
  error?: boolean
  hideCloseButton?: boolean
  onUploadImage: (file64: string) => void
  onRemoveImage: () => void
  sx?: SxProps<Theme>
}

export const ModalMediaLoader: FC<ModalMediaLoaderProps> = memo(props => {
  const {
    buttonName,
    imageSrc,
    error,
    hideCloseButton = false,
    onUploadImage,
    onRemoveImage,
    sx,
  } = props

  const behaviorProps: Pick<AddItemButtonProps, 'collapsible' | 'initIsCollapsed'> = {
    collapsible: !hideCloseButton,
    initIsCollapsed: hideCloseButton || !imageSrc,
  }

  return (
    <Box sx={sx}>
      <AddItemButton
        error={error}
        title={buttonName}
        {...behaviorProps}
        onImageUpload={onUploadImage}
        onImageRemove={onRemoveImage}
      />
      <Collapse in={!!imageSrc}>
        <ModalMediaPreview image={imageSrc} sx={{ mt: 2 }} />
      </Collapse>
    </Box>
  )
})

// TODO: Maybe add TransitionGroup component to unmount Collapse with ModalMedia.
//  Now it keeps rendering after collapsing.
