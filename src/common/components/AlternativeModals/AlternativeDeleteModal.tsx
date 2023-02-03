import React, { FC, MouseEvent } from 'react'

import { FilledButton } from '../FilledButton'

import { AlternativeModal, AlternativeModalProps } from './AlternativeModal/AlternativeModal'

type AlternativeDeleteModalProps = Omit<AlternativeModalProps, 'actionButton'> & {
  onDelete: () => void
}

export const AlternativeDeleteModal: FC<AlternativeDeleteModalProps> = props => {
  const { children, onDelete, ...restProps } = props

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    onDelete()
    props.onClose?.(e, 'closeButtonClick')
  }

  return (
    <AlternativeModal
      actionButton={
        <FilledButton
          sx={{
            backgroundColor: '#ec3333',
            '&:hover': {
              backgroundColor: '#d21515',
            },
          }}
          onClick={handleDelete}
        >
          Delete
        </FilledButton>
      }
      {...restProps}
    >
      {children}
      {/*<Box display="flex" justifyContent="space-between" alignItems="center" mt="30px">*/}
      {/*  <OutlinedButton onClick={e => props.onClose?.(e, 'closeButtonClick')}>*/}
      {/*    Cancel*/}
      {/*  </OutlinedButton>*/}
      {/*  <FilledButton*/}
      {/*    sx={{*/}
      {/*      backgroundColor: '#ec3333',*/}
      {/*      '&:hover': {*/}
      {/*        backgroundColor: '#d21515',*/}
      {/*      },*/}
      {/*    }}*/}
      {/*    onClick={handleDelete}*/}
      {/*  >*/}
      {/*    Delete*/}
      {/*  </FilledButton>*/}
      {/*</Box>*/}
    </AlternativeModal>
  )
}
