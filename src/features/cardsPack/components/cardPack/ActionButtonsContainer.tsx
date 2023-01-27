import { styled } from '@mui/material'

export const ActionButtonsContainer = styled('div', { name: 'ActionButtonsContainer' })(
  ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: '20px',
    backgroundColor: 'white',
    '& .MuiButtonBase-root': {
      color: theme.palette.common.black,
    },
    boxShadow: '0px 2px 10px rgba(109, 109, 109, 0.45),inset 0px 1px 0px rgba(255, 255, 255, 0.3)',
    '& .MuiButtonBase-root.Mui-disabled': {
      color: 'rgba(0, 0, 0, 0.54)',
    },
  })
)
