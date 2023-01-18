import React, { memo, useState } from 'react'

import { GetCardPacksQueryParams } from '../../../features/cardsPack/card-packs-api'
import {
  DEPRECATED_fetchCardPacksTC,
  selectAllPacks,
} from '../../../features/cardsPack/cards-pack-slice'
import { CardPack } from '../../../features/cardsPack/components/cardPack/CardPack'
import { selectProfile } from '../../../features/profile/profile-slice'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks'
import commonS from '../../styles/common.module.css'
import { CardsContainer } from '../CardsContainer'
import { CustomContainer } from '../CustomContainer'
import { OutlinedButton } from '../shared/OutlinedButton'
import { SuperButton } from '../shared/SuperButton/SuperButton'
import { SuperCheckbox } from '../shared/SuperCheckbox/SuperCheckbox'
import { SuperInputText } from '../shared/SuperInputText/SuperInputText'
import { SuperRadio } from '../shared/SuperRadio/SuperRadio'
import { SuperSelect } from '../shared/SuperSelect/SuperSelect'
import { MinimumDistanceSlider } from '../Slider/Slider'

import s from './Test.module.css'

export const Test = memo(() => {
  const options = ['x', 'y', 'z']
  const [selected, setSelected] = useState(options[1])
  const cards = useAppSelector(selectAllPacks)
  const profile = useAppSelector(selectProfile)
  const dispatch = useAppDispatch()
  const [isMyPack, setIsMyPack] = useState(false)
  const [showNew, setShowNew] = useState(true)
  const [value1, setValue1] = useState<number[]>([0, 110])

  const currentParams: GetCardPacksQueryParams = {
    min: value1[0],
    max: value1[1],
    sortPacks: showNew ? '0updated' : '1updated',
    user_id: isMyPack ? profile._id : '',
  }

  const sort = () => {
    dispatch(DEPRECATED_fetchCardPacksTC(currentParams))
  }
  /*const myOrAllPacks = (belongsPacks: string) => {
                                        if (belongsPacks === 'my') {
                                          setIsMyPack(true)
                                          sort({ user_id: profile._id, min: value1[0], max: value1[1] })
                                        } else {
                                          setIsMyPack(false)
                                          sort({ min: value1[0], max: value1[1] })
                                        }
                                      }*/

  return (
    <div className={commonS.demo}>
      <h1>Super components demo</h1>
      <h3>Super button</h3>
      <div className={s.container}>
        <SuperButton onClick={() => dispatch(DEPRECATED_fetchCardPacksTC())}>button</SuperButton>
        <SuperButton red>red button</SuperButton>
        <SuperButton disabled>disabled</SuperButton>
        <OutlinedButton>button</OutlinedButton>
      </div>
      <div>
        <SuperButton
          style={isMyPack ? { backgroundColor: 'blue' } : { backgroundColor: 'white' }}
          onClick={() => setIsMyPack(true)}
        >
          my
        </SuperButton>
        <SuperButton
          style={isMyPack ? { backgroundColor: 'white' } : { backgroundColor: 'blue' }}
          onClick={() => setIsMyPack(false)}
        >
          all
        </SuperButton>
      </div>
      <SuperButton style={{ backgroundColor: 'blue' }} onClick={() => setShowNew(!showNew)}>
        {showNew ? 'show old' : 'show new'}
      </SuperButton>
      <MinimumDistanceSlider
        sort={sort}
        isMyPack={isMyPack}
        value1={value1}
        setValue1={setValue1}
        showNew={showNew}
      />
      <h3>Cards</h3>
      <CustomContainer>
        <CardsContainer>
          <CardPack
            packName={'Test card pack'}
            totalCards={20}
            lastUpdated={'14.01.2023'}
            creator={'Artyom'}
            isMyPack={true}
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
          {cards.map(c => (
            <CardPack
              key={c._id}
              packName={c.name}
              totalCards={c.cardsCount}
              lastUpdated={c.updated}
              creator={c.user_name}
              isMyPack={profile._id === c.user_id}
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
      </CustomContainer>
      <h3>Super checkbox</h3>
      <div className={s.container}>
        <SuperCheckbox />
        <SuperCheckbox />
        <SuperCheckbox />
      </div>
      <h3>Super select</h3>
      <div className={s.container}>
        <SuperSelect options={options} value={selected} onChangeOption={setSelected} />
      </div>
      <h3>Super radio</h3>
      <div className={s.container}>
        <SuperRadio name="radio" options={options} value={selected} onChangeOption={setSelected} />
      </div>
      <h3>Super input</h3>
      <div className={s.container}>
        <SuperInputText placeholder="Input some text" />
      </div>
    </div>
  )
})
