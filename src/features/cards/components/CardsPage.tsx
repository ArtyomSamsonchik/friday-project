import React, { ChangeEvent, useCallback, useEffect } from 'react'

import TextField from '@mui/material/TextField'
import { useParams } from 'react-router-dom'

import { PATH } from '../../../app/path'
import { BackLink } from '../../../common/components/BackLink'
import { CardsContainer } from '../../../common/components/CardsContainer'
import { CustomContainer } from '../../../common/components/CustomContainer'
import { CustomToolbar } from '../../../common/components/CustomToolbar'
import { PaginationBar } from '../../../common/components/Pagination/PaginationBar'
import { useAppDispatch, useAppSelector, useDebounce } from '../../../utils/hooks'
import { selectProfile } from '../../profile/profile-slice'
import {
  selectAllCards,
  selectCardItemsPerPage,
  selectCardsCurrentPage,
  selectCardSearchName,
  selectCardsTotalCount,
  selectCardsUserId,
} from '../cards-selectors'
import {
  fetchCardsTC,
  setCardItemsPerPage,
  setCardsSearchName,
  setCurrentCardsPage,
} from '../cards-slice'

import { QuestionCard } from './QuestionCard'

export const CardsPage = () => {
  const cards = useAppSelector(selectAllCards)
  const profile = useAppSelector(selectProfile)
  const cardsUserId = useAppSelector(selectCardsUserId)
  const cardsTotalCount = useAppSelector(selectCardsTotalCount)
  const cardItemsPerPage = useAppSelector(selectCardItemsPerPage)
  const cardsCurrentPage = useAppSelector(selectCardsCurrentPage)

  const cardSearchName = useAppSelector(selectCardSearchName)
  const debouncedCardSearchName = useDebounce(cardSearchName)

  const { packId } = useParams<'packId'>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCardsTC(packId as string))
  }, [debouncedCardSearchName, cardItemsPerPage, cardsCurrentPage])

  const handleSearchNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCardsSearchName(e.currentTarget.value))
  }

  const changePageHandler = useCallback((event: ChangeEvent<unknown>, page: number) => {
    dispatch(setCurrentCardsPage(page))
  }, [])

  const changeItemsPerPageHandler = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCardItemsPerPage(+event.target.value))
  }, [])

  const isMyPack = profile._id === cardsUserId

  return (
    <CustomContainer>
      <BackLink title="Back to Packs List" to={`/${PATH.PACKS}`} />
      <CustomToolbar
        title={isMyPack ? 'My Pack' : "Friend's Pack"}
        actionButtonName={isMyPack ? 'Add new card' : 'Learn to pack'}
        onActionButtonClick={() => {}}
      >
        <TextField value={cardSearchName} onChange={handleSearchNameChange} />
      </CustomToolbar>
      <CardsContainer>
        {cards.map(c => (
          <QuestionCard
            key={c._id}
            question={c.question}
            answer={c.answer}
            isMyCard={isMyPack}
            lastUpdated={c.updated}
            rating={c.rating}
          />
        ))}
      </CardsContainer>
      <PaginationBar
        pagesCount={Math.ceil(cardsTotalCount / cardItemsPerPage)}
        itemsPerPage={cardItemsPerPage}
        onPageChange={changePageHandler}
        onItemsCountChange={changeItemsPerPageHandler}
      />
    </CustomContainer>
  )
}
