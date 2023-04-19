import React, { ChangeEvent, FC, memo, useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import Slider, { SliderProps } from '@mui/material/Slider'
import { shallowEqual } from 'react-redux'

import { useDebounce } from '../../utils/hooks/useDebounce'

type RangeSliderProps = {
  minValueLimit: number
  maxValueLimit: number
  minValue?: number
  maxValue?: number
  disabled?: boolean
  onRangeChange: (minValue: number, maxValue: number) => void
}

const minThumbDistance = 1

const getCorrectedInputMinValue = (min: number, max: number) =>
  max - min < minThumbDistance ? max - minThumbDistance : min

const getCorrectedInputMaxValue = (min: number, max: number) =>
  max - min < minThumbDistance ? min + minThumbDistance : max

export const RangeSlider: FC<RangeSliderProps> = memo(props => {
  const { minValueLimit, maxValueLimit, minValue, maxValue, disabled, onRangeChange } = props

  // min and max values are optional, so Slider can be used as uncontrolled component
  const resolvedMinValue = minValue || minValueLimit
  const resolvedMaxValue = maxValue || maxValueLimit

  const [sliderMinMax, setSliderMinMax] = useState([resolvedMinValue, resolvedMaxValue])
  const [inputMinMax, setInputMinMax] = useState([resolvedMinValue, resolvedMaxValue])
  const debouncedInputMinMax = useDebounce(inputMinMax)

  useEffect(() => {
    setSliderMinMax([resolvedMinValue, resolvedMaxValue || 1])
    setInputMinMax([resolvedMinValue, resolvedMaxValue || 1])
  }, [resolvedMinValue, resolvedMaxValue])

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

  const handleSliderChange: SliderProps['onChange'] = (_, newValues, activeThumb) => {
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

  const handleSliderChangeCommit: SliderProps['onChangeCommitted'] = (_, values) => {
    if (Array.isArray(values)) onRangeChange(values[0], values[1])
  }

  const handleMinInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMinValue = Math.max(minValueLimit, Number(e.currentTarget.value))

    setInputMinMax([newMinValue, inputMinMax[1]])
  }

  const handleMaxInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMaxValue = Math.min(maxValueLimit, Number(e.currentTarget.value))

    setInputMinMax([inputMinMax[0], newMaxValue])
  }

  return (
    <Box width={335} display="flex" gap="15px">
      <Input
        value={inputMinMax[0]}
        disabled={disabled}
        size="small"
        onChange={handleMinInputChange}
        inputProps={{
          step: 1,
          min: minValueLimit,
          max: sliderMinMax[1] - 1,
          type: 'number',
        }}
        sx={{
          flexShrink: 0,
          width: 70,
        }}
      />
      <Slider
        value={sliderMinMax}
        disabled={disabled}
        max={maxValueLimit}
        onChange={handleSliderChange}
        onChangeCommitted={handleSliderChangeCommit}
        valueLabelDisplay="auto"
        disableSwap
      />
      <Input
        value={inputMinMax[1]}
        disabled={disabled}
        size="small"
        onChange={handleMaxInputChange}
        inputProps={{
          step: 1,
          min: sliderMinMax[0] + 1,
          max: maxValueLimit,
          type: 'number',
        }}
        sx={{
          flexShrink: 0,
          width: 70,
        }}
      />
    </Box>
  )
})

// TODO: add to state slider
