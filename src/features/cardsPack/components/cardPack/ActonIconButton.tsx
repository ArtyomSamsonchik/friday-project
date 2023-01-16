import React, { FC } from 'react'

import { IconButton, IconButtonProps } from '@mui/material'

type ActonIconButtonProps = IconButtonProps & { isHidden?: boolean }
export const ActonIconButton: FC<ActonIconButtonProps> = ({ isHidden, ...props }) => {
  return isHidden ? null : <IconButton {...props} />
}
