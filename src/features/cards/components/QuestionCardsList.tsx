import React, { FC, useCallback, useState } from 'react'

import { shallowEqual } from 'react-redux'
import { useParams } from 'react-router-dom'

import { URL_PARAMS } from '../../../app/path'
import { CardsContainer } from '../../../common/components/CardsContainer'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { ModalStatus } from '../../cardsPack/components/CardPacksList'
import { selectAllCardsIds } from '../cards-selectors'

import { DeleteCardModal } from './DeleteCardModal/DeleteCardModal'
import { EditorAddCardModal } from './EditorAddCardModal/EditorAddCardModal'
import { QuestionCard } from './QuestionCard'

export const QuestionCardsList: FC = () => {
  const cardIds = useAppSelector(selectAllCardsIds, shallowEqual)
  const { packId } = useParams<typeof URL_PARAMS.PACK_ID>()

  const [modalStatus, setModalStatus] = useState<ModalStatus>('inactive')
  const [cardId, setCardId] = useState('')

  const openEditModal = useCallback((cardId: string) => {
    setModalStatus('editing')
    setCardId(cardId)
  }, [])

  const openDeleteModal = useCallback((cardId: string) => {
    setModalStatus('deleting')
    setCardId(cardId)
  }, [])

  const closeModal = useCallback(() => {
    setModalStatus('inactive')
  }, [])

  return (
    <>
      <CardsContainer>
        {cardIds.map(cardId => (
          <QuestionCard
            key={cardId}
            cardId={cardId}
            onEditCard={openEditModal}
            onDeleteCard={openDeleteModal}
          />
        ))}
      </CardsContainer>
      <EditorAddCardModal
        key={cardId}
        isOpen={modalStatus === 'editing'}
        title="Edit Card"
        onClose={closeModal}
        cardId={cardId}
        packId={packId as string}
      />
      <DeleteCardModal
        isOpen={modalStatus === 'deleting'}
        title="Delete Card"
        onClose={closeModal}
        packId={packId as string}
        cardId={cardId}
      />
    </>
  )
}

// TODO: add packId = undefined check, maybe separate page
