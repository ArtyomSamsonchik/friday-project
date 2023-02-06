import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useLocation } from 'react-router-dom'

import { Card } from '../../../features/cards/cards-api'

export const LearnCardsPage = () => {
  console.log(useLocation())
  const { state } = useLocation()
  const cards: Card[] = state.cards
  const [showAnswer, setShowAnswer] = useState(false)
  const [simpleCounter, setSimpleCounter] = useState(0)

  console.log(simpleCounter)
  const increaseSimpleCounter = () => {
    setSimpleCounter(simpleCounter + 1)
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
      <Typography>{state.packName}</Typography>
      <Box sx={{ margin: '10px', width: '400px', height: 'max-content', border: '2px solid red' }}>
        <Typography>{cards[simpleCounter].question}</Typography>
        <Typography>kоличестов попыток ответа на вопрос: {cards[simpleCounter].shots}</Typography>
        {showAnswer && cards[simpleCounter].answer}
        {showAnswer || <button onClick={() => setShowAnswer(!showAnswer)}>show answer</button>}
        {!showAnswer || <button onClick={increaseSimpleCounter}>next question</button>}
      </Box>
    </Box>
  )
}
