import * as React from 'react'
import { useState } from 'react'

import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

import { FilledButton } from '../../../../common/components/FilledButton'
import { useAppDispatch } from '../../../../utils/hooks/useAppDispatch'
import { UpdateCardGradeRequestData } from '../../../cards/cards-api'
import { updateCardGradeTC } from '../../../cards/cards-slice'

const yourAnswer = [
  'Did not know',
  'Forgot',
  'A lot of thought',
  'Confused',
  'Knew the answer',
] as const

type RateYourSelfProps = {
  cardId: string
  increaseSimpleCounter: () => void
}
export const RateYourSelf = (props: RateYourSelfProps) => {
  const { increaseSimpleCounter, cardId } = props

  const [grade, setGrade] = useState(0)
  const dispatch = useAppDispatch()
  const changeGrade = (value: number) => {
    setGrade(value)
  }

  const onNextButtonClick = () => {
    increaseSimpleCounter()

    const data: UpdateCardGradeRequestData = {
      card_id: cardId,
      grade: grade,
    }

    dispatch(updateCardGradeTC(data))
  }

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
