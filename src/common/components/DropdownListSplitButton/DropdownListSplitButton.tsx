import * as React from 'react'
import { FC, KeyboardEvent, MouseEventHandler, PropsWithChildren } from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { SxProps, Theme } from '@mui/material'
import Button from '@mui/material/Button'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'

import { DropdownButtonGroup } from './styled'

type DropdownListSplitButtonProps = PropsWithChildren<{
  disabled?: boolean
  options: string[]
  selectedIndex?: number
  closeMenuOnSelect?: boolean
  onActionButtonClick: MouseEventHandler
  onMenuItemClick: (index: number) => void
  buttonGroupSxProp?: SxProps<Theme>
}>

export const DropdownListSplitButton: FC<DropdownListSplitButtonProps> = props => {
  const {
    options,
    selectedIndex,
    disabled,
    closeMenuOnSelect = true,
    onActionButtonClick,
    onMenuItemClick,
    children,
    buttonGroupSxProp,
  } = props

  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLDivElement>(null)

  const handleMenuItemClick = (index: number) => {
    if (closeMenuOnSelect) setOpen(false)
    onMenuItemClick(index)
  }

  const toggleDropdownMenu = () => setOpen(prevOpen => !prevOpen)

  const handleClose = (event: Event) => {
    if (anchorRef.current?.contains(event.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false)
      e.stopPropagation()
    }
  }

  return (
    <>
      <DropdownButtonGroup
        variant="contained"
        ref={anchorRef}
        disabled={disabled}
        sx={buttonGroupSxProp}
      >
        <Button onClick={onActionButtonClick}>{children}</Button>
        <Button size="small" onClick={toggleDropdownMenu}>
          <ArrowDropDownIcon />
        </Button>
      </DropdownButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
        onKeyDown={handleKeyDown}
        popperOptions={{ placement: 'right-start' }}
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
                <MenuList autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
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
    </>
  )
}
