import React, { FC, useState } from 'react'

import { Typography } from '@mui/material'

import {
  DeleteModal,
  DeleteModalProps,
} from '../../../../common/components/modals/DeleteModal/DeleteModal'
import { useAppDispatch } from '../../../../utils/hooks/useAppDispatch'
import { deleteCardTC } from '../../cards-slice'

type DeleteCardModalProps = Pick<DeleteModalProps, 'title' | 'isOpen' | 'onClose'> & {
  packId: string
  cardId: string
}
export const DeleteCardModal: FC<DeleteCardModalProps> = props => {
  const { packId, cardId, ...restProps } = props

  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useAppDispatch()

  const handleDelete = async () => {
    setIsSubmitting(true)
    await dispatch(deleteCardTC(packId, cardId))
    setIsSubmitting(false)
    props.onClose()
  }

  return (
    <DeleteModal onDelete={handleDelete} isLoading={isSubmitting} {...restProps}>
      <Typography sx={{ fontFamily: 'Montserrat', '& b': { fontWeight: 600 } }}>
        Do you really want to remove <b>this card</b> ?
      </Typography>
    </DeleteModal>
  )
}
