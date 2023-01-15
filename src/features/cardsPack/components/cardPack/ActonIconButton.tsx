import React, { FC } from 'react'

import { IconButton, IconButtonProps } from '@mui/material'
export const ActonIconButton: FC<IconButtonProps> = ({ onClick, ...props }) => {
  return onClick ? <IconButton onClick={onClick} {...props} /> : null
}
