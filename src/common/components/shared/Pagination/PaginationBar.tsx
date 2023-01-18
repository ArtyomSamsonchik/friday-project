import React, { ChangeEvent, memo, useCallback, useEffect } from 'react'

import {
  fetchCardPacksTC,
  setCurrentPage,
  setItemsPerPage,
} from '../../../../features/cardsPack/cards-pack-slice'
import { useAppDispatch } from '../../../../utils/hooks'

import s from './PaginationBar.module.css'
import { StyledPagination } from './StyledPagination'
import { StyledSelect } from './StyledSelect'

type PaginationBarPropsType = {
  pagesCount: number
  itemsPerPage: number
  currentPage: number
}
export const PaginationBar = memo(
  ({ pagesCount, itemsPerPage, currentPage }: PaginationBarPropsType) => {
    const pages = Math.ceil(pagesCount / itemsPerPage)
    const dispatch = useAppDispatch()
    const changePageHandler = useCallback(
      (event: ChangeEvent<unknown>, page: number) => {
        dispatch(setCurrentPage(page))
      },
      [dispatch]
    )
    const changeItemsPerPageHandler = useCallback(
      (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setItemsPerPage(+event.target.value))
      },
      [dispatch]
    )

    useEffect(() => {
      dispatch(fetchCardPacksTC())
    }, [pagesCount, itemsPerPage, currentPage])

    return (
      <div className={s.paginationBarContainer}>
        <StyledPagination
          count={pages}
          color="primary"
          shape="rounded"
          onChange={changePageHandler}
        />
        <div>
          <span>Show </span>
          <StyledSelect
            value={itemsPerPage}
            onChange={changeItemsPerPageHandler}
            variant={'standard'}
            size="small"
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <option value={12}>12</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </StyledSelect>
          <span> Cards per Page</span>
        </div>
      </div>
    )
  }
)
