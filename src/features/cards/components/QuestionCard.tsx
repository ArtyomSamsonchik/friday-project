import React, { FC, memo } from 'react'

import { Rating, Typography } from '@mui/material'
import CardContent from '@mui/material/CardContent'

import { ReactComponent as DeleteSVG } from '../../../common/assets/icons/delete.svg'
import { ReactComponent as EditSVG } from '../../../common/assets/icons/edit.svg'
import { CustomCard } from '../../../common/components/CustomCard'
import { ModalMediaPreview } from '../../../common/components/modals/ConfirmModal/styled'
import { coerceImage64 } from '../../../utils/helpers/coerceImage64'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { ActionButtonsContainer } from '../../cardsPack/components/cardPack/ActionButtonsContainer'
import { ActonIconButton } from '../../cardsPack/components/cardPack/ActonIconButton'
import { selectProfile } from '../../profile/profile-slice'
import { Card } from '../cards-api'
import { selectCard, selectCardsUserId } from '../cards-selectors'

type QuestionCardProps = {
  cardId: string
  onEditCard: (cardId: string) => void
  onDeleteCard: (cardId: string) => void
}

export const QuestionCard: FC<QuestionCardProps> = memo(props => {
  const { cardId, onEditCard, onDeleteCard } = props

  const card = useAppSelector(state => selectCard(state, cardId)) as Card
  const cardUserId = useAppSelector(selectCardsUserId)
  const profile = useAppSelector(selectProfile)

  const questionImage = coerceImage64(card.questionImg)
  const answerImage = coerceImage64(card.answerImg)
  const isAnyImage = questionImage || answerImage
  const isMyCard = profile._id === cardUserId

  return (
    <CustomCard sx={{ minHeight: '200px', alignSelf: 'start' }}>
      <ActionButtonsContainer
        sx={{ position: 'absolute', top: '12px', right: '12px', flexDirection: 'row' }}
      >
        <ActonIconButton
          isHidden={!isMyCard}
          onClick={() => onEditCard(card._id)}
          title="edit card"
        >
          <EditSVG />
        </ActonIconButton>
        <ActonIconButton
          isHidden={!isMyCard}
          onClick={() => onDeleteCard(card._id)}
          title="delete card"
        >
          <DeleteSVG />
        </ActonIconButton>
      </ActionButtonsContainer>

      <CardContent sx={{ pt: 2.5, wordWrap: 'break-word' }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Question:
        </Typography>
        {isAnyImage ? (
          <ModalMediaPreview image={questionImage} />
        ) : (
          <Typography sx={{ mb: 1 }}>{card.question}</Typography>
        )}
        <Typography variant="h6" sx={{ mb: 1 }}>
          Answer:
        </Typography>
        {isAnyImage ? (
          <ModalMediaPreview image={answerImage} />
        ) : (
          <Typography sx={{ mb: 1 }}>{card.answer}</Typography>
        )}
        <Typography sx={{ mb: 1 }}>Last updated: {card.updated}</Typography>
        <Rating value={card.rating} precision={0.5} readOnly />
      </CardContent>
    </CustomCard>
  )
})

// TODO: remove align-self CSS-property later
