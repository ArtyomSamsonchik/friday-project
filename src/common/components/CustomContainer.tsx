import { styled } from '@mui/material'

export const CustomContainer = styled('div', { name: 'CustomContainer' })(({ theme }) => ({
  margin: '0 auto',
  padding: theme.spacing(4, 2, 0),
  marginTop: theme.spacing(7),
  maxWidth: 1280,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5.5, 3, 0),
    marginTop: theme.spacing(8),
  },
}))
