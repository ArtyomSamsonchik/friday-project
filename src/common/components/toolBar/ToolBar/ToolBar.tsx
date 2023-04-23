import React, { ChangeEvent, memo, useCallback, useEffect, useState } from 'react'

import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Stack from '@mui/material/Stack'

import {
  GetCardPacksQueryParams,
  SortPacksParams,
} from '../../../../features/cardsPack/card-packs-api'
import {
  selectMaxCardsCount,
  selectMinCardsCount,
} from '../../../../features/cardsPack/cards-pack-selectors'
import { EditorAddPackModal } from '../../../../features/cardsPack/components/EditorAddPackModal/EditorAddPackModal'
import { SortPacksSplitButton } from '../../../../features/cardsPack/components/SortPacksSplitButton/SortPacksSplitButton'
import { selectProfile } from '../../../../features/profile/profile-slice'
import { stringifySortQueryParams } from '../../../../utils/helpers/stringifySortQueryParams'
import { StringifiedRecord, useAppQueryParams } from '../../../../utils/hooks/useAppQueryParams'
import { useAppSelector } from '../../../../utils/hooks/useAppSelector'
import { useDebounce } from '../../../../utils/hooks/useDebounce'
import { RangeSlider } from '../../RangeSlider'
import { ToolBarHeader } from '../ToolBarHeader/ToolBarHeader'

import { CustomToolBarFilters } from './CustomToolBarFilters'

type ToolbarSearchParams = Omit<StringifiedRecord<GetCardPacksQueryParams>, 'block'>

export const ToolBar = memo(() => {
  const profile = useAppSelector(selectProfile)
  // const isMyPacks = useAppSelector(selectIsMyPacks)
  // const sortPackOrder = useAppSelector(selectPacksSortOrder)
  const minCardsCount = useAppSelector(selectMinCardsCount)
  const maxCardsCount = useAppSelector(selectMaxCardsCount)

  const [queryParams, setQueryParams] = useAppQueryParams<ToolbarSearchParams>()
  const [packSearchName, setPackSearchName] = useState(queryParams?.packName || '')
  const debouncedPackSearchName = useDebounce(packSearchName)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    setQueryParams({ packName: debouncedPackSearchName })
  }, [debouncedPackSearchName])

  // const dispatch = useAppDispatch()
  const isMyPacks = !!queryParams.user_id
  const sortPackOrder =
    queryParams.sortPacks ||
    stringifySortQueryParams({ order: 'desc', column: 'updated' as SortPacksParams['column'] })

  const handleModalClose = useCallback(() => {
    setModalIsOpen(false)
  }, [])

  const handleSliderChange = useCallback((min: number, max: number) => {
    // dispatch(setMinAndMaxCardsCount({ min, max }))
    setQueryParams({ min: min + '', max: max + '', page: '' })
  }, [])
  const handleSearchNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPackSearchName(e.currentTarget.value)
  }

  const handlePacksSortingChange = useCallback((sortParams: SortPacksParams) => {
    setQueryParams({ sortPacks: stringifySortQueryParams(sortParams) })
  }, [])

  const togglePacksArePersonal = (userId: string) => {
    setQueryParams({
      user_id: userId,
      page: '',
    })
  }

  const restFilters = () => {
    setQueryParams({
      user_id: '',
      min: '',
      max: '',
      packName: '',
      sortPacks: '',
      page: '',
      pageCount: '',
    })
  }

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
            onRangeChangeCommit={handleSliderChange}
          />

          <div>
            <ButtonGroup>
              <Button
                variant={isMyPacks ? 'contained' : 'outlined'}
                onClick={() => togglePacksArePersonal(profile._id)}
              >
                my
              </Button>
              <Button
                variant={isMyPacks ? 'outlined' : 'contained'}
                onClick={() => togglePacksArePersonal('')}
              >
                all
              </Button>
            </ButtonGroup>
          </div>
          <Button variant="text" size={'small'} onClick={restFilters}>
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
})

// TODO: header change children to different props
