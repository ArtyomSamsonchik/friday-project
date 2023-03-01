import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { TextField } from '@mui/material'
import Button from '@mui/material/Button'

import { GetCardPacksQueryParams } from '../../../../features/cardsPack/card-packs-api'
import {
  selectIsMyPacks,
  selectMaxCardsCount,
  selectMinCardsCount,
  selectPacksSortOrder,
} from '../../../../features/cardsPack/cards-pack-selectors'
import {
  DEPRECATED_fetchCardPacksTC,
  setMinAndMaxCardsCount,
  setPersonalPacksParam,
} from '../../../../features/cardsPack/cards-pack-slice'
import { AlternativeEditorAddPackModal } from '../../../../features/cardsPack/components/alternativeEditorAddPackModal/AlternativeEditorAddPackModal'
import { useAppDispatch } from '../../../../utils/hooks/useAppDispatch'
import { useAppQueryParams } from '../../../../utils/hooks/useAppQueryParams'
import { useAppSelector } from '../../../../utils/hooks/useAppSelector'
import { useDebounce } from '../../../../utils/hooks/useDebounce'
import { FilledButton } from '../../FilledButton'
import { MinimumDistanceSlider } from '../../RangeSlider'
import { SuperButton } from '../../shared/SuperButton/SuperButton'
import { SortPackButton } from '../../SortPacks/SortPacksButton'
import { ToolBarHeader } from '../ToolBarHeader/ToolBarHeader'

import { CustomToolBarFilters } from './CustomToolBarFilters'

export const ToolBar = () => {
  const dispatch = useAppDispatch()
  const [appQueryParams, setAppQueryParams] = useAppQueryParams<GetCardPacksQueryParams>({
    page: '1',
    pageCount: '12',
  })
  const [packSearchName, setPackSearchName] = useState(appQueryParams?.packName || '')

  const isMyPacks = useAppSelector(selectIsMyPacks)
  const sortPackOrder = useAppSelector(selectPacksSortOrder)
  const minCardsCount = useAppSelector(selectMinCardsCount)
  const maxCardsCount = useAppSelector(selectMaxCardsCount)

  console.log(minCardsCount)
  const debouncedPackSearchName = useDebounce(packSearchName)

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleModalClose = useCallback(() => {
    setModalIsOpen(false)
  }, [])
  const handleSliderChange = useCallback((min: number, max: number) => {
    dispatch(setMinAndMaxCardsCount({ min, max }))
    setAppQueryParams({ max: max + '' })
    setAppQueryParams({ min: min + '' })
    //dispatch(DEPRECATED_fetchCardPacksTC(appQueryParams))
  }, [])
  const handleSearchNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPackSearchName(e.currentTarget.value)
  }

  useEffect(() => {
    setAppQueryParams({ packName: debouncedPackSearchName })
  }, [debouncedPackSearchName])
  const resetAllFiltersHandler = () => {}

  return (
    <div className={'toolBar'}>
      <ToolBarHeader
        title={'Packs list'}
        btnTitle={'Add new pack'}
        btnOnclickHandler={() => setModalIsOpen(true)}
      />
      <div style={{ display: 'flex', gap: '20px' }}>
        <TextField value={packSearchName} onChange={handleSearchNameChange} />
        <CustomToolBarFilters>
          <SortPackButton sortPackOrder={sortPackOrder} />

          <MinimumDistanceSlider
            minValue={minCardsCount}
            maxValue={maxCardsCount}
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
      </div>
      <AlternativeEditorAddPackModal
        isOpen={modalIsOpen}
        title="Add new pack"
        onClose={handleModalClose}
        packId=""
      />
    </div>
  )
}

// TODO: header change children to diferent props
