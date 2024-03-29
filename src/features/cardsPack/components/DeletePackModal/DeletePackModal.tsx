import React, { FC, memo } from 'react'

import { Typography } from '@mui/material'

import {
  DeleteModal,
  DeleteModalProps,
} from '../../../../common/components/Modals/DeleteModal/DeleteModal'
import { useAppDispatch } from '../../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../../utils/hooks/useAppSelector'
import { selectCardPack, selectPacksStatus } from '../../cards-pack-selectors'
import { deleteCardPackTC } from '../../cards-pack-slice'

type DeletePackModalProps = Pick<DeleteModalProps, 'title' | 'isOpen' | 'onClose'> & {
  packId: string
}

export const DeletePackModal: FC<DeletePackModalProps> = memo(props => {
  const { packId, ...restProps } = props

  const pack = useAppSelector(state => selectCardPack(state, packId))
  const status = useAppSelector(selectPacksStatus)
  const dispatch = useAppDispatch()

  const handleDelete = async () => {
    await dispatch(deleteCardPackTC(packId))
    props.onClose()
  }

  return (
    <DeleteModal onDelete={handleDelete} isLoading={status === 'deleting'} {...restProps}>
      <Typography sx={{ fontFamily: 'Montserrat', '& b': { fontWeight: 600 } }}>
        Do you really want to remove <b>{pack?.name || 'this pack'}</b> ?
        <br />
        All cards will be deleted.
      </Typography>
    </DeleteModal>
  )
})

// TODO: think about onKeyDown handle on div. Maybe change modal props to remove div.
