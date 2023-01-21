import React, { memo } from 'react'

import { NativeSelectInputProps } from '@mui/material/NativeSelect/NativeSelectInput'

import s from './PaginationBar.module.css'
import { StyledPagination } from './StyledPagination'
import { StyledSelect } from './StyledSelect'

type PaginationBarPropsType = {
  pagesCount: number
  itemsPerPage: number
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void
  onItemsCountChange: NativeSelectInputProps['onChange']
}
export const PaginationBar = memo((props: PaginationBarPropsType) => {
  const { pagesCount, itemsPerPage, onItemsCountChange, onPageChange } = props

  return (
    <div className={s.paginationBarContainer}>
      <StyledPagination
        count={pagesCount}
        color="primary"
        shape="rounded"
        onChange={onPageChange}
      />
      <div>
        <span>Show </span>
        <StyledSelect
          value={itemsPerPage}
          onChange={onItemsCountChange}
          variant={'standard'}
          size="small"
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <option value={12}>12</option>
          <option value={24}>24</option>
          <option value={36}>36</option>
          <option value={48}>48</option>
        </StyledSelect>
        <span> Cards per Page</span>
      </div>
    </div>
  )
})
