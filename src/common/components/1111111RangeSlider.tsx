import React, { ChangeEvent, useEffect, useState } from 'react'

import { Input } from '@mui/material'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import { useDebounce } from '../../utils/hooks'

type RangeSliderProps = {
  range: [number, number]
  onRangeChange: (values: [number, number]) => void
}

const minThumbsDistance = 1

export const RangeSlider = (props: RangeSliderProps) => {
  const { range, onRangeChange } = props

  console.log(range)

  const [sliderMinMax, setSliderMinMax] = useState(range)
  const debouncedSliderMinMax = useDebounce(sliderMinMax, 700)

  useEffect(() => {
    onRangeChange(debouncedSliderMinMax)
    console.log('slider', debouncedSliderMinMax)
  }, [debouncedSliderMinMax])

  //min and max inputs change slider values with delay
  const [inputMinMax, setInputMinMax] = useState(range)
  const debouncedInputMinMax = useDebounce(inputMinMax)

  useEffect(() => {
    setSliderMinMax(debouncedInputMinMax)
    console.log('input', debouncedInputMinMax)
  }, [debouncedInputMinMax])

  // useEffect(() => {
  //   setSliderMinMax(range)
  //   setInputMinMax(range)
  // }, [range])

  const handleSliderChange = (event: Event, newValues: number | number[], activeThumb: number) => {
    const [newMin, newMax] = newValues as [number, number]

    //sets min distance between slider thumbs
    if (activeThumb === 0) {
      newValues = [Math.min(newMin, newMax - minThumbsDistance), newMax]
    } else {
      newValues = [newMin, Math.max(newMax, newMin + minThumbsDistance)]
    }

    setSliderMinMax(newValues as [number, number])
    setInputMinMax(newValues as [number, number])
  }

  //input handlers only allow set slider values between sibling thumb and range boundary
  const handleMinInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.min(
      Math.max(range[0], Number(event.currentTarget.value)),
      sliderMinMax[1] - minThumbsDistance
    )

    // const newValue = Math.max(range[0], Number(event.currentTarget.value))

    setInputMinMax([newValue, sliderMinMax[1]])
  }
  const handleMaxInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(
      Math.min(range[1], Number(event.currentTarget.value)),
      sliderMinMax[0] + minThumbsDistance
    )

    // const newValue = Math.min(range[1], Number(event.currentTarget.value))

    setInputMinMax([sliderMinMax[0], newValue])
  }

  return (
    <Box sx={{ width: 320, display: 'flex', flexDirection: 'row' }}>
      <Input
        value={inputMinMax[0]}
        size="small"
        onChange={handleMinInputChange}
        inputProps={{
          step: 1,
          type: 'number',
          'aria-labelledby': 'input-slider',
        }}
      />
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        step={1}
        value={sliderMinMax}
        min={range[0]}
        max={range[1]}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        disableSwap
      />
      <Input
        value={inputMinMax[1]}
        size="small"
        onChange={handleMaxInputChange}
        inputProps={{
          step: 1,
          type: 'number',
          'aria-labelledby': 'input-slider',
        }}
      />
    </Box>
  )
}
