import React, { FC } from 'react'

import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress'

import { selectAppStatus } from '../../app/app-slice'
import { useAppSelector } from '../../utils/hooks/useAppSelector'

export const ProgressBar: FC<LinearProgressProps> = props => {
  const appStatus = useAppSelector(selectAppStatus)

  return appStatus === 'loading' ? (
    <LinearProgress
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 6,
        backgroundColor: 'inherit',
      }}
      {...props}
    />
  ) : null
}
