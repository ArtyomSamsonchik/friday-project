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
    setGrade(0)
    const data: CardsNewGradeRequestData = {
      card_id: cardId,
      grade: grade,
    }

    getCardNewRating(data)
  }

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Rate yourself</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="A lot of thought"
        name="radio-buttons-group"
      >
        <FormControlLabel
          onClick={() => changeGrade(1)}
          value={1}
          checked={grade === 1}
          control={<Radio />}
          label="Did not know"
        />
        <FormControlLabel
          onClick={() => changeGrade(2)}
          checked={grade === 2}
          value={2}
          control={<Radio />}
          label="Forgot"
        />
        <FormControlLabel
          onClick={() => changeGrade(3)}
          value={3}
          checked={grade === 3}
          control={<Radio />}
          label="A lot of thought"
        />
        <FormControlLabel
          onClick={() => changeGrade(4)}
          checked={grade === 4}
          value={4}
          control={<Radio />}
          label="Confused"
        />
        <FormControlLabel
          onClick={() => changeGrade(5)}
          checked={grade === 5}
          value={5}
          control={<Radio />}
          label="Knew the answer"
        />
      </RadioGroup>
      <FilledButton disabled={!grade} onClick={onNextButtonClick}>
        Next Question
      </FilledButton>
    </FormControl>
  )
}
//Todo : промапиться, keys
