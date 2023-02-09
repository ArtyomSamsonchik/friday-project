import React from 'react'

import { ButtonProps, styled } from '@mui/material'
import Button from '@mui/material/Button'

export const FilledButton = styled(
  (props: ButtonProps) => <Button variant="contained" {...props} />,
  {
    name: 'FilledButton',
    shouldForwardProp: prop => prop !== 'red',
  }
)<{ red?: boolean }>(({ theme, red }) => ({
  padding: `${theme.spacing(1)} ${theme.spacing(3.5)}`,
  color: theme.palette.common.white,
  textTransform: 'initial',
  backgroundColor: red ? '#ec3333' : '#366EFF',
  borderRadius: '30px',
  fontSize: 16,
  lineHeight: 1.25,
  '&:hover': {
    backgroundColor: red ? '#d21515' : '#3564DA',
  },
}))
