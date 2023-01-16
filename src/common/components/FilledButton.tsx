import React, { FC } from 'react'

import { ButtonProps } from '@mui/material'
import Button from '@mui/material/Button'

export const FilledButton: FC<ButtonProps> = props => (
  <Button
    variant="contained"
    sx={{
      color: '#fff',
      textTransform: 'initial',
      backgroundColor: '#366EFF',
      borderRadius: '30px',
    }}
    {...props}
  />
)
