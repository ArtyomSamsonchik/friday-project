import { styled } from '@mui/material'
import ButtonGroup from '@mui/material/ButtonGroup'

export const DropdownButtonGroup = styled(ButtonGroup)({
  borderRadius: '2px',
  '& .MuiButton-root': {
    borderRadius: '2px',
    '&:first-child': {
      textTransform: 'capitalize',
      fontFamily: 'Montserrat',
    },
  },
})
