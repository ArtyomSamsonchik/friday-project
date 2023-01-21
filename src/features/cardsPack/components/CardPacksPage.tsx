import React, { ChangeEvent, useCallback, useEffect } from 'react'

import TextField from '@mui/material/TextField'

import { BackLink } from '../../../common/components/BackLink'
import { CardsContainer } from '../../../common/components/CardsContainer'
import { FilledButton } from '../../../common/components/FilledButton'
import { PaginationBar } from '../../../common/components/shared/Pagination/PaginationBar'
import { SuperButton } from '../../../common/components/shared/SuperButton/SuperButton'
import { MinimumDistanceSlider } from '../../../common/components/Slider/Slider'
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
  fetchCardPacksTC,
  selectAllPacks,
  setCurrentPage,
  setItemsPerPage,
  setPackSearchName,
  setPersonalPacksParam,
  updateCardPackTC,
} from '../cards-pack-slice'

import { CardPack } from './cardPack/CardPack'

export const CardPacksPage = () => {
  const packs = useAppSelector(selectAllPacks)
  const packSearchName = useAppSelector(state => state.cardPacks.packSearchName)
  const cardPacksTotalCount = useAppSelector(selectCardPacksTotalCount)
  const itemsPerPage = useAppSelector(selectItemsPerPage)
  const currentPage = useAppSelector(selectCurrentPage)
  const profile = useAppSelector(selectProfile)

  const dispatch = useAppDispatch()
  const debouncedTitle = useDebounce(packSearchName)

  const minMaxSliderRange = useAppSelector(state => state.cardPacks.sliderMinMAxValues)
  const sliderCurrentMAX = useAppSelector(state => state.cardPacks.maxCardsCount)
  const sliderCurrentMIN = useAppSelector(state => state.cardPacks.minCardsCount)
  const isMyPack = useAppSelector(state => state.cardPacks.loadPersonalPacks)
  const sliderCurrent = [sliderCurrentMIN, sliderCurrentMAX]
  const debouncedSliderCurrentValues = useDebounce(JSON.stringify(sliderCurrent))

  useEffect(() => {
    dispatch(fetchCardPacksTC())
  }, [debouncedTitle, itemsPerPage, currentPage, isMyPack, debouncedSliderCurrentValues])

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

  return (
    <>
      {/*Toolbar with search, range slider, personal cards' toggle switch, filter reset etc*/}
      <BackLink title="test link to profile" to="/profile" />
      <TextField value={packSearchName} onChange={handleSearchNameChange} />
      <FilledButton onClick={() => handleLoadPacksClick('New pack')}>add card pack</FilledButton>
      <MinimumDistanceSlider minMaxSliderRange={minMaxSliderRange} sliderCurrent={sliderCurrent} />
      <div>
        <SuperButton onClick={() => dispatch(setPersonalPacksParam(true))}>my</SuperButton>
        <SuperButton onClick={() => dispatch(setPersonalPacksParam(false))}>all</SuperButton>
      </div>
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
