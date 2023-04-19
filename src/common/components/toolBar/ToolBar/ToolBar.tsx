import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import { GetCardPacksQueryParams } from '../../../../features/cardsPack/card-packs-api'
import {
  selectIsMyPacks,
  selectMaxCardsCount,
  selectMinCardsCount,
  selectPacksSortOrder,
} from '../../../../features/cardsPack/cards-pack-selectors'
import { setPersonalPacksParam } from '../../../../features/cardsPack/cards-pack-slice'
import { EditorAddPackModal } from '../../../../features/cardsPack/components/EditorAddPackModal/EditorAddPackModal'
import { useAppDispatch } from '../../../../utils/hooks/useAppDispatch'
import { StringifiedRecord, useAppQueryParams } from '../../../../utils/hooks/useAppQueryParams'
import { useAppSelector } from '../../../../utils/hooks/useAppSelector'
import { useDebounce } from '../../../../utils/hooks/useDebounce'
import { RangeSlider } from '../../RangeSlider'
import { SuperButton } from '../../shared/SuperButton/SuperButton'
import { SortPackButton } from '../../SortPacks/SortPacksButton'
import { ToolBarHeader } from '../ToolBarHeader/ToolBarHeader'

import { CustomToolBarFilters } from './CustomToolBarFilters'

type ToolbarSearchParams = Pick<
  StringifiedRecord<GetCardPacksQueryParams>,
  'packName' | 'min' | 'max' | 'user_id'
>

export const ToolBar = () => {
  const isMyPacks = useAppSelector(selectIsMyPacks)
  const sortPackOrder = useAppSelector(selectPacksSortOrder)
  const minCardsCount = useAppSelector(selectMinCardsCount)
  const maxCardsCount = useAppSelector(selectMaxCardsCount)

  const [queryParams, setQueryParams] = useAppQueryParams<ToolbarSearchParams>()

  const [packSearchName, setPackSearchName] = useState(queryParams?.packName || '')
  const debouncedPackSearchName = useDebounce(packSearchName)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const dispatch = useAppDispatch()

  const handleModalClose = useCallback(() => {
    setModalIsOpen(false)
  }, [])

  const handleSliderChange = useCallback((min: number, max: number) => {
    // dispatch(setMinAndMaxCardsCount({ min, max }))
    setQueryParams({ min: min + '', max: max + '' })
  }, [])

  const handleSearchNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPackSearchName(e.currentTarget.value)
  }

  useEffect(() => {
    setQueryParams({ packName: debouncedPackSearchName })
  }, [debouncedPackSearchName])

  const resetAllFiltersHandler = () => {}

  return (
    <div>
      <ToolBarHeader
        title={'Packs list'}
        btnTitle={'Add new pack'}
        btnOnclickHandler={() => setModalIsOpen(true)}
      />
      <Stack direction="row" gap="20px">
        <TextField value={packSearchName} onChange={handleSearchNameChange} />
        <CustomToolBarFilters>
          <SortPackButton sortPackOrder={sortPackOrder} />
          <RangeSlider
            minValueLimit={minCardsCount}
            maxValueLimit={maxCardsCount}
            minValue={Number(queryParams.min) || undefined}
            maxValue={Number(queryParams.max) || undefined}
            onRangeChange={handleSliderChange}
          />

          <div>
            <SuperButton
              style={isMyPacks ? { backgroundColor: 'blue' } : { backgroundColor: 'white' }}
              onClick={() => dispatch(setPersonalPacksParam(true))}
            >
              my
            </SuperButton>
            <SuperButton
              style={isMyPacks ? { backgroundColor: 'white' } : { backgroundColor: 'blue' }}
              onClick={() => dispatch(setPersonalPacksParam(false))}
            >
              all
            </SuperButton>
          </div>
          <Button
            variant="text"
            size={'small'}
            sx={{
              width: 'fit-content',
            }}
            fullWidth={false}
            onClick={resetAllFiltersHandler}
          >
            Reset
          </Button>
        </CustomToolBarFilters>
      </Stack>
      <EditorAddPackModal
        isOpen={modalIsOpen}
        title="Add new pack"
        onClose={handleModalClose}
        packId=""
      />
    </div>
  )
}

// TODO: header change children to different props
