import React, { FC, KeyboardEvent } from 'react'

import { ConfirmModal, ConfirmModalProps } from '../ConfirmModal/ConfirmModal'

export type DeleteModalProps = Omit<
  ConfirmModalProps,
  'primaryButtonHighSeverity' | 'primaryButtonName' | 'onPrimaryButtonClick'
> & { onDelete: () => void }

export const DeleteModal: FC<DeleteModalProps> = props => {
  const { onDelete, ...restProps } = props

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onDelete()
      e.preventDefault()
    }
  }

  return (
    <div onKeyDown={handleKeyDown}>
      <ConfirmModal
        primaryButtonName="Delete"
        primaryButtonHighSeverity
        onPrimaryButtonClick={onDelete}
        {...restProps}
      ></ConfirmModal>
    </div>
  )
}
