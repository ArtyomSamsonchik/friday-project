import React, { FC, ReactNode } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { AddPackData } from '../../features/cardsPack/card-packs-api'

import { AddPackModal } from './Modals/AddPackModal/AddPackModal'

type CustomToolbarProps = {
  title: string
  actionButtonName: string
  onActionButtonClick: (data: AddPackData) => void
  children?: ReactNode
}

export const CustomToolbar: FC<CustomToolbarProps> = props => {
  const { title, actionButtonName, onActionButtonClick, children } = props

  return (
    <Box mb={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4.5}>
        <Typography component="h6" sx={{ fontSize: 22, lineHeight: 1.25, fontWeight: 600 }}>
          {title}
        </Typography>
        <AddPackModal handleLoadPacksClick={onActionButtonClick} />
      </Box>
      <Box display="flex" alignItems="center" flexWrap="wrap" gap="20px">
        {children}
      </Box>
    </Box>
  )
}

// TODO: add label wrapper to children.
