import React from 'react'

import { styled } from '@mui/material'

export const CustomPaper = styled('div', { name: 'CustomPaper' })(({ theme }) => ({
  borderRadius: 2,
  boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.1)',
  backgroundColor: theme.palette.background.paper,
}))
