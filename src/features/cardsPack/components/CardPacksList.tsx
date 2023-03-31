import React, { FC, useCallback, useState } from 'react'

import { shallowEqual } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../app/path'
import { CardsContainer } from '../../../common/components/CardsContainer'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { selectAllPacksIds } from '../cards-pack-selectors'

import { CardPack } from './cardPack/CardPack'
import { DeletePackModal } from './DeletePackModal/DeletePackModal'
import { EditorAddPackModal } from './EditorAddPackModal/EditorAddPackModal'

export type ModalStatus = 'editing' | 'deleting' | 'inactive'

export const CardPacksList: FC = () => {
  const packIds = useAppSelector(selectAllPacksIds, shallowEqual)
  const navigate = useNavigate()

  const [modalStatus, setModalStatus] = useState<ModalStatus>('inactive')
  const [packId, setPackId] = useState('')

  const handleOpenPack = useCallback((packId: string) => {
    navigate(`/${PATH.CARDS}/${packId}`)
  }, [])

  const openEditModal = useCallback((packId: string) => {
    setModalStatus('editing')
    setPackId(packId)
  }, [])

  const openDeleteModal = useCallback((packId: string) => {
    setModalStatus('deleting')
    setPackId(packId)
  }, [])

  const closeModal = useCallback(() => setModalStatus('inactive'), [])

  return (
    <>
      <CardsContainer>
        {packIds.map(packId => (
          <CardPack
            key={packId}
            packId={packId}
            onOpenCardPack={handleOpenPack}
            onEditCardPack={openEditModal}
            onDeleteCardPack={openDeleteModal}
          />
        ))}
      </CardsContainer>
      <EditorAddPackModal
        key={packId}
        title="Edit Pack"
        isOpen={modalStatus === 'editing'}
        packId={packId}
        onClose={closeModal}
      />
      <DeletePackModal
        title="Delete Pack"
        isOpen={modalStatus === 'deleting'}
        packId={packId}
        onClose={closeModal}
      />
    </>
  )
}

//TODO: replace shallowEqual with reselect in future
