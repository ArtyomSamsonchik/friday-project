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
  onRangeChangeCommit: (minValue: number, maxValue: number) => void
}

const minThumbDistance = 1

const getCorrectedInputMinValue = (min: number, max: number) =>
  max - min < minThumbDistance ? max - minThumbDistance : min

const getCorrectedInputMaxValue = (min: number, max: number) =>
  max - min < minThumbDistance ? min + minThumbDistance : max

export const RangeSlider: FC<RangeSliderProps> = memo(props => {
  const { minValueLimit, maxValueLimit, minValue, maxValue, disabled, onRangeChangeCommit } = props

  // validates min/max, so min/max cannot exceed its limits
  const resolvedMaxValue = maxValue ? Math.min(maxValue, maxValueLimit) : maxValueLimit
  const resolvedMinValue = minValue
    ? Math.min(Math.max(minValue, minValueLimit), resolvedMaxValue - 1)
    : minValueLimit

  const [sliderMinMax, setSliderMinMax] = useState([resolvedMinValue, resolvedMaxValue])
  const [inputMinMax, setInputMinMax] = useState([resolvedMinValue, resolvedMaxValue])
  const debouncedInputMinMax = useDebounce(inputMinMax)

  useEffect(() => {
    setSliderMinMax([resolvedMinValue, resolvedMaxValue])
    setInputMinMax([resolvedMinValue, resolvedMaxValue])
  }, [resolvedMinValue, resolvedMaxValue])

  // correct input values and synchronize slider with inputs when changing input field.
  // debounced value used just to trigger useEffect.
  // shallowEqual uses more relevant current input state value.
  // debounced input value in shallowEqual fn produces react "batching" bugs,
  // which leads to duplication of api queries
  useEffect(() => {
    if (shallowEqual(sliderMinMax, inputMinMax)) return

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
    onRangeChangeCommit(inputMinValue, inputMaxValue)
  }, debouncedInputMinMax)

  const handleSliderChange: SliderProps['onChange'] = (_, values, activeThumb) => {
    const [minValue, maxValue] = values as number[]
    let newValues: [number, number]

    if (activeThumb === 0) {
      const newMinValue = Math.min(minValue, sliderMinMax[1] - minThumbDistance)

      newValues = [newMinValue, sliderMinMax[1]]
    } else {
      const newMaxValue = Math.max(maxValue, sliderMinMax[0] + minThumbDistance)

      newValues = [sliderMinMax[0], newMaxValue]
    }
    setSliderMinMax(newValues)
    setInputMinMax(newValues)
  }

  const handleSliderChangeCommit: SliderProps['onChangeCommitted'] = (_, values) => {
    if (Array.isArray(values)) onRangeChangeCommit(values[0], values[1])
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
        min={minValueLimit}
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
