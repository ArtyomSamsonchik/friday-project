import React from 'react'

import { BackLink } from '../../../common/components/BackLink'
import { CardsContainer } from '../../../common/components/CardsContainer'
import { FilledButton } from '../../../common/components/FilledButton'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks'
import { selectProfile } from '../../profile/profile-slice'
import { fetchCardPacksTC, selectAllPacks } from '../cards-pack-slice'

import { CardPack } from './cardPack/CardPack'

export const CardPacksPage = () => {
  const packs = useAppSelector(selectAllPacks)
  const profile = useAppSelector(selectProfile)
  const dispatch = useAppDispatch()

  const handleLoadPacks = () => {
    dispatch(fetchCardPacksTC())
  }

  return (
    <>
      {/*Toolbar with search, range slider, personal cards' toggle switch, filter reset etc*/}
      <BackLink title="test link to profile" to="/profile" />
      <FilledButton onClick={handleLoadPacks}>load card packs</FilledButton>
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
              alert('deleted pack')
            }}
            editCardPack={() => {
              alert('edited pack')
            }}
          />
        ))}
      </CardsContainer>
    </>
  )
}
