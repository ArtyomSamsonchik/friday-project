import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'

import TextField from '@mui/material/TextField'

import { selectAppStatus } from '../../../app/app-slice'
import { BackLink } from '../../../common/components/BackLink'
import { CustomContainer } from '../../../common/components/CustomContainer'
import { FilledButton } from '../../../common/components/FilledButton'
import { PaginationBar } from '../../../common/components/Pagination/PaginationBar'
import { MinimumDistanceSlider } from '../../../common/components/RangeSlider'
import { SuperButton } from '../../../common/components/shared/SuperButton/SuperButton'
import { SortPackButton } from '../../../common/components/SortPacks/SortPacksButton'
import { CustomToolBarSam } from '../../../common/components/toolBar/ToolBar/CustomToolBar'
import { ToolBarHeader } from '../../../common/components/toolBar/ToolBarHeader/ToolBarHeader'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { useDebounce } from '../../../utils/hooks/useDebounce'
import {
  selectCurrentPage,
  selectIsMyPacks,
  selectItemsPerPage,
  selectMaxCardsCount,
  selectMinCardsCount,
  selectPackSearchName,
  selectPacksSortOrder,
  selectPacksTotalCount,
} from '../cards-pack-selectors'
import {
  cleanPacks,
  DEPRECATED_fetchCardPacksTC,
  setCurrentPackPage,
  setPackItemsPerPage,
  setPackSearchName,
  setPersonalPacksParam,
} from '../cards-pack-slice'

import { CardPacksList } from './CardPacksList'
import { EditorAddPackModal } from './EditorAddPackModal/EditorAddPackModal'

export const CardPacksPage = () => {
  const cardPacksTotalCount = useAppSelector(selectPacksTotalCount)
  const itemsPerPage = useAppSelector(selectItemsPerPage)
  const currentPage = useAppSelector(selectCurrentPage)
  const sortPackOrder = useAppSelector(selectPacksSortOrder)
  const isMyPacks = useAppSelector(selectIsMyPacks)
  const minCardsCount = useAppSelector(selectMinCardsCount)
  const maxCardsCount = useAppSelector(selectMaxCardsCount)
  const appStatus = useAppSelector(selectAppStatus)

  const packSearchName = useAppSelector(selectPackSearchName)
  const debouncedPackSearchName = useDebounce(packSearchName)

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const dispatch = useAppDispatch()

  const controlsAreDisabled = appStatus === 'loading'

  useEffect(() => {
    dispatch(DEPRECATED_fetchCardPacksTC())

    return () => {
      dispatch(cleanPacks())
    }
  }, [debouncedPackSearchName, itemsPerPage, currentPage, isMyPacks, sortPackOrder])

  const handleSearchNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPackSearchName(e.currentTarget.value))
  }

  const changePageHandler = useCallback(
    (event: ChangeEvent<unknown>, page: number) => {
      dispatch(setCurrentPackPage(page))
    },
    [dispatch]
  )

  const changeItemsPerPageHandler = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      dispatch(setPackItemsPerPage(+event.target.value))
    },
    [dispatch]
  )

  const handleSliderChange = useCallback((min: number, max: number) => {
    dispatch(DEPRECATED_fetchCardPacksTC({ min, max }))
  }, [])

  const handleModalClose = useCallback(() => {
    setModalIsOpen(false)
  }, [])

  return (
    <CustomContainer sx={{ mb: 9 }}>
      <BackLink title="test link to profile" to="/profile" />
      <div className={'toolBar'}>
        <ToolBarHeader>
          <h3>Packs List</h3>
          <FilledButton onClick={() => setModalIsOpen(true)}>Add new pack</FilledButton>
        </ToolBarHeader>

        <div style={{ display: 'flex', gap: '20px' }}>
          <TextField value={packSearchName} onChange={handleSearchNameChange} />
          <CustomToolBarSam>
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
          </CustomToolBarSam>
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
      <EditorAddPackModal
        isOpen={modalIsOpen}
        title="Add new pack"
        onClose={handleModalClose}
        packId=""
      />
    </CustomContainer>
  )
}

//TODO: Separate PacksList and Toolbar to different components
//  to prevent unnecessary renders
