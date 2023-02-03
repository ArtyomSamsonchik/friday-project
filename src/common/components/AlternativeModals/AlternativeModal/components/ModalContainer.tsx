import { styled } from '@mui/material'
export const ModalContainer = styled('div', { name: 'ModalContainer' })(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  top: '50%',
  padding: `0 ${theme.spacing(2)}`,
  width: '100%',
  maxWidth: '395px',
  translate: '-50% -50%',
}))
