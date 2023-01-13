import React from 'react'

import { Button, ButtonProps, styled } from '@mui/material'

export const OutlinedButton = styled(Button)<ButtonProps>(({ theme }) => ({
  padding: '8px 20px',
  borderRadius: 30,
  backgroundColor: '#FCFCFC',
  color: 'inherit',
  fontFamily: 'Montserrat',
  fontWeight: 500,
  fontSize: '1rem',
  lineHeight: 1.2,
  textTransform: 'capitalize',
  letterSpacing: '0.01em',
  boxShadow: '0px 2px 10px rgba(109, 109, 109, 0.45), inset 0px 1px 0px rgba(255, 255, 255, 0.3)',
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
}))
