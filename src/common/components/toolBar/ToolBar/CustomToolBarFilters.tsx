import React, { ReactNode, useState } from 'react'

import FilterListIcon from '@mui/icons-material/FilterList'
import { Popover } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

type CustomToolBarPropsType = {
  children: ReactNode
}
export const CustomToolBarFilters = ({ children }: CustomToolBarPropsType) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div>
      <Button aria-describedby={id} variant="outlined" onClick={handleClick}>
        <FilterListIcon />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box
          sx={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            minHeight: '200px',
          }}
        >
          {children}
        </Box>
      </Popover>
    </div>
  )
}
