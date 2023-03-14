import React, { FC, memo, KeyboardEvent } from 'react'

import { Typography } from '@mui/material'

import {
  ConfirmModal,
  ConfirmModalProps,
} from '../../../../common/components/ConfirmModal/ConfirmModal'
import { useAppDispatch } from '../../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../../utils/hooks/useAppSelector'
import { selectCardPack } from '../../cards-pack-selectors'
import { deleteCardPackTC } from '../../cards-pack-slice'

type DeletePackModalProps = Pick<ConfirmModalProps, 'title' | 'isOpen' | 'onClose'> & {
  packId: string
}

export const DeletePackModal: FC<DeletePackModalProps> = memo(props => {
  const { packId, ...restProps } = props
  const pack = useAppSelector(state => selectCardPack(state, packId))

  const dispatch = useAppDispatch()
  const handleDelete = () => {
    dispatch(deleteCardPackTC(packId))
    props.onClose()
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleDelete()
      e.preventDefault()
    }
  }

  return (
    <div onKeyDown={handleKeyDown}>
      <ConfirmModal
        primaryButtonName="Delete"
        primaryButtonHighSeverity
        onPrimaryButtonClick={handleDelete}
        {...restProps}
      >
        <Typography sx={{ fontFamily: 'Montserrat', '& b': { fontWeight: 600 } }}>
          Do you really want to remove <b>{pack?.name || 'this pack'}</b> ?
          <br />
          All cards will be deleted.
        </Typography>
      </ConfirmModal>
    </div>
  )
})

//TODO: think about onKeyDown handle on div. Maybe change modal props to remove div.
