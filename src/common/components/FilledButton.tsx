import React, { FC } from 'react'

import { ButtonProps } from '@mui/material'
import Button from '@mui/material/Button'

export const FilledButton: FC<ButtonProps> = ({ sx, ...props }) => (
  <Button
    variant="contained"
    sx={{
      p: ({ spacing }) => `${spacing(1)} ${spacing(3.5)}`,
      color: '#fff',
      textTransform: 'initial',
      backgroundColor: '#366EFF',
      borderRadius: '30px',
      fontSize: 16,
      lineHeight: 1.25,
      '&:hover': {
        backgroundColor: '#3564DA',
      },
      ...sx,
    }}
    {...props}
  />
)
