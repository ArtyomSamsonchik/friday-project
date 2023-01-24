import React, { ChangeEvent, memo, useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import Slider from '@mui/material/Slider'
import { shallowEqual } from 'react-redux'

import { useDebounce } from '../../utils/hooks'

type MinimumDistanceSliderType = {
  minValue: number
  maxValue: number
  onRangeChange: (minValue: number, maxValue: number) => void
}

const minThumbDistance = 1

const getCorrectedInputMinValue = (min: number, max: number) =>
  max - min < minThumbDistance ? max - minThumbDistance : min

const getCorrectedInputMaxValue = (min: number, max: number) =>
  max - min < minThumbDistance ? min + minThumbDistance : max

export const MinimumDistanceSlider = memo((props: MinimumDistanceSliderType) => {
  const { minValue, maxValue, onRangeChange } = props

  const [sliderMinMax, setSliderMinMax] = useState([minValue, maxValue])
  const [inputMinMax, setInputMinMax] = useState([minValue, maxValue])
  const debouncedInputMinMax = useDebounce(inputMinMax)

  useEffect(() => {
    setSliderMinMax([0, maxValue])
    setInputMinMax([0, maxValue])
  }, [minValue, maxValue])

  //synchronize slider with inputs when changing input field
  useEffect(() => {
    if (shallowEqual(sliderMinMax, debouncedInputMinMax)) return

    const [sliderMinValue, sliderMaxValue] = sliderMinMax
    let [inputMinValue, inputMaxValue] = debouncedInputMinMax

    if (sliderMinValue !== inputMinValue) {
      inputMinValue = getCorrectedInputMinValue(inputMinValue, inputMaxValue)
    }
    if (sliderMaxValue !== inputMaxValue) {
      inputMaxValue = getCorrectedInputMaxValue(inputMinValue, inputMaxValue)
    }

    setSliderMinMax([inputMinValue, inputMaxValue])
    setInputMinMax([inputMinValue, inputMaxValue])
    onRangeChange(inputMinValue, inputMaxValue)
  }, debouncedInputMinMax)

  const handleSliderChange = (event: Event, newValues: number | number[], activeThumb: number) => {
    let [newMinValue, newMaxValue] = newValues as number[]

    if (activeThumb === 0) {
      newMinValue = Math.min(newMinValue, sliderMinMax[1] - minThumbDistance)

      setSliderMinMax([newMinValue, sliderMinMax[1]])
      setInputMinMax([newMinValue, sliderMinMax[1]])
    } else {
      newMaxValue = Math.max(newMaxValue, sliderMinMax[0] + minThumbDistance)

      setSliderMinMax([sliderMinMax[0], newMaxValue])
      setInputMinMax([sliderMinMax[0], newMaxValue])
    }
  }

  const handleSliderChangeCommit = () => onRangeChange(sliderMinMax[0], sliderMinMax[1])

  const handleMinInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMinValue = Math.max(minValue, Number(e.currentTarget.value))

    setInputMinMax([newMinValue, inputMinMax[1]])
  }

  const handleMaxInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMaxValue = Math.min(maxValue, Number(e.currentTarget.value))

    setInputMinMax([inputMinMax[0], newMaxValue])
  }

  return (
    <Box sx={{ width: 320, display: 'flex', flexDirection: 'row' }}>
      <Input
        value={inputMinMax[0]}
        size="small"
        onChange={handleMinInputChange}
        inputProps={{
          step: 1,
          min: minValue,
          max: sliderMinMax[1] - 1,
          type: 'number',
        }}
      />
      <Slider
        value={sliderMinMax}
        max={maxValue}
        onChange={handleSliderChange}
        onChangeCommitted={handleSliderChangeCommit}
        valueLabelDisplay="auto"
        disableSwap
      />
      <Input
        value={inputMinMax[1]}
        size="small"
        onChange={handleMaxInputChange}
        inputProps={{
          step: 1,
          min: sliderMinMax[0] + 1,
          max: maxValue,
          type: 'number',
        }}
      />
    </Box>
  )
})
