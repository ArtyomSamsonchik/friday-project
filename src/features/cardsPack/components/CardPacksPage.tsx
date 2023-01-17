import React, { ChangeEvent, useEffect } from 'react'

import TextField from '@mui/material/TextField'

import { BackLink } from '../../../common/components/BackLink'
import { CardsContainer } from '../../../common/components/CardsContainer'
import { FilledButton } from '../../../common/components/FilledButton'
import { useAppDispatch, useAppSelector, useDebounce } from '../../../utils/hooks'
import { selectProfile } from '../../profile/profile-slice'
import { fetchCardPacksTC, selectAllPacks, setPackSearchName } from '../cards-pack-slice'

import { CardPack } from './cardPack/CardPack'

export const CardPacksPage = () => {
  const packs = useAppSelector(selectAllPacks)
  const packSearchName = useAppSelector(state => state.cardPacks.packSearchName)
  const profile = useAppSelector(selectProfile)
  const dispatch = useAppDispatch()
  const debouncedTitle = useDebounce(packSearchName)

  useEffect(() => {
    dispatch(fetchCardPacksTC())
  }, [debouncedTitle])

  const handleLoadPacksClick = () => {
    dispatch(fetchCardPacksTC())
  }

  const handleSearchNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPackSearchName(e.currentTarget.value))
  }

  return (
    <>
      {/*Toolbar with search, range slider, personal cards' toggle switch, filter reset etc*/}
      <BackLink title="test link to profile" to="/profile" />
      <TextField value={packSearchName} onChange={handleSearchNameChange} />
      <FilledButton onClick={handleLoadPacksClick}>load card packs</FilledButton>
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
