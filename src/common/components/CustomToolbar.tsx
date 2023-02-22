import React, { FC, ReactNode } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useNavigate, useParams } from 'react-router-dom'

import { PATH, URL_PARAMS } from '../../app/path'
import { selectCardsTotalCount, selectCardsUserId } from '../../features/cards/cards-selectors'
import { addCardTC } from '../../features/cards/cards-slice'
import { AddPackData } from '../../features/cardsPack/card-packs-api'
import { selectProfile } from '../../features/profile/profile-slice'
import { useAppDispatch } from '../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../utils/hooks/useAppSelector'

import { FilledButton } from './FilledButton'

type CustomToolbarProps = {
  title: string
  actionButtonName: string
  onActionButtonClick: (data: AddPackData) => void
  children?: ReactNode
}

export const CustomToolbar: FC<CustomToolbarProps> = props => {
  const { title, onActionButtonClick, children } = props
  const navigate = useNavigate()
  const { packId } = useParams<typeof URL_PARAMS.PACK_ID>()
  const cardsCount = useAppSelector(selectCardsTotalCount)
  const cardsUserId = useAppSelector(selectCardsUserId)
  const dispatch = useAppDispatch()
  const profile = useAppSelector(selectProfile)
  const startLearn = () => {
    if (packId) {
      navigate(`/${PATH.CARDS}/${packId}/${PATH.LEARN}`)
    }
  }

  console.log(cardsCount)
  const isMyPack = profile._id === cardsUserId
  const addCard = () => {
    if (packId) {
      dispatch(
        addCardTC({
          cardsPack_id: packId,
          question: 'string',
          answer: 'string',
        })
      )
    }
  }

  return (
    <Box mb={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4.5}>
        <Typography component="h6" sx={{ fontSize: 22, lineHeight: 1.25, fontWeight: 600 }}>
          {cardsCount ? title : title + ' is empty'}
        </Typography>
        {cardsCount ? <button onClick={startLearn}>learn</button> : ''}
        {isMyPack && <FilledButton onClick={addCard}>asd</FilledButton>}
      </Box>
      <Box display="flex" alignItems="center" flexWrap="wrap" gap="20px">
        {children}
      </Box>
    </Box>
  )
}

// TODO: add label wrapper to children.
