import React, { FC } from 'react'

import { Button, ButtonProps, InputAdornment } from '@mui/material'

export const EditableSpanSaveButton: FC<ButtonProps> = props => {
  return (
    <InputAdornment position="end">
      <Button variant="contained" sx={{ width: 52, height: 24, fontSize: 12 }} {...props}>
        save
      </Button>
    </InputAdornment>
  )
}
