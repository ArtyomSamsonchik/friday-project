import * as React from 'react'
import { useEffect } from 'react'

import { Input } from '@mui/material'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import { GetCardPacksQueryParams } from '../../../features/cardsPack/card-packs-api'
import { DEPRECATED_fetchCardPacksTC } from '../../../features/cardsPack/cards-pack-slice'
import { selectProfile } from '../../../features/profile/profile-slice'
import { useAppDispatch, useAppSelector, useDebounce } from '../../../utils/hooks'

const minDistance = 1

type MinimumDistanceSliderType = {
  isMyPack: boolean
  sort: () => void
  value1: number[]
  setValue1: (value1: number[]) => void
  showNew: boolean
}

export const MinimumDistanceSlider = (props: MinimumDistanceSliderType) => {
  const debouncedValue = useDebounce<number[]>(props.value1, 1000)

  console.log(props.isMyPack)
  useEffect(() => {
    props.sort()
  }, [debouncedValue, props.showNew, props.isMyPack])

  const handleChange1 = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      props.setValue1([Math.min(newValue[0], props.value1[1] - minDistance), props.value1[1]])
    } else {
      props.setValue1([props.value1[0], Math.max(newValue[1], props.value1[0] + minDistance)])
    }
  }
  const handleInputChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue1([Number(event.target.value), props.value1[1]])
  }
  const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue1([props.value1[0], Number(event.target.value)])
  }
  const handleBlur = () => {
    if (props.value1[0] < 0) {
      props.setValue1([0, props.value1[1]])
    } else if (props.value1[1] > 110) {
      props.setValue1([props.value1[0], 110])
    }
  }

  return (
    <Box sx={{ width: 320, display: 'flex', flexDirection: 'row' }}>
      <Input
        value={props.value1[0]}
        size="small"
        onChange={handleInputChange1}
        onBlur={handleBlur}
        inputProps={{
          step: 1,
          min: 0,
          max: 110,
          type: 'number',
          'aria-labelledby': 'input-slider',
        }}
      />
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={props.value1}
        max={110}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        disableSwap
      />
      <Input
        value={props.value1[1]}
        size="small"
        onChange={handleInputChange2}
        inputProps={{
          step: 1,
          min: 0,
          max: 110,
          type: 'number',
          'aria-labelledby': 'input-slider',
        }}
      />
    </Box>
  )
}
