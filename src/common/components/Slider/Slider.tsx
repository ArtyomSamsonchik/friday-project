import * as React from 'react'

import { Input } from '@mui/material'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

const minDistance = 1

export const MinimumDistanceSlider = () => {
  const [value1, setValue1] = React.useState<number[]>([2, 5])

  const handleChange1 = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]])
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)])
    }
  }
  const handleInputChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue1([Number(event.target.value), value1[1]])
  }
  const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue1([value1[0], Number(event.target.value)])
  }
  const handleBlur = () => {
    if (value1[0] < 0) {
      setValue1([0, value1[1]])
    } else if (value1[1] > 15) {
      setValue1([value1[0], 15])
    }
  }

  return (
    <Box sx={{ width: 320, display: 'flex', flexDirection: 'row' }}>
      <Input
        value={value1[0]}
        size="small"
        onChange={handleInputChange1}
        onBlur={handleBlur}
        inputProps={{
          step: 1,
          min: 0,
          max: 15,
          type: 'number',
          'aria-labelledby': 'input-slider',
        }}
      />
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={value1}
        max={15}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        disableSwap
      />
      <Input
        value={value1[1]}
        size="small"
        onChange={handleInputChange2}
        inputProps={{
          step: 1,
          min: 0,
          max: 15,
          type: 'number',
          'aria-labelledby': 'input-slider',
        }}
      />
    </Box>
  )
}
