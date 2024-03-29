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

export const ModalInner = styled('div', { name: 'ModalInner' })(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(4, 0, 5),
}))

export const ModalContent = styled('div', { name: 'ModalContent' })(({ theme }) => ({
  padding: theme.spacing(0, 3),
}))

export const ScrollableModalContent = styled(ModalContent)({
  overflow: 'auto',
  scrollbarWidth: 'thin',
  minHeight: 250,
  maxHeight: '50vh',
})

export const ModalMediaPreview = styled('div', {
  name: 'ModalMedia',
})<{ image: string }>(({ image }) => ({
  height: '180px',
  backgroundImage: image.length ? `url(${image})` : 'none',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center,',
}))

export const ModalControls = styled(ModalContent)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
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

// TODO: think about 'styled' file with components instead of separate files just
//  to store styled divs.
