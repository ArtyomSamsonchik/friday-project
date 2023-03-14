import React, { FC, MouseEventHandler, PropsWithChildren } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

import { CustomPaper } from '../CustomPaper'
import { FilledButton } from '../FilledButton'
import { OutlinedButton } from '../OutlinedButton'

import {
  ModalContainer,
  ModalControls,
  ModalHeader,
  ModalInner,
  ScrollableModalContent,
} from './styled'

const modalBoxShadow =
  'rgba(0, 0, 0, 0.2) 0px 0px 15px -7px, ' +
  'rgba(0, 0, 0, 0.14) 0px 0px 38px 3px, ' +
  'rgba(0, 0, 0, 0.12) 0px 0px 46px 8px'

export type ConfirmModalProps = PropsWithChildren<{
  isOpen: boolean
  title: string
  primaryButtonName: string
  primaryButtonHighSeverity?: boolean
  primaryButtonIsDisabled?: boolean
  onPrimaryButtonClick: MouseEventHandler<HTMLButtonElement>
  onClose: () => void
}>

export const ConfirmModal: FC<ConfirmModalProps> = props => {
  const {
    isOpen,
    title,
    children,
    primaryButtonName,
    primaryButtonHighSeverity,
    primaryButtonIsDisabled,
    onPrimaryButtonClick,
    onClose,
  } = props

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalContainer>
        <CustomPaper sx={{ boxShadow: modalBoxShadow }}>
          <ModalHeader>
            <Typography>{title}</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </ModalHeader>
          <Divider />

          <ModalInner>
            <ScrollableModalContent sx={{ mb: '30px' }}>{children}</ScrollableModalContent>
            <ModalControls>
              <OutlinedButton onClick={onClose}>Cancel</OutlinedButton>
              <FilledButton
                red={primaryButtonHighSeverity}
                disabled={primaryButtonIsDisabled}
                onClick={onPrimaryButtonClick}
              >
                {primaryButtonName}
              </FilledButton>
            </ModalControls>
          </ModalInner>
        </CustomPaper>
      </ModalContainer>
    </Modal>
  )
}
