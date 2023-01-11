import React, { FC } from 'react'

import { PhotoCameraOutlined } from '@mui/icons-material'
import { IconButton, IconButtonProps } from '@mui/material'

export const PhotoIconButton: FC<IconButtonProps> = props => {
  return (
    <IconButton
      size="medium"
      disableRipple
      sx={{
        position: 'absolute',
        right: 0,
        bottom: 0,
        zIndex: 1,
        border: ({ palette }) => `2px solid ${palette.common.white}`,
        backgroundColor: ({ palette }) => palette.grey['600'],
        color: ({ palette }) => palette.common.white,
        '&: hover': {
          backgroundColor: ({ palette }) => palette.grey['500'],
        },
      }}
      {...props}
    >
      <PhotoCameraOutlined sx={{ fontSize: 20 }} />
    </IconButton>
  )
}
