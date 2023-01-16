import { styled } from '@mui/material'

export const CustomContainer = styled('div', { name: 'CustomContainer' })(({ theme }) => ({
  margin: '0 auto',
  padding: `0 ${theme.spacing(2)}`,
  marginTop: theme.spacing(7),
  maxWidth: 1280,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    padding: `0 ${theme.spacing(3)}`,
    marginTop: theme.spacing(8),
  },
}))
