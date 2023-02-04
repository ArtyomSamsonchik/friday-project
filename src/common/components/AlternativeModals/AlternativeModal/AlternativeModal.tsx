import React, { FC, MouseEvent, ReactNode } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MUIModal, { ModalProps } from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

import { CustomPaper } from '../../CustomPaper'
import { OutlinedButton } from '../../OutlinedButton'

import { ModalContainer } from './components/ModalContainer'
import { ModalContent } from './components/ModalContent'
import { ModalControls } from './components/ModalControls'
import { ModalHeader } from './components/ModalHeader'

const modalBoxShadow =
  'rgba(0, 0, 0, 0.2) 0px 0px 15px -7px, ' +
  'rgba(0, 0, 0, 0.14) 0px 0px 38px 3px, ' +
  'rgba(0, 0, 0, 0.12) 0px 0px 46px 8px'

export type AlternativeModalProps = Omit<ModalProps, 'children'> & {
  title: string
  actionButton: JSX.Element
  children?: ReactNode
  onClose?: (event: {}, reason: 'closeButtonClick') => void
}

export const AlternativeModal: FC<AlternativeModalProps> = props => {
  const { title, children, actionButton, ...restProps } = props

  const handleCloseButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    props.onClose?.(e, 'closeButtonClick')
  }

  return (
    <MUIModal {...restProps}>
      <ModalContainer>
        <CustomPaper sx={{ boxShadow: modalBoxShadow }}>
          <ModalHeader>
            <Typography>{title}</Typography>
            <IconButton onClick={e => handleCloseButtonClick(e)}>
              <CloseIcon />
            </IconButton>
          </ModalHeader>
          <Divider />
          <ModalContent>
            {children}
            <ModalControls>
              <OutlinedButton onClick={e => handleCloseButtonClick(e)}>Cancel</OutlinedButton>
              {actionButton}
            </ModalControls>
          </ModalContent>
        </CustomPaper>
      </ModalContainer>
    </MUIModal>
  )
}
