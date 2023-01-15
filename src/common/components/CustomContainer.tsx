import { styled } from '@mui/material'

export const CustomContainer = styled('div', { name: 'CustomContainer' })(({ theme }) => ({
  margin: '0 auto',
  padding: `0 ${theme.spacing(3)}`,
  maxWidth: 1280,
  width: '100%',
}))
