import React from 'react'

import { styled } from '@mui/material'

export const ModalHeader = styled('div', { name: 'ModalHeader' })(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `${theme.spacing(1.25)} ${theme.spacing(3)}`,
  borderBottom: ' 1px solid #d9d9d9ff',
  '& .MuiTypography-root': {
    fontFamily: 'Montserrat',
    fontSize: '18px',
    fontWeight: 500,
  },
  '& .MuiIconButton-root': {
    position: 'relative',
    right: `-${theme.spacing(1)}`,
  },
}))
