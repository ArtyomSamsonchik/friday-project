import React, { FC, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import PanoramaOutlinedIcon from '@mui/icons-material/PanoramaOutlined'
import { SxProps, Theme } from '@mui/material'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'

import { UploadImageInput } from '../UploadImageInput/UploadImageInput'

import { ModalButtonGroup } from './styled'

export type AddImageButtonProps = {
  title: string
  error?: boolean
  collapsible?: boolean
  initIsCollapsed?: boolean
  onImageUpload: (file64: string) => void
  onImageRemove: () => void
  sx?: SxProps<Theme>
}

export const AddImageButton: FC<AddImageButtonProps> = props => {
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

  return (
    <>
      <ModalButtonGroup {...restProps} color={error ? 'error' : undefined} disableRipple>
        <Button component="label" endIcon={<PanoramaOutlinedIcon />}>
          <UploadImageInput onImageUpload={handleImageUpload} />
          {title}
        </Button>

        <Collapse in={!isCollapsed} orientation="horizontal">
          <Button onClick={handleCloseButtonClick}>
            <CloseIcon />
          </Button>
        </Collapse>
      </ModalButtonGroup>
    </>
  )
}

// TODO: should I add React.memo to this component?
// TODO: Add a focus effect to the buttons if the ripple effect is disabled
