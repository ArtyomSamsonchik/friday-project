import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { PATH } from '../../../app/path'
import { CardsNewGradeRequestData } from '../../../features/cards/cards-api'
import { selectAllCards, selectPackName } from '../../../features/cards/cards-selectors'
import { updateCardGradeTC } from '../../../features/cards/cards-slice'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { BackLink } from '../BackLink'
import { CustomContainer } from '../CustomContainer'
import { CustomPaper } from '../CustomPaper'
import { FilledButton } from '../FilledButton'
import { RateYourSelf } from '../RateYourSelf/RateYourSelf'

export const LearnCardsPage = () => {
  const cards = useAppSelector(selectAllCards)

  const [showAnswer, setShowAnswer] = useState(false)
  const [simpleCounter, setSimpleCounter] = useState(0)
  const packName = useAppSelector(selectPackName)

  const dispatch = useAppDispatch()
  const increaseSimpleCounter = () => {
    setSimpleCounter(simpleCounter + 1)
    setShowAnswer(false)
  }

  console.log(cards)
  /*useEffect(() => {
      debugger
      dispatch(fetchCardsTC({ cardsPack_id: cards[0].cardsPack_id }))
    }, [])*/

  const getCardNewRating = (data: CardsNewGradeRequestData) => {
    dispatch(updateCardGradeTC(data))
  }

  return (
    <CustomContainer>
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
              key={cards[simpleCounter]._id}
              cardId={cards[simpleCounter]._id}
              simpleCounter={simpleCounter}
              increaseSimpleCounter={increaseSimpleCounter}
              getCardNewRating={getCardNewRating}
            />
          )}
        </Box>
      </CustomPaper>
    </CustomContainer>
  )
}
