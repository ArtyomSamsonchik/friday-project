import * as React from 'react'
import { memo, useEffect, useState } from 'react'

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'

import { SortPacksParams } from '../../../features/cardsPack/card-packs-api'
import { setPacksSortOrder } from '../../../features/cardsPack/cards-pack-slice'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'

const options: SortPacksParams['column'][] = ['name', 'cardsCount', 'created', 'updated']

type PropsType = {
  disabled?: boolean
  sortPackOrder: string
}

export const SortPackButton = memo(({ sortPackOrder, disabled }: PropsType) => {
  const [open, setOpen] = React.useState(false)
  const [asc, setAsc] = useState(sortPackOrder.includes('1'))
  const anchorRef = React.useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  const column = sortPackOrder.slice(1) as SortPacksParams['column']
  const selectedColumnIndex = options.indexOf(column)

  useEffect(() => {
    dispatch(setPacksSortOrder({ column, order: asc ? 'asc' : 'desc' }))
  }, [asc])

  const handleAscToggleClick = () => setAsc(!asc)

  const handleMenuItemClick = (index: number) => {
    setOpen(false)
    const newColumn = options[index]

    dispatch(setPacksSortOrder({ column: newColumn, order: asc ? 'asc' : 'desc' }))
  }

  const handleToggle = () => setOpen(prevOpen => !prevOpen)

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        disabled={disabled}
        aria-label="split button"
      >
        <Button onClick={handleAscToggleClick}>
          {column} {asc ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
        </Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge field"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedColumnIndex}
                      onClick={() => handleMenuItemClick(index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  )
})
