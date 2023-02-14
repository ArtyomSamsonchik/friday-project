import React, { FC, ReactNode } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useNavigate, useParams } from 'react-router-dom'

import { PATH, URL_PARAMS } from '../../app/path'
import { selectCardsTotalCount } from '../../features/cards/cards-selectors'
import { fetchCardsTC } from '../../features/cards/cards-slice'
import { AddPackData } from '../../features/cardsPack/card-packs-api'
import { useAppDispatch } from '../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../utils/hooks/useAppSelector'

import { AddPackModal } from './Modals/AddPackModal/AddPackModal'

type CustomToolbarProps = {
  title: string
  actionButtonName: string
  onActionButtonClick: (data: AddPackData) => void
  children?: ReactNode
}

export const CustomToolbar: FC<CustomToolbarProps> = props => {
  const { title, onActionButtonClick, children } = props
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { packId } = useParams<typeof URL_PARAMS.PACK_ID>()
  const cardsTotalCount = useAppSelector(selectCardsTotalCount)

  const startLearn = () => {
    if (packId) {
      dispatch(fetchCardsTC({ cardsPack_id: packId, pageCount: cardsTotalCount }))
      navigate(`/${PATH.CARDS}/${packId}/${PATH.LEARN}`)
    }
  }

  return (
    <Box mb={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4.5}>
        <Typography component="h6" sx={{ fontSize: 22, lineHeight: 1.25, fontWeight: 600 }}>
          {title}
        </Typography>
        <button onClick={startLearn}>learn</button>
        <AddPackModal handleLoadPacksClick={onActionButtonClick} />
      </Box>
      <Box display="flex" alignItems="center" flexWrap="wrap" gap="20px">
        {children}
      </Box>
    </Box>
  )
}

// TODO: add label wrapper to children.
