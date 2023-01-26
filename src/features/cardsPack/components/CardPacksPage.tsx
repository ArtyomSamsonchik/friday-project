import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'

import TextField from '@mui/material/TextField'
import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../app/path'
import { BackLink } from '../../../common/components/BackLink'
import { CardsContainer } from '../../../common/components/CardsContainer'
import { CustomContainer } from '../../../common/components/CustomContainer'
import { CustomToolbar } from '../../../common/components/CustomToolbar'
import { AddPackModal } from '../../../common/components/Modals/AddPackModal/AddPackModal'
import { PaginationBar } from '../../../common/components/Pagination/PaginationBar'
import { MinimumDistanceSlider } from '../../../common/components/RangeSlider'
import { SuperButton } from '../../../common/components/shared/SuperButton/SuperButton'
import { SortPacks } from '../../../common/components/SortPacks/SortPacks'
import { SortPackButton } from '../../../common/components/SortPacks/SortPacksButton'
import { useAppDispatch, useAppSelector, useDebounce } from '../../../utils/hooks'
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

  const packSearchName = useAppSelector(selectPackSearchName)
  const debouncedPackSearchName = useDebounce(packSearchName)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [showSort, setShowSort] = useState(false)

  useEffect(() => {
    dispatch(DEPRECATED_fetchCardPacksTC())
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
      {/*Toolbar with search, range slider, personal cards' toggle switch, filter reset etc*/}
      <BackLink title="test link to profile" to="/profile" />
      <CustomToolbar
        title="Packs List"
        actionButtonName="Add new Pack"
        onActionButtonClick={() => {}}
      >
        <TextField value={packSearchName} onChange={handleSearchNameChange} />
        <AddPackModal handleLoadPacksClick={handleLoadPacksClick} />
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
      </CustomToolbar>
      <div style={{ textAlign: 'center' }} onClick={() => setShowSort(!showSort)}>
        <h3>sort params</h3>
      </div>
      {showSort && <SortPacks sortPackOrder={sortPackOrder} />}
      <SortPackButton sortPackOrder={sortPackOrder} />
      <CardsContainer>
        {packs.map(p => (
          <CardPack
            isPrivate={p.private}
            key={p._id}
            packName={p.name}
            totalCards={p.cardsCount}
            lastUpdated={p.updated}
            creator={p.user_name}
            isMyPack={profile._id === p.user_id}
            packId={p._id}
            openCardPack={() => navigate(`/${PATH.CARDS}/${p._id}`)}
          />
        ))}
      </CardsContainer>
      <PaginationBar
        pagesCount={Math.ceil(cardPacksTotalCount / itemsPerPage)}
        itemsPerPage={itemsPerPage}
        onPageChange={changePageHandler}
        onItemsCountChange={changeItemsPerPageHandler}
      />
    </CustomContainer>
  )
}
