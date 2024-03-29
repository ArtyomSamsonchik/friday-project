import React, { FC, useState, KeyboardEvent } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import PanoramaOutlinedIcon from '@mui/icons-material/PanoramaOutlined'
import { SxProps, Theme } from '@mui/material'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'

import { UploadImageInput } from '../UploadImageInput/UploadImageInput'

import { AddItemButtonGroup } from './styled'

export type AddItemButtonProps = {
  title: string
  error?: boolean
  collapsible?: boolean
  initIsCollapsed?: boolean
  onImageUpload: (file64: string) => void
  onImageRemove: () => void
  sx?: SxProps<Theme>
}

export const AddItemButton: FC<AddItemButtonProps> = props => {
  const {
    title,
    error,
    initIsCollapsed = true,
    collapsible = true,
    onImageUpload,
    onImageRemove,
    ...restProps
  } = props

  const [isCollapsed, setIsCollapsed] = useState(initIsCollapsed)

  const handleCloseButtonClick = () => {
    onImageRemove()
    if (collapsible) setIsCollapsed(true)
  }

  const handleImageUpload = (file64: string) => {
    onImageUpload(file64)
    if (collapsible) setIsCollapsed(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLLabelElement>) => {
    if (e.key === 'Enter') e.currentTarget.click()
  }

  return (
    <>
      <AddItemButtonGroup {...restProps} color={error ? 'error' : undefined} disableRipple>
        <Button component="label" endIcon={<PanoramaOutlinedIcon />} onKeyDown={handleKeyDown}>
          <UploadImageInput onImageUpload={handleImageUpload} />
          {title}
        </Button>

        <Collapse in={!isCollapsed} orientation="horizontal">
          <Button onClick={handleCloseButtonClick}>
            <CloseIcon />
          </Button>
        </Collapse>
      </AddItemButtonGroup>
    </>
  )
}

// TODO: should I add React.memo to this component?
// TODO: Add a focus effect to the buttons if the ripple effect is disabled
