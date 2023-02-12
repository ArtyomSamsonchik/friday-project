import * as React from 'react'
import { useState } from 'react'

import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

import { CardsNewGradeRequestData } from '../../../features/cards/cards-api'
import { FilledButton } from '../FilledButton'

type PropsType = {
  cardId: string
  simpleCounter: number
  getCardNewRating: (data: CardsNewGradeRequestData) => void
  increaseSimpleCounter: (simpleCounter: number) => void
}
export const RateYourSelf = (props: PropsType) => {
  const [grade, setGrade] = useState(0)
  const { increaseSimpleCounter, getCardNewRating, simpleCounter, cardId } = props
  const changeGrade = (value: number) => {
    setGrade(value)
  }

  const onNextButtonClick = () => {
    increaseSimpleCounter(simpleCounter + 1)

    const data: CardsNewGradeRequestData = {
      card_id: cardId,
      grade: grade,
    }

    getCardNewRating(data)
  }
  const yourAnswer = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer']

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Rate yourself</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue=""
        name="radio-buttons-group"
      >
        {yourAnswer.map((answer, index) => (
          <FormControlLabel
            key={index}
            value={index + 1}
            onClick={() => changeGrade(index + 1)}
            checked={grade === index + 1}
            control={<Radio />}
            label={answer}
          />
        ))}
      </RadioGroup>
      <FilledButton disabled={!grade} onClick={onNextButtonClick}>
        Next Question
      </FilledButton>
    </FormControl>
  )
}
