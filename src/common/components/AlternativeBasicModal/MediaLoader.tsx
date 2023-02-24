import React, { FC, memo } from 'react'

import { Collapse, SxProps, Theme } from '@mui/material'
import Box from '@mui/material/Box'

import { AddImageButton } from './AddImageButton'
import { ModalMediaPreview } from './styled'

type ModalMediaLoaderProps = {
  buttonName: string
  imageSrc: string
  onUploadImage: (file64: string) => void
  onRemoveImage: () => void
  sx?: SxProps<Theme>
}

export const MediaLoader: FC<ModalMediaLoaderProps> = memo(props => {
  const { buttonName, imageSrc, onUploadImage, onRemoveImage, sx } = props

  return (
    <Box sx={sx}>
      <AddImageButton
        title={buttonName}
        initIsCollapsed={!imageSrc}
        onImageUpload={onUploadImage}
        onImageRemove={onRemoveImage}
      />
      <Collapse in={Boolean(imageSrc)}>
        <ModalMediaPreview image={imageSrc} sx={{ mt: 2 }} />
      </Collapse>
    </Box>
  )
})

// TODO: Maybe add TransitionGroup component to unmount Collapse with ModalMedia.
//  Now it keeps rendering after collapsing.
