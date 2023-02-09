import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { CardsNewGradeRequestData } from '../../../features/cards/cards-api'
import { selectAllCards, selectPackName } from '../../../features/cards/cards-selectors'
import { updateCardGradeTC } from '../../../features/cards/cards-slice'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { CustomContainer } from '../CustomContainer'
import { RateYourSelf } from '../RateYourSelf/RateYourSelf'

export const LearnCardsPage = () => {
  const cards = useAppSelector(selectAllCards)
  const [grade, setGrade] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [simpleCounter, setSimpleCounter] = useState(0)
  const packName = useAppSelector(selectPackName)
  const dispatch = useAppDispatch()
  const increaseSimpleCounter = () => {
    setSimpleCounter(simpleCounter + 1)
    setShowAnswer(false)
  }

  const getCardNewRating = (data: CardsNewGradeRequestData) => {
    dispatch(updateCardGradeTC(data))
    setGrade(0)
  }

  return (
    <CustomContainer>
      <Box
        sx={{
          marginTop: '64px',
          width: '100%',
          height: '80%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography>
          <b>Learn: {packName}</b>
        </Typography>
        <Box
          sx={{
            display: 'flex',
            margin: '10px',
            width: '400px',
            height: 'max-content',
            border: '2px solid red',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography>
            <b>Question:</b> {cards[simpleCounter].question}
          </Typography>
          <Typography color={'grey'}>
            количестов попыток ответа на вопрос: {cards[simpleCounter].shots}
          </Typography>
          {showAnswer && cards[simpleCounter].answer}
          {showAnswer || <button onClick={() => setShowAnswer(!showAnswer)}>show answer</button>}
          <RateYourSelf
            cardId={cards[simpleCounter]._id}
            simpleCounter={simpleCounter}
            increaseSimpleCounter={increaseSimpleCounter}
            getCardNewRating={getCardNewRating}
            setGrade={setGrade}
            grade={grade}
          />
        </Box>
      </Box>
    </CustomContainer>
  )
}
