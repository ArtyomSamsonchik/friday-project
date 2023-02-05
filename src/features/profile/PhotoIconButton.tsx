import React, { ChangeEvent, FC } from 'react'

import { PhotoCameraOutlined } from '@mui/icons-material'
import { IconButton, IconButtonProps } from '@mui/material'
import Box from '@mui/material/Box'

type PhotoIconButtonProps = IconButtonProps & {
  onFileUpload: (e: ChangeEvent<HTMLInputElement>) => void
}

export const PhotoIconButton: FC<PhotoIconButtonProps> = ({ onFileUpload, ...props }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        right: 0,
        bottom: 0,
      }}
      component={'label'}
    >
      <input type="file" onChange={onFileUpload} hidden />
      <IconButton
        size="medium"
        disableRipple
        component="span"
        sx={{
          border: ({ palette }) => `2px solid ${palette.common.white}`,
          backgroundColor: ({ palette }) => palette.grey['700'],
          color: ({ palette }) => palette.common.white,
          '&: hover': {
            backgroundColor: ({ palette }) => palette.grey['500'],
          },
        }}
        {...props}
      >
        <PhotoCameraOutlined sx={{ fontSize: 20 }} />
      </IconButton>
    </Box>
  )
}

//TODO: fix button transparency when disabled
