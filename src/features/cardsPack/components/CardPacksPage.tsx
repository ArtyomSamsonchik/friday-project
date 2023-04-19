import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { selectAppStatus } from '../../../app/app-slice'
import { BackLink } from '../../../common/components/BackLink'
import { CustomContainer } from '../../../common/components/CustomContainer'
import { PaginationBar } from '../../../common/components/Pagination/PaginationBar'
import { ToolBar } from '../../../common/components/toolBar/ToolBar/ToolBar'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { StringifiedRecord, useAppQueryParams } from '../../../utils/hooks/useAppQueryParams'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { GetCardPacksQueryParams } from '../card-packs-api'
import { selectPacksTotalCount } from '../cards-pack-selectors'
import { cleanPacks, fetchCardPacksTC } from '../cards-pack-slice'

import { CardPacksList } from './CardPacksList'
import { EditorAddPackModal } from './EditorAddPackModal/EditorAddPackModal'

type PacksSearchParams = Pick<StringifiedRecord<GetCardPacksQueryParams>, 'page' | 'pageCount'>

const DEFAULT_PAGE = 1
const DEFAULT_ITEMS_PER_PAGE = 12

export const CardPacksPage = () => {
  const [queryParams, setQueryParams] = useAppQueryParams<PacksSearchParams>()

  const itemsPerPage = Number(queryParams.pageCount || DEFAULT_ITEMS_PER_PAGE)
  const currentPage = Number(queryParams.page || DEFAULT_PAGE)

  const cardPacksTotalCount = useAppSelector(selectPacksTotalCount)
  // const itemsPerPage = useAppSelector(selectItemsPerPage)
  // const currentPage = useAppSelector(selectCurrentPage)
  const appStatus = useAppSelector(selectAppStatus)

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const dispatch = useAppDispatch()

  const controlsAreDisabled = appStatus === 'loading'

  useEffect(() => {
    dispatch(fetchCardPacksTC(queryParams as GetCardPacksQueryParams))

    return () => {
      dispatch(cleanPacks())
    }
  }, [queryParams])

  const changePageHandler = useCallback(
    (event: ChangeEvent<unknown>, page: number) => {
      // dispatch(setCurrentPackPage(currentPage))
      setQueryParams({ page: page + '' })
    },
    [dispatch]
  )

  const changeItemsPerPageHandler = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      //dispatch(setPackItemsPerPage(+event.target.value))
      setQueryParams({ pageCount: event.target.value })
    },
    [dispatch]
  )

  const handleModalClose = useCallback(() => {
    setModalIsOpen(false)
  }, [])

  return (
    <CustomContainer sx={{ mb: 9 }}>
      <BackLink title="test link to profile" to="/profile" />
      <ToolBar />
      <CardPacksList />
      <PaginationBar
        page={currentPage}
        pagesCount={Math.ceil(cardPacksTotalCount / itemsPerPage)}
        disabled={controlsAreDisabled}
        itemsPerPage={itemsPerPage}
        onPageChange={changePageHandler}
        onItemsCountChange={changeItemsPerPageHandler}
      />
      <EditorAddPackModal
        isOpen={modalIsOpen}
        title="Add new pack"
        onClose={handleModalClose}
        packId=""
      />
    </CustomContainer>
  )
}

//TODO: Separate PacksList and Toolbar to different components
//  to prevent unnecessary renders
