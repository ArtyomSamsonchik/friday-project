import React, { useMemo, useState } from 'react'

import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../app/path'
import { CardsContainer } from '../../../common/components/CardsContainer'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { selectProfile } from '../../profile/profile-slice'
import { CardPackType } from '../card-packs-api'
import { selectAllPacks } from '../cards-pack-selectors'

import { CardPack } from './cardPack/CardPack'
import { EditorAddPackAlternativeModal } from './EditorAddPackAlternativeModal'

export const CardPacksList = () => {
  const packs = useAppSelector(selectAllPacks)
  const profile = useAppSelector(selectProfile)
  const navigate = useNavigate()

  const [modalStatus, setModalStatus] = useState<'editing' | 'deleting' | null>(null)
  const [packId, setPackId] = useState('')

  const packName = useMemo(
    () => (packs.find(p => p._id === packId) as CardPackType)?.name || '',
    [packs, packId]
  )

  const handleOpenCardPack = (packId: string) => {
    navigate(`/${PATH.CARDS}/${packId}`)
  }

  const openEditModal = (packId: string) => {
    setModalStatus('editing')
    setPackId(packId)
  }

  const openDeleteModal = (packId: string) => {
    setModalStatus('deleting')
    setPackId(packId)
  }

  return (
    <>
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
              onOpenCardPack={() => handleOpenCardPack(p._id)}
              onEditCardPack={() => openEditModal(p._id)}
              onDeleteCardPack={() => openDeleteModal(p._id)}
            />
          )
        })}
      </CardsContainer>
      <EditorAddPackAlternativeModal
        title="Edit pack"
        open={modalStatus === 'editing'}
        packName={packName}
        packId={packId}
        onClose={() => setModalStatus(null)}
      />
    </>
  )
}
