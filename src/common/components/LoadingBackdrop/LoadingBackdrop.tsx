import React, { FC } from 'react'

import Backdrop, { BackdropProps } from '@mui/material/Backdrop'
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress'

type LoadingBackdropProps = BackdropProps & {
  progressProps?: CircularProgressProps
}

export const LoadingBackdrop: FC<LoadingBackdropProps> = props => {
  const { progressProps, ...restProps } = props

  return (
    <Backdrop sx={{ position: 'absolute', backgroundColor: '#ffffff99', zIndex: 1 }} {...restProps}>
      <CircularProgress sx={{ color: '#366EFF' }} {...progressProps} />
    </Backdrop>
  )
}

//TODO: add backdrop background color to theme object
