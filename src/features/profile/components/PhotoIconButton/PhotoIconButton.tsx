import React, { FC } from 'react'

import { PhotoCameraOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'

import { UploadImageInput } from '../../../../common/components/UploadImageInput/UploadImageInput'

type PhotoIconButtonProps = {
  disabled?: boolean
  onFileUpload: (file64: string) => void
}

export const PhotoIconButton: FC<PhotoIconButtonProps> = ({ onFileUpload, disabled }) => {
  return (
    <Box position="absolute" right={0} bottom={0} component={'label'} title="Upload an image">
      <UploadImageInput disabled={disabled} onImageUpload={onFileUpload} />
      <IconButton
        size="medium"
        disableRipple
        disabled={disabled}
        component="span"
        sx={({ palette }) => ({
          border: `2px solid ${palette.common.white}`,
          backgroundColor: palette.grey['700'],
          color: palette.common.white,
          '&: hover': {
            backgroundColor: palette.grey['500'],
          },
          '&.Mui-disabled': {
            backgroundColor: palette.grey['300'],
            opacity: 0.9,
          },
        })}
      >
        <PhotoCameraOutlined sx={{ fontSize: 20 }} />
      </IconButton>
    </Box>
  )
}
