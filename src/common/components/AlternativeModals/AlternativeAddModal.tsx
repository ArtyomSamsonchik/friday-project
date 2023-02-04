import React, { FC, MouseEvent } from 'react'

import { FilledButton } from '../FilledButton'

import { AlternativeModal, AlternativeModalProps } from './AlternativeModal/AlternativeModal'

export type AlternativeAddModalProps = Omit<AlternativeModalProps, 'actionButton'> & {
  onSave: () => void
}

export const AlternativeAddModal: FC<AlternativeAddModalProps> = props => {
  const { onSave, children, ...restProps } = props

  const handleSave = (e: MouseEvent<HTMLButtonElement>) => {
    onSave()
    props.onClose?.(e, 'closeButtonClick')
  }

  return (
    <AlternativeModal
      actionButton={<FilledButton onClick={handleSave}>Save</FilledButton>}
      {...restProps}
    >
      {children}
    </AlternativeModal>
  )
}
