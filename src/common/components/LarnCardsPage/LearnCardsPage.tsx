import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { selectAllCards, selectPackName } from '../../../features/cards/cards-selectors'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'

export const LearnCardsPage = () => {
  const cards = useAppSelector(selectAllCards)
  const [showAnswer, setShowAnswer] = useState(false)
  const [simpleCounter, setSimpleCounter] = useState(0)
  const packName = useAppSelector(selectPackName)
  const increaseSimpleCounter = () => {
    setSimpleCounter(simpleCounter + 1)
    setShowAnswer(false)
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography>{packName}</Typography>
      <Box sx={{ margin: '10px', width: '400px', height: 'max-content', border: '2px solid red' }}>
        <Typography>{cards[simpleCounter].question}</Typography>
        <Typography>количестов попыток ответа на вопрос: {cards[simpleCounter].shots}</Typography>
        {showAnswer && cards[simpleCounter].answer}
        {showAnswer || <button onClick={() => setShowAnswer(!showAnswer)}>show answer</button>}
        {!showAnswer || <button onClick={increaseSimpleCounter}>next question</button>}
      </Box>
    </Box>
  )
}
