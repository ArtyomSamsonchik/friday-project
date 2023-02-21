import React, { ChangeEvent, useCallback, useEffect } from 'react'

import TextField from '@mui/material/TextField'
import { useNavigate, useParams } from 'react-router-dom'

import { PATH, URL_PARAMS } from '../../../app/path'
import { BackLink } from '../../../common/components/BackLink'
import { CardsContainer } from '../../../common/components/CardsContainer'
import { CustomContainer } from '../../../common/components/CustomContainer'
import { CustomToolbar } from '../../../common/components/CustomToolbar'
import { PaginationBar } from '../../../common/components/Pagination/PaginationBar'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { useDebounce } from '../../../utils/hooks/useDebounce'
import { selectProfile } from '../../profile/profile-slice'
import {
  selectAllCards,
  selectCardItemsPerPage,
  selectCardsCurrentPage,
  selectCardSearchName,
  selectCardsTotalCount,
  selectCardsUserId,
  selectPackName,
} from '../cards-selectors'
import {
  cleanCards,
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
  const packName = useAppSelector(selectPackName)
  const cardSearchName = useAppSelector(selectCardSearchName)
  const debouncedCardSearchName = useDebounce(cardSearchName)
  const pageCount = useAppSelector(selectCardItemsPerPage)
  const { packId } = useParams<typeof URL_PARAMS.PACK_ID>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  console.log(pageCount, cardsTotalCount)
  console.log(useParams())
  useEffect(() => {
    if (cardsTotalCount === 0) {
      navigate(`/${PATH.CARDS}/${packId}/${PATH.EMPTY}`)
    }
  }, [cardsTotalCount])

  useEffect(() => {
    console.log('cardspage')
    if (packId) {
      dispatch(fetchCardsTC({ cardsPack_id: packId, pageCount }))
    }

    return () => {
      dispatch(cleanCards())
    }
  }, [debouncedCardSearchName, cardsCurrentPage, cardItemsPerPage])

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
    <CustomContainer sx={{ mb: 9 }}>
      <BackLink title="Back to Packs List" to={`/${PATH.PACKS}`} />
      <CustomToolbar
        title={packName}
        actionButtonName={isMyPack ? 'Add new card' : 'Learn to pack'}
        onActionButtonClick={() => {}}
      >
        <TextField value={cardSearchName} onChange={handleSearchNameChange} />
      </CustomToolbar>
      <CardsContainer>
        {cards.length ? (
          cards.map(c => (
            <QuestionCard
              key={c._id}
              question={c.question}
              answer={c.answer}
              isMyCard={isMyPack}
              lastUpdated={c.updated}
              rating={c.grade}
            />
          ))
        ) : (
          <div>˚‧º·(˚ ˃̣̣̥᷄⌓˂̣̣̥᷅ )‧º·˚</div>
        )}
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
