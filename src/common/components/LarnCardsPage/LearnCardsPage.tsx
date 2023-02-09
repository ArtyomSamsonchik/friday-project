import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom'

import { PATH, URL_PARAMS } from '../../../app/path'
import { CardsNewGradeRequestData } from '../../../features/cards/cards-api'
import { selectAllCards, selectPackName } from '../../../features/cards/cards-selectors'
import { updateCardGradeTC } from '../../../features/cards/cards-slice'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { BackLink } from '../BackLink'
import { CustomPaper } from '../CustomPaper'
import { FilledButton } from '../FilledButton'
import { RateYourSelf } from '../RateYourSelf/RateYourSelf'

/*const getCard = (cards: Card[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
  const rand = Math.random() * sum
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)

      return { sum: newSum, id: newSum < rand ? i : acc.id }
    },
    { sum: 0, id: -1 }
  )

  console.log('test: ', sum, rand, res)

  return cards[res.id + 1]
}*/

export const LearnCardsPage = () => {
  const cards = useAppSelector(selectAllCards)

  const [showAnswer, setShowAnswer] = useState(false)
  const [simpleCounter, setSimpleCounter] = useState(0)
  const packName = useAppSelector(selectPackName)
  const { packId } = useParams<typeof URL_PARAMS.PACK_ID>()

  const dispatch = useAppDispatch()
  const increaseSimpleCounter = () => {
    setSimpleCounter(simpleCounter + 1)
    setShowAnswer(false)
  }

  const getCardNewRating = (data: CardsNewGradeRequestData) => {
    dispatch(updateCardGradeTC(data))
  }

  return (
    <Box>
      <BackLink
        title="Back to Cards List"
        to={`/${PATH.CARDS}/${cards[simpleCounter].cardsPack_id}`}
      />
      <Typography
        align={'center'}
        sx={{
          fontSize: 22,
          lineHeight: 1.2,
          fontWeight: 600,
          mb: '30px',
        }}
      >
        <b>Learn: {packName}</b>
      </Typography>
      <CustomPaper
        sx={{
          maxWidth: '439px',
          minHeight: '204px',
          display: 'flex',
          padding: '30px',
          flexDirection: 'column',
          alignItems: 'center',
          height: 'maxContent',
          mx: 'auto',
          animation: ({ transitions }) => `0.4s slide-up ${transitions.easing.easeInOut}`,
        }}
      >
        <Typography align={'justify'}>
          <b>Question:</b> {cards[simpleCounter].question}
        </Typography>
        <Typography sx={{ marginTop: '30px' }} color={'grey'}>
          Количестов попыток ответа на вопрос: {cards[simpleCounter].shots}
        </Typography>

        {showAnswer && (
          <Typography align={'justify'} sx={{ marginTop: '30px' }}>
            <b>Answer: </b> {cards[simpleCounter].answer}
          </Typography>
        )}
        <Box
          sx={{
            marginTop: '30px',
            width: 'maxContent',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {showAnswer || (
            <FilledButton onClick={() => setShowAnswer(!showAnswer)}>show answer</FilledButton>
          )}
          {showAnswer && (
            <RateYourSelf
              cardId={cards[simpleCounter]._id}
              simpleCounter={simpleCounter}
              increaseSimpleCounter={increaseSimpleCounter}
              getCardNewRating={getCardNewRating}
            />
          )}
        </Box>
      </CustomPaper>
    </Box>
  )
}
