import { styled } from '@mui/material'

export const ModalContent = styled('div', { name: 'ModalContent' })(({ theme: { spacing } }) => ({
  padding: `${spacing(4)} ${spacing(3)} ${spacing(6)}`,
}))
