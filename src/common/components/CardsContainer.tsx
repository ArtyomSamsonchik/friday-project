import React from 'react'

import { styled } from '@mui/material'

export const CardsContainer = styled('div', { name: 'CardsContainer' })(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: `${theme.spacing(3)}`,
  justifyItems: 'center',
}))
