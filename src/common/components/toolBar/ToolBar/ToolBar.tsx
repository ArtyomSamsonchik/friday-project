import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import {
  GetCardPacksQueryParams,
  SortPacksParams,
} from '../../../../features/cardsPack/card-packs-api'
import {
  selectIsMyPacks,
  selectMaxCardsCount,
  selectMinCardsCount,
  selectPacksSortOrder,
} from '../../../../features/cardsPack/cards-pack-selectors'
import { setPersonalPacksParam } from '../../../../features/cardsPack/cards-pack-slice'
import { EditorAddPackModal } from '../../../../features/cardsPack/components/EditorAddPackModal/EditorAddPackModal'
import { SortPacksSplitButton } from '../../../../features/cardsPack/components/SortPacksSplitButton/SortPacksSplitButton'
import { stringifySortQueryParams } from '../../../../utils/helpers/stringifySortQueryParams'
import { useAppDispatch } from '../../../../utils/hooks/useAppDispatch'
import { StringifiedRecord, useAppQueryParams } from '../../../../utils/hooks/useAppQueryParams'
import { useAppSelector } from '../../../../utils/hooks/useAppSelector'
import { useDebounce } from '../../../../utils/hooks/useDebounce'
import { DropdownListSplitButton } from '../../DropdownListSplitButton/DropdownListSplitButton'
import { RangeSlider } from '../../RangeSlider'
import { SuperButton } from '../../shared/SuperButton/SuperButton'
import { ToolBarHeader } from '../ToolBarHeader/ToolBarHeader'

import { CustomToolBarFilters } from './CustomToolBarFilters'

type ToolbarSearchParams = Pick<
  StringifiedRecord<GetCardPacksQueryParams>,
  'packName' | 'min' | 'max' | 'sortPacks'
>

export const ToolBar = () => {
  const isMyPacks = useAppSelector(selectIsMyPacks)
  // const sortPackOrder = useAppSelector(selectPacksSortOrder)
  const minCardsCount = useAppSelector(selectMinCardsCount)
  const maxCardsCount = useAppSelector(selectMaxCardsCount)

  const [queryParams, setQueryParams] = useAppQueryParams({
    // sortPacks: '1updated',
  } as ToolbarSearchParams)

  const [packSearchName, setPackSearchName] = useState(queryParams?.packName || '')
  const debouncedPackSearchName = useDebounce(packSearchName)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const dispatch = useAppDispatch()

  const sortPackOrder =
    queryParams.sortPacks ||
    stringifySortQueryParams({ order: 'desc', column: 'updated' as SortPacksParams['column'] })

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

  const handlePacksSortingChange = useCallback((sortParams: SortPacksParams) => {
    setQueryParams({ sortPacks: stringifySortQueryParams(sortParams) })
  }, [])

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
          <SortPacksSplitButton
            sortPackOrder={sortPackOrder}
            onSortChange={handlePacksSortingChange}
          />
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
