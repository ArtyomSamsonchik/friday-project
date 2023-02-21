import React, { FC, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import PanoramaOutlinedIcon from '@mui/icons-material/PanoramaOutlined'
import { Collapse, SxProps, Theme } from '@mui/material'
import Button from '@mui/material/Button'

import { UploadImageInput } from '../UploadImageInput/UploadImageInput'

import { ModalButtonGroup } from './styled'

type ModalAddImageButtonProps = {
  title: string
  sx?: SxProps<Theme>
  disabled?: boolean
  onImageUpload: (file64: string) => void
  onImageRemove: () => void
}

export const ModalAddImageButton: FC<ModalAddImageButtonProps> = props => {
  const { title, onImageUpload, onImageRemove, ...restProps } = props

  const [isCollapsed, setIsCollapsed] = useState(true)

  const handleCloseButtonClick = () => {
    onImageRemove()
    setIsCollapsed(true)
  }

  const handleImageUpload = (file64: string) => {
    onImageUpload(file64)
    setIsCollapsed(false)
  }

  return (
    <>
      <ModalButtonGroup {...restProps} disableRipple>
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
