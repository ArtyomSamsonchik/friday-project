import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { selectAppStatus } from '../../../app/app-slice'
import { BackLink } from '../../../common/components/BackLink'
import { CustomContainer } from '../../../common/components/CustomContainer'
import { PaginationBar } from '../../../common/components/Pagination/PaginationBar'
import { MinimumDistanceSlider } from '../../../common/components/RangeSlider'
import { SuperButton } from '../../../common/components/shared/SuperButton/SuperButton'
import { SortPackButton } from '../../../common/components/SortPacks/SortPacksButton'
import { CustomToolBarFilters } from '../../../common/components/toolBar/ToolBar/CustomToolBarFilters'
import { ToolBar } from '../../../common/components/toolBar/ToolBar/ToolBar'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppQueryParams } from '../../../utils/hooks/useAppQueryParams'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { useDebounce } from '../../../utils/hooks/useDebounce'
import { GetCardPacksQueryParams } from '../card-packs-api'
import {
  selectCurrentPage,
  selectIsMyPacks,
  selectItemsPerPage,
  selectMaxCardsCount,
  selectMinCardsCount,
  selectPacksSortOrder,
  selectPacksTotalCount,
} from '../cards-pack-selectors'
import {
  cleanPacks,
  DEPRECATED_fetchCardPacksTC,
  setCurrentPackPage,
  setPackItemsPerPage,
  setPersonalPacksParam,
} from '../cards-pack-slice'

import { CardPacksList } from './CardPacksList'

export const CardPacksPage = () => {
  const [qParams, setAppQueryParams] = useAppQueryParams<GetCardPacksQueryParams>({
    page: '1',
    pageCount: '12',
  })

  const cardPacksTotalCount = useAppSelector(selectPacksTotalCount)
  const itemsPerPage = useAppSelector(selectItemsPerPage)
  const currentPage = useAppSelector(selectCurrentPage)
  const sortPackOrder = useAppSelector(selectPacksSortOrder)
  const isMyPacks = useAppSelector(selectIsMyPacks)
  const minCardsCount = useAppSelector(selectMinCardsCount)
  const maxCardsCount = useAppSelector(selectMaxCardsCount)
  const appStatus = useAppSelector(selectAppStatus)
  const [packSearchName, setPackSearchName] = useState('')

  const debouncedPackSearchName = useDebounce(packSearchName)

  const dispatch = useAppDispatch()

  const controlsAreDisabled = appStatus === 'loading'

  useEffect(() => {
    console.log('effect')
    dispatch(DEPRECATED_fetchCardPacksTC(qParams))

    return () => {
      dispatch(cleanPacks())
    }
  }, [
    //debouncedPackSearchName,
    // itemsPerPage,
    // currentPage,
    // isMyPacks,
    // sortPackOrder,
    qParams,
    // searchParams,
  ])

  const changePageHandler = (event: ChangeEvent<unknown>, currentPage: number) => {
    dispatch(setCurrentPackPage(currentPage))
    //let param = getQueryParamObject('page', currentPage + '', searchParams)
    //let param = getQueryParamObject('page', currentPage, qParams)

    setAppQueryParams('page', currentPage)
  }

  const changeItemsPerPageHandler = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      dispatch(setPackItemsPerPage(+event.target.value))
      // setAppQueryParams({ ...qParams, pageCount: event.target.value })
    },
    [dispatch, qParams]
  )
  const handleSliderChange = useCallback((min: number, max: number) => {
    dispatch(DEPRECATED_fetchCardPacksTC({ min, max }))
  }, [])

  const handleSearchNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPackSearchName(e.currentTarget.value)
  }

  useEffect(() => {
    //let param = getQueryParamObject('packName', debouncedPackSearchName, qParams)
    // const packNameQuery: { packName?: string } = debouncedPackSearchName
    //   ? { packName: debouncedPackSearchName }
    //   : {}
    // const { packName, ...otherQueries } = qParams

    setAppQueryParams('packName', debouncedPackSearchName)
  }, [debouncedPackSearchName])

  const resetAllFiltersHandler = () => {
    // dispatch(setPackItemsPerPage(12))
    // dispatch(setPacksSortOrder({ order: 'desc', column: 'updated' }))
    dispatch(setCurrentPackPage(1))
    // dispatch(setPersonalPacksParam(false))
    //dispatch(setPackSearchName(''))
    // setAppQueryParams()
  }

  return (
    <CustomContainer sx={{ mb: 9 }}>
      <BackLink title="test link to profile" to="/profile" />
      <ToolBar title={'Packs List'} />
      <div className={'toolBar'}>
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
      </div>
      <CardPacksList />
      <PaginationBar
        pagesCount={Math.ceil(cardPacksTotalCount / itemsPerPage)}
        disabled={controlsAreDisabled}
        itemsPerPage={itemsPerPage}
        onPageChange={changePageHandler}
        onItemsCountChange={changeItemsPerPageHandler}
      />
    </CustomContainer>
  )
}

//TODO: Separate PacksList and Toolbar to different components
//  to prevent unnecessary renders
// TODO: delete from state currentPage itemsPPage searchName order
// TODO: disable toolbar controls when appStatus isLoading
