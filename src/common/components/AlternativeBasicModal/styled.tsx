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

export const ModalContent = styled('div', { name: 'ModalContent' })(({ theme: { spacing } }) => ({
  padding: `${spacing(4)} ${spacing(3)} ${spacing(6)}`,
}))

export const ModalControls = styled('div', { name: 'ModalControls' })({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '30px',
  '& .MuiButtonBase-root': {
    minWidth: 112,
  },
})

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

export const ModalLabel = styled('span')(({ theme }) => ({
  display: 'block',
  margin: theme.spacing(0, 0, 1.5, 0),
  fontFamily: 'Montserrat, sans-serif',
  color: theme.palette.text.secondary,
}))

//TODO: think about 'styled' file with components instead of separate files just
//  to store styled divs.
