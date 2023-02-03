import { styled } from '@mui/material'

export const ModalControls = styled('div', { name: 'ModalControls' })({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '30px',
  '& .MuiButtonBase-root': {
    minWidth: 112,
  },
})
