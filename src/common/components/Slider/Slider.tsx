import * as React from 'react'
import { memo, useEffect } from 'react'

import { Input } from '@mui/material'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

const minThumbDistance = 1

type MinimumDistanceSliderType = {
  minValue: number
  maxValue: number
  currentMinValue: number
  currentMaxValue: number
  onSliderChange: (minValue: number, maxValue: number) => void
}

export const MinimumDistanceSlider = memo((props: MinimumDistanceSliderType) => {
  const { minValue, maxValue, currentMinValue, currentMaxValue, onSliderChange } = props

  useEffect(() => {
    onSliderChange(Math.min(minValue, 0), maxValue)
  }, [minValue, maxValue])

  const handleChange1 = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      onSliderChange(Math.min(newValue[0], currentMaxValue - minThumbDistance), currentMaxValue)
    } else {
      onSliderChange(currentMinValue, Math.max(newValue[1], currentMinValue + minThumbDistance))
    }
  }
  const handleInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSliderChange(Number(e.currentTarget.value), currentMaxValue)
  }
  const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSliderChange(currentMinValue, Number(e.currentTarget.value))
  }

  return (
    <Box sx={{ width: 320, display: 'flex', flexDirection: 'row' }}>
      <Input
        value={currentMinValue}
        size="small"
        onChange={handleInputChange1}
        inputProps={{
          step: 1,
          min: minValue,
          max: currentMaxValue - 1,
          type: 'number',
          'aria-labelledby': 'input-slider',
        }}
      />
      <Slider
        value={[currentMinValue, currentMaxValue]}
        max={maxValue}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        disableSwap
      />
      <Input
        value={currentMaxValue}
        size="small"
        onChange={handleInputChange2}
        inputProps={{
          step: 1,
          min: currentMinValue + 1,
          max: maxValue,
          type: 'number',
          'aria-labelledby': 'input-slider',
        }}
      />
    </Box>
  )
})
