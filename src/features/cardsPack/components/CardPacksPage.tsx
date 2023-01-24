import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'

import TextField from '@mui/material/TextField'

import { BackLink } from '../../../common/components/BackLink'
import { CardsContainer } from '../../../common/components/CardsContainer'
import { FilledButton } from '../../../common/components/FilledButton'
import { AddPackModal } from '../../../common/components/Modals/AddPackModal/AddPackModal'
import { BasicModal } from '../../../common/components/Modals/BasicModal/BasicModal'
import { PaginationBar } from '../../../common/components/Pagination/PaginationBar'
import { MinimumDistanceSlider } from '../../../common/components/RangeSlider'
import { SuperButton } from '../../../common/components/shared/SuperButton/SuperButton'
import { SortPacks } from '../../../common/components/SortPacks/SortPacks'
import {
  selectCardPacksTotalCount,
  selectCurrentPage,
  selectItemsPerPage,
} from '../../../selectors/cardsPackSelectors'
import { useAppDispatch, useAppSelector, useDebounce } from '../../../utils/hooks'
import { selectProfile } from '../../profile/profile-slice'
import {
  addCardPackTC,
  deleteCardPackTC,
  DEPRECATED_fetchCardPacksTC,
  selectAllPacks,
  selectIsMyPacks,
  selectMaxCardsCount,
  selectMinCardsCount,
  selectPackOrder,
  selectSearchPackName,
  setCurrentPage,
  setItemsPerPage,
  setPackSearchName,
  setPersonalPacksParam,
  updateCardPackTC,
} from '../cards-pack-slice'

import { CardPack } from './cardPack/CardPack'

export const CardPacksPage = () => {
  const packs = useAppSelector(selectAllPacks)
  const cardPacksTotalCount = useAppSelector(selectCardPacksTotalCount)
  const itemsPerPage = useAppSelector(selectItemsPerPage)
  const currentPage = useAppSelector(selectCurrentPage)
  const profile = useAppSelector(selectProfile)
  const sortPackOrder = useAppSelector(selectPackOrder)
  const isMyPacks = useAppSelector(selectIsMyPacks)
  const minCardsCount = useAppSelector(selectMinCardsCount)
  const maxCardsCount = useAppSelector(selectMaxCardsCount)

  const packSearchName = useAppSelector(selectSearchPackName)
  const debouncedTitle = useDebounce(packSearchName)

  const dispatch = useAppDispatch()

  const [showSort, setShowSort] = useState(false)

  useEffect(() => {
    dispatch(DEPRECATED_fetchCardPacksTC())
  }, [debouncedTitle, itemsPerPage, currentPage, isMyPacks, sortPackOrder])

  const handleLoadPacksClick = (name: string) => {
    dispatch(addCardPackTC({ name }))
  }

  const handleSearchNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPackSearchName(e.currentTarget.value))
  }

  const changePageHandler = useCallback(
    (event: ChangeEvent<unknown>, page: number) => {
      dispatch(setCurrentPage(page))
    },
    [dispatch]
  )

  const changeItemsPerPageHandler = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      dispatch(setItemsPerPage(+event.target.value))
    },
    [dispatch]
  )

  const handleSliderChange = useCallback((min: number, max: number) => {
    dispatch(DEPRECATED_fetchCardPacksTC({ min, max }))
  }, [])

  return (
    <>
      {/*Toolbar with search, range slider, personal cards' toggle switch, filter reset etc*/}
      <BackLink title="test link to profile" to="/profile" />
      <TextField value={packSearchName} onChange={handleSearchNameChange} />
      {/*<FilledButton onClick={() => handleLoadPacksClick('New pack')}>add card pack</FilledButton>*/}
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
      <div style={{ textAlign: 'center' }} onClick={() => setShowSort(!showSort)}>
        <h3>sort params</h3>
      </div>
      {showSort && <SortPacks sortPackOrder={sortPackOrder} />}

      <CardsContainer>
        {packs.map(p => (
          <CardPack
            key={p._id}
            packName={p.name}
            totalCards={p.cardsCount}
            lastUpdated={p.updated}
            creator={p.user_name}
            isMyPack={profile._id === p.user_id}
            openCardPack={() => {
              alert('opened pack')
            }}
            deleteCardPack={() => {
              dispatch(deleteCardPackTC(p._id))
            }}
            editCardPack={() => {
              dispatch(updateCardPackTC(p._id, 'Updated pack'))
            }}
          />
        ))}
      </CardsContainer>
      <PaginationBar
        pagesCount={Math.ceil(cardPacksTotalCount / itemsPerPage)}
        itemsPerPage={itemsPerPage}
        onPageChange={changePageHandler}
        onItemsCountChange={changeItemsPerPageHandler}
      />
    </>
  )
}
