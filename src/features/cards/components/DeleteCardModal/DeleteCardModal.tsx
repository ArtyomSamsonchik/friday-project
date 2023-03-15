import React, { FC } from 'react'

import { Typography } from '@mui/material'

import {
  DeleteModal,
  DeleteModalProps,
} from '../../../../common/components/modals/DeleteModal/DeleteModal'
import { useAppDispatch } from '../../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../../utils/hooks/useAppSelector'
import { selectCardsStatus } from '../../cards-selectors'
import { deleteCardTC } from '../../cards-slice'

type DeleteCardModalProps = Pick<DeleteModalProps, 'title' | 'isOpen' | 'onClose'> & {
  packId: string
  cardId: string
}
export const DeleteCardModal: FC<DeleteCardModalProps> = props => {
  const { packId, cardId, ...restProps } = props

  const status = useAppSelector(selectCardsStatus)
  const dispatch = useAppDispatch()

  const handleDelete = async () => {
    await dispatch(deleteCardTC(packId, cardId))
    props.onClose()
  }

  return (
    <DeleteModal onDelete={handleDelete} isLoading={status === 'deleting'} {...restProps}>
      <Typography sx={{ fontFamily: 'Montserrat', '& b': { fontWeight: 600 } }}>
        Do you really want to remove <b>this card</b> ?
      </Typography>
    </DeleteModal>
  )
}
