import React, { ChangeEvent, useState } from 'react'

import { selectAllPacks } from '../../../../features/cardsPack/cards-pack-slice'
import { useAppSelector } from '../../../../utils/hooks'

import s from './PaginationBar.module.css'
import { StyledPagination } from './StyledPagination'
import { StyledSelect } from './StyledSelect'
export const PaginationBar = () => {
  const packs = useAppSelector(selectAllPacks).length
  const [age, setAge] = useState('')

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setAge(event.target.value)
    console.log(event.target.value)
  }

  return (
    <div className={s.paginationBarContainer}>
      <StyledPagination count={packs} color="primary" shape="rounded" />
      <div>
        <span>Show </span>
        <StyledSelect
          value={age}
          onChange={handleChange}
          variant={'standard'}
          size="small"
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </StyledSelect>
        <span> Cards per Page</span>
      </div>
    </div>
  )
}
