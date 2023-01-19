import React, { FC, MouseEventHandler } from 'react'

import { Rating, Typography } from '@mui/material'
import CardContent from '@mui/material/CardContent'

import { ReactComponent as DeleteSVG } from '../../../common/assets/icons/delete.svg'
import { ReactComponent as EditSVG } from '../../../common/assets/icons/edit.svg'
import { CustomCard } from '../../../common/components/CustomCard'
import { ActionButtonsContainer } from '../../cardsPack/components/cardPack/ActionButtonsContainer'
import { ActonIconButton } from '../../cardsPack/components/cardPack/ActonIconButton'

type QuestionCardProps = {
  question: string
  answer: string
  isMyCard: boolean
  lastUpdated: string
  rating: number
  editCard?: MouseEventHandler<HTMLButtonElement>
  deleteCard?: MouseEventHandler<HTMLButtonElement>
}

export const QuestionCard: FC<QuestionCardProps> = props => {
  const { question, answer, isMyCard, rating, lastUpdated, editCard, deleteCard } = props

  return (
    <CustomCard sx={{ minHeight: '200px', alignSelf: 'start' }}>
      <ActionButtonsContainer
        sx={{ position: 'absolute', top: '12px', right: '12px', flexDirection: 'row' }}
      >
        <ActonIconButton isHidden={!isMyCard} onClick={editCard} title="edit card">
          <EditSVG />
        </ActonIconButton>
        <ActonIconButton isHidden={!isMyCard} onClick={deleteCard} title="delete card">
          <DeleteSVG />
        </ActonIconButton>
      </ActionButtonsContainer>
      <CardContent sx={{ pt: 2.5 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Question:
        </Typography>
        <Typography sx={{ mb: 1 }}>{question}</Typography>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Answer:
        </Typography>
        <Typography sx={{ mb: 1 }}>{answer}</Typography>
        <Typography sx={{ mb: 1 }}>Last updated: {lastUpdated}</Typography>
        <Rating value={rating} precision={0.5} readOnly />
      </CardContent>
    </CustomCard>
  )
}

// TODO: remove align-self CSS-property later
