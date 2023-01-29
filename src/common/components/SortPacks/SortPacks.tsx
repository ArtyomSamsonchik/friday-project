import React from 'react'

import { setPacksSortOrder } from '../../../features/cardsPack/cards-pack-slice'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { SuperButton } from '../shared/SuperButton/SuperButton'

type PropsType = {
  sortPackOrder: string
}

export const SortPacks = (props: PropsType) => {
  const dispatch = useAppDispatch()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex' }}>
        <label>sort by name</label>
        <SuperButton
          style={
            props.sortPackOrder === '0name'
              ? { backgroundColor: 'white' }
              : { backgroundColor: 'blue' }
          }
          onClick={() => dispatch(setPacksSortOrder({ column: 'name', order: 'desc' }))}
        >
          A-Z
        </SuperButton>{' '}
        <SuperButton
          style={
            props.sortPackOrder === '1name'
              ? { backgroundColor: 'white' }
              : { backgroundColor: 'blue' }
          }
          onClick={() => dispatch(setPacksSortOrder({ column: 'name', order: 'asc' }))}
        >
          Z-A
        </SuperButton>
        <label>last updated</label>
        <SuperButton
          style={
            props.sortPackOrder === '0updated'
              ? { backgroundColor: 'white' }
              : { backgroundColor: 'blue' }
          }
          onClick={() => dispatch(setPacksSortOrder({ column: 'updated', order: 'desc' }))}
        >
          new
        </SuperButton>{' '}
        <SuperButton
          style={
            props.sortPackOrder === '1updated'
              ? { backgroundColor: 'white' }
              : { backgroundColor: 'blue' }
          }
          onClick={() => dispatch(setPacksSortOrder({ column: 'updated', order: 'asc' }))}
        >
          old
        </SuperButton>
      </div>
      <div>
        <label>cards count</label>
        <SuperButton
          style={
            props.sortPackOrder === '0cardsCount'
              ? { backgroundColor: 'white' }
              : { backgroundColor: 'blue' }
          }
          onClick={() => dispatch(setPacksSortOrder({ column: 'cardsCount', order: 'asc' }))}
        >
          min
        </SuperButton>{' '}
        <SuperButton
          style={
            props.sortPackOrder === '1cardsCount'
              ? { backgroundColor: 'white' }
              : { backgroundColor: 'blue' }
          }
          onClick={() => dispatch(setPacksSortOrder({ column: 'cardsCount', order: 'desc' }))}
        >
          max
        </SuperButton>
        <label>last created</label>
        <SuperButton
          style={
            props.sortPackOrder === '1created'
              ? { backgroundColor: 'white' }
              : { backgroundColor: 'blue' }
          }
          onClick={() => dispatch(setPacksSortOrder({ column: 'created', order: 'asc' }))}
        >
          old
        </SuperButton>{' '}
        <SuperButton
          style={
            props.sortPackOrder === '0created'
              ? { backgroundColor: 'white' }
              : { backgroundColor: 'blue' }
          }
          onClick={() => dispatch(setPacksSortOrder({ column: 'created', order: 'desc' }))}
        >
          new
        </SuperButton>
      </div>
    </div>
  )
}
