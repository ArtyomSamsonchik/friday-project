import React, { ChangeEvent, useCallback, useEffect } from 'react'

import TextField from '@mui/material/TextField'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

import { selectAppStatus } from '../../../app/app-slice'
import { PATH } from '../../../app/path'
import { BackLink } from '../../../common/components/BackLink'
import { CardsContainer } from '../../../common/components/CardsContainer'
import { CustomContainer } from '../../../common/components/CustomContainer'
import { CustomToolbar } from '../../../common/components/CustomToolbar'
import { AddPackModal } from '../../../common/components/Modals/AddPackModal/AddPackModal'
import { PaginationBar } from '../../../common/components/Pagination/PaginationBar'
import { MinimumDistanceSlider } from '../../../common/components/RangeSlider'
import { SuperButton } from '../../../common/components/shared/SuperButton/SuperButton'
import { SortPackButton } from '../../../common/components/SortPacks/SortPacksButton'
import { CustomToolBarSam } from '../../../common/components/toolBar/ToolBar/CustomToolBar'
import { ToolBarHeader } from '../../../common/components/toolBar/ToolBarHeader/ToolBarHeader'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { useDebounce } from '../../../utils/hooks/useDebounce'
import { selectProfile } from '../../profile/profile-slice'
import { AddPackData } from '../card-packs-api'
import {
  selectAllPacks,
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
  addCardPackTC,
  cleanPacks,
  DEPRECATED_fetchCardPacksTC,
  setCurrentPackPage,
  setPackItemsPerPage,
  setPackSearchName,
  setPersonalPacksParam,
} from '../cards-pack-slice'

import { CardPack } from './cardPack/CardPack'

export const CardPacksPage = () => {
  const packs = useAppSelector(selectAllPacks)
  const cardPacksTotalCount = useAppSelector(selectPacksTotalCount)
  const itemsPerPage = useAppSelector(selectItemsPerPage)
  const currentPage = useAppSelector(selectCurrentPage)
  const profile = useAppSelector(selectProfile)
  const sortPackOrder = useAppSelector(selectPacksSortOrder)
  const isMyPacks = useAppSelector(selectIsMyPacks)
  const minCardsCount = useAppSelector(selectMinCardsCount)
  const maxCardsCount = useAppSelector(selectMaxCardsCount)
  const appStatus = useAppSelector(selectAppStatus)

  const packSearchName = useAppSelector(selectPackSearchName)
  const debouncedPackSearchName = useDebounce(packSearchName)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const controlsAreDisabled = appStatus === 'loading'

  useEffect(() => {
    dispatch(DEPRECATED_fetchCardPacksTC())

    return () => {
      dispatch(cleanPacks())
    }
  }, [debouncedPackSearchName, itemsPerPage, currentPage, isMyPacks, sortPackOrder])

  const handleLoadPacksClick = (data: AddPackData) => {
    dispatch(addCardPackTC(data))
  }

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

  return (
    <CustomContainer>
      <BackLink title="test link to profile" to="/profile" />
      <div className={'toolBar'}>
        <ToolBarHeader>
          <h3>Packs List</h3>
          <AddPackModal handleLoadPacksClick={handleLoadPacksClick} />
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
      {/*<CustomToolbar
        title="Packs List"
        actionButtonName="Add new Pack"
        onActionButtonClick={handleLoadPacksClick}
      >
        <TextField
          disabled={controlsAreDisabled}
          label="search pack"
          value={packSearchName}
          onChange={handleSearchNameChange}
        />
        <SortPackButton disabled={controlsAreDisabled} sortPackOrder={sortPackOrder} />
        <MinimumDistanceSlider
          disabled={controlsAreDisabled}
          minValue={minCardsCount}
          maxValue={maxCardsCount}
          onRangeChange={handleSliderChange}
        />
        <div>
          <SuperButton
            disabled={controlsAreDisabled}
            style={isMyPacks ? { backgroundColor: 'blue' } : { backgroundColor: 'white' }}
            onClick={() => dispatch(setPersonalPacksParam(true))}
          >
            my
          </SuperButton>
          <SuperButton
            disabled={controlsAreDisabled}
            style={isMyPacks ? { backgroundColor: 'white' } : { backgroundColor: 'blue' }}
            onClick={() => dispatch(setPersonalPacksParam(false))}
          >
            all
          </SuperButton>
        </div>
      </CustomToolbar>*/}
      <CardsContainer>
        {packs.map(p => {
          const date = dayjs(p.updated).format('DD.MM.YYYY HH:mm')

          return (
            <CardPack
              isPrivate={p.private}
              key={p._id}
              packName={p.name}
              totalCards={p.cardsCount}
              lastUpdated={date}
              creator={p.user_name}
              isMyPack={profile._id === p.user_id}
              packId={p._id}
              openCardPack={() => navigate(`/${PATH.CARDS}/${p._id}`)}
            />
          )
        })}
      </CardsContainer>
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
