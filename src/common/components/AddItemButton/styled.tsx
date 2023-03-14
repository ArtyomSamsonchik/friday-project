import { styled } from '@mui/material'
import ButtonGroup from '@mui/material/ButtonGroup'

export const AddItemButtonGroup = styled(ButtonGroup)(({ theme: { palette }, color }) => ({
  borderRadius: 2,
  border: `1px solid ${color === 'error' ? palette.error.light : palette.primary.main}`,
  width: 'fit-content',
  '& .MuiButton-root': {
    border: 'none',
    borderRadius: 2,
    textTransform: 'none',
    fontFamily: 'Montserrat',
  },
  '& .MuiButton-root:hover': {
    border: 'none',
  },
  '& .MuiButton-root:focus-visible': {
    boxShadow: 'inset 0 0 8px 3px #4f98e0b0',
  },
  '& > .MuiCollapse-root': {
    marginLeft: -1,
    '& .MuiButton-root': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderLeft: '1px solid',
    },
  },
}))
