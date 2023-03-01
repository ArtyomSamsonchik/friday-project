import React, { ChangeEvent, useCallback, useEffect } from 'react'

import { selectAppStatus } from '../../../app/app-slice'
import { BackLink } from '../../../common/components/BackLink'
import { CustomContainer } from '../../../common/components/CustomContainer'
import { PaginationBar } from '../../../common/components/Pagination/PaginationBar'
import { ToolBar } from '../../../common/components/toolBar/ToolBar/ToolBar'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppQueryParams } from '../../../utils/hooks/useAppQueryParams'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { GetCardPacksQueryParams } from '../card-packs-api'
import {
  selectCurrentPage,
  selectItemsPerPage,
  selectPacksTotalCount,
} from '../cards-pack-selectors'
import { cleanPacks, DEPRECATED_fetchCardPacksTC, setCurrentPackPage } from '../cards-pack-slice'

import { CardPacksList } from './CardPacksList'

export const CardPacksPage = () => {
  const [appQueryParams, setAppQueryParams] = useAppQueryParams<GetCardPacksQueryParams>({
    page: '1',
    pageCount: '12',
  })

  const cardPacksTotalCount = useAppSelector(selectPacksTotalCount)
  const itemsPerPage = useAppSelector(selectItemsPerPage)
  const currentPage = useAppSelector(selectCurrentPage)
  const appStatus = useAppSelector(selectAppStatus)

  const dispatch = useAppDispatch()

  const controlsAreDisabled = appStatus === 'loading'

  useEffect(() => {
    dispatch(DEPRECATED_fetchCardPacksTC(appQueryParams))

    return () => {
      dispatch(cleanPacks())
    }
  }, [appQueryParams])

  const changePageHandler = (event: ChangeEvent<unknown>, currentPage: number) => {
    dispatch(setCurrentPackPage(currentPage))

    //setAppQueryParams('page', currentPage)
  }

  const changeItemsPerPageHandler = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      //dispatch(setPackItemsPerPage(+event.target.value))
      setAppQueryParams({ pageCount: event.target.value })
    },
    [dispatch, appQueryParams]
  )

  return (
    <CustomContainer sx={{ mb: 9 }}>
      <BackLink title="test link to profile" to="/profile" />
      <ToolBar />
      <CardPacksList />
      <PaginationBar
        pagesCount={Math.ceil(cardPacksTotalCount / itemsPerPage)}
        disabled={controlsAreDisabled}
        itemsPerPage={itemsPerPage}
        onPageChange={changePageHandler}
        onItemsCountChange={changeItemsPerPageHandler}
      />
    </CustomContainer>
  )
}

//TODO: Separate PacksList and Toolbar to different components
//  to prevent unnecessary renders
// TODO: delete from state currentPage itemsPPage searchName order
// TODO: disable toolbar controls when appStatus isLoading
