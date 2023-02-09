import React, { FC, memo } from 'react'

import { Typography } from '@mui/material'

import {
  AlternativeBasicModal,
  AlternativeBasicModalProps,
} from '../../../common/components/AlternativeBasicModal/AlternativeBasicModal'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { selectCardPack } from '../cards-pack-selectors'
import { deleteCardPackTC } from '../cards-pack-slice'

type AlternativeDeletePackModalProps = Pick<
  AlternativeBasicModalProps,
  'title' | 'isOpen' | 'onClose'
> & { packId: string }

export const AlternativeDeletePackModal: FC<AlternativeDeletePackModalProps> = memo(props => {
  const { packId, ...restProps } = props
  const pack = useAppSelector(state => selectCardPack(state, packId))

  const dispatch = useAppDispatch()
  const handleDelete = () => {
    dispatch(deleteCardPackTC(packId))
    props.onClose()
  }

  return (
    <AlternativeBasicModal
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
    </AlternativeBasicModal>
  )
})
