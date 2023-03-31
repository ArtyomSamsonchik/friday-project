import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'

import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { useNavigate, useParams } from 'react-router-dom'

import { PATH, URL_PARAMS } from '../../../app/path'
import { BackLink } from '../../../common/components/BackLink'
import { CustomContainer } from '../../../common/components/CustomContainer'
import { FilledButton } from '../../../common/components/FilledButton'
import { PaginationBar } from '../../../common/components/Pagination/PaginationBar'
import { ToolBarHeader } from '../../../common/components/toolBar/ToolBarHeader/ToolBarHeader'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { useDebounce } from '../../../utils/hooks/useDebounce'
import { selectProfile } from '../../profile/profile-slice'
import {
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

import { EditorAddCardModal } from './EditorAddCardModal/EditorAddCardModal'
import { QuestionCardsList } from './QuestionCardsList'

export const CardsPage = () => {
  const profile = useAppSelector(selectProfile)
  const cardsUserId = useAppSelector(selectCardsUserId)
  const cardsTotalCount = useAppSelector(selectCardsTotalCount)
  const cardItemsPerPage = useAppSelector(selectCardItemsPerPage)
  const cardsCurrentPage = useAppSelector(selectCardsCurrentPage)
  const packName = useAppSelector(selectPackName)
  const cardSearchName = useAppSelector(selectCardSearchName)
  const debouncedCardSearchName = useDebounce(cardSearchName)

  const { packId } = useParams<typeof URL_PARAMS.PACK_ID>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    if (packId) {
      dispatch(fetchCardsTC({ cardsPack_id: packId }))
    }

    return () => {
      dispatch(cleanCards())
    }
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

  const startLearning = () => {
    if (packId) {
      navigate(`/${PATH.CARDS}/${packId}/${PATH.LEARN}`, { state: cardsTotalCount })
    }
  }

  const isMyPack = profile._id === cardsUserId

  const handleModalClose = useCallback(() => {
    setModalIsOpen(false)
  }, [])

  const handleHeaderButtonClick = () => {
    if (isMyPack) setModalIsOpen(true)
    else startLearning()
  }

  return (
    <CustomContainer sx={{ mb: 9 }}>
      <BackLink title="Back to Packs List" to={`/${PATH.PACKS}`} />

      <div className="toolBar">
        <ToolBarHeader>
          <h3>{cardsTotalCount ? packName : 'Pack is empty'}</h3>
          <FilledButton onClick={handleHeaderButtonClick}>
            {isMyPack ? 'Add new card' : 'Learn to pack'}
          </FilledButton>
        </ToolBarHeader>
        <Stack alignItems="flex-start" gap={2.5}>
          {cardsTotalCount ? (
            <TextField value={cardSearchName} onChange={handleSearchNameChange} />
          ) : (
            <div>˚‧º·(˚ ˃̣̣̥᷄⌓˂̣̣̥᷅ )‧º·˚</div>
          )}
        </Stack>
      </div>

      <QuestionCardsList />
      <PaginationBar
        pagesCount={Math.ceil(cardsTotalCount / cardItemsPerPage)}
        itemsPerPage={cardItemsPerPage}
        onPageChange={changePageHandler}
        onItemsCountChange={changeItemsPerPageHandler}
      />
      <EditorAddCardModal
        isOpen={modalIsOpen}
        title="Add new card"
        onClose={handleModalClose}
        cardId=""
        packId={packId as string}
      />
    </CustomContainer>
  )
}

// TODO: think about error handling when packId from URL is invalid.
//  Also think about potential error when passing packId as string to modal
//  when id is invalid or empty (add loader to page?).
