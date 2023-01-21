import * as React from 'react'
import { memo, useEffect } from 'react'

import { Input } from '@mui/material'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import { setMinMaxCardsCount } from '../../../features/cardsPack/cards-pack-slice'
import { useAppDispatch } from '../../../utils/hooks'

const minDistance = 1

type MinimumDistanceSliderType = {
  minMaxSliderRange: number[]
  sliderCurrent: number[]
}

export const MinimumDistanceSlider = memo((props: MinimumDistanceSliderType) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setMinMaxCardsCount([props.minMaxSliderRange[0], props.minMaxSliderRange[1]]))
  }, [JSON.stringify(props.minMaxSliderRange)])

  const handleChange1 = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      dispatch(
        setMinMaxCardsCount([
          Math.min(newValue[0], props.sliderCurrent[1] - minDistance),
          props.sliderCurrent[1],
        ])
      )
    } else {
      dispatch(
        setMinMaxCardsCount([
          props.sliderCurrent[0],
          Math.max(newValue[1], props.sliderCurrent[0] + minDistance),
        ])
      )
    }
  }
  const handleInputChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setMinMaxCardsCount([Number(event.target.value), props.sliderCurrent[1]]))
  }
  const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setMinMaxCardsCount([props.sliderCurrent[0], Number(event.target.value)]))
  }

  return (
    <Box sx={{ width: 320, display: 'flex', flexDirection: 'row' }}>
      <Input
        value={props.sliderCurrent[0]}
        size="small"
        onChange={handleInputChange1}
        inputProps={{
          step: 1,
          min: props.minMaxSliderRange[0],
          max: props.minMaxSliderRange[1],
          type: 'number',
          'aria-labelledby': 'input-slider',
        }}
      />
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={props.sliderCurrent}
        max={props.minMaxSliderRange[1]}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        disableSwap
      />
      <Input
        value={props.sliderCurrent[1]}
        size="small"
        onChange={handleInputChange2}
        inputProps={{
          step: 1,
          min: props.minMaxSliderRange[0],
          max: props.minMaxSliderRange[1],
          type: 'number',
          'aria-labelledby': 'input-slider',
        }}
      />
    </Box>
  )
})
