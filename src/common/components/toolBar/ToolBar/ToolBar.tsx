import React, { useCallback, useState } from 'react'

import { AlternativeEditorAddPackModal } from '../../../../features/cardsPack/components/alternativeEditorAddPackModal/AlternativeEditorAddPackModal'
import { FilledButton } from '../../FilledButton'
import { ToolBarHeader } from '../ToolBarHeader/ToolBarHeader'

type ToolBarPropsType = {
  title: string
}
export const ToolBar = (props: ToolBarPropsType) => {
  /* const dispatch = useAppDispatch()

  const packSearchName = useAppSelector(selectPackSearchName)
  const isMyPacks = useAppSelector(selectIsMyPacks)
  const sortPackOrder = useAppSelector(selectPacksSortOrder)
  const minCardsCount = useAppSelector(selectMinCardsCount)
  const maxCardsCount = useAppSelector(selectMaxCardsCount)

  const debouncedPackSearchName = useDebounce(packSearchName)*/

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const handleModalClose = useCallback(() => {
    setModalIsOpen(false)
  }, [])
  /*  const handleSliderChange = useCallback((min: number, max: number) => {
    dispatch(DEPRECATED_fetchCardPacksTC({ min, max }))
  }, [])
  const handleSearchNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPackSearchName(e.currentTarget.value))
  }
  const resetAllFiltersHandler = () => {
    dispatch(setPackItemsPerPage(12))
    dispatch(setPacksSortOrder({ order: 'desc', column: 'updated' }))
    dispatch(setCurrentPackPage(1))
    dispatch(setPersonalPacksParam(false))
    dispatch(setPackSearchName(''))
  }*/

  return (
    <div className={'toolBar'}>
      <ToolBarHeader>
        <h3>{props.title}</h3>
        <FilledButton onClick={() => setModalIsOpen(true)}>Add new pack</FilledButton>
      </ToolBarHeader>
      {/*<div style={{ display: 'flex', gap: '20px' }}>
        <TextField value={packSearchName} onChange={handleSearchNameChange} />
        <CustomToolBarFilters>
          <SortPackButton sortPackOrder={sortPackOrder} />

          <MinimumDistanceSlider
            minValue={minCardsCount}
            maxValue={maxCardsCount}
            onRangeChange={handleSliderChange}
          />
          <div>
            <SuperButton
              style={isMyPacks ? { backgroundColor: 'blue' } : { backgroundColor: 'white' }}
              onClick={() => dispatch(setPersonalPacksParam(true))}
            >
              my
            </SuperButton>
            <SuperButton
              style={isMyPacks ? { backgroundColor: 'white' } : { backgroundColor: 'blue' }}
              onClick={() => dispatch(setPersonalPacksParam(false))}
            >
              all
            </SuperButton>
          </div>
          <Button
            variant="text"
            size={'small'}
            sx={{
              width: 'fit-content',
            }}
            fullWidth={false}
            onClick={resetAllFiltersHandler}
          >
            Reset
          </Button>
        </CustomToolBarFilters>
      </div>*/}
      <AlternativeEditorAddPackModal
        isOpen={modalIsOpen}
        title="Add new pack"
        onClose={handleModalClose}
        packId=""
      />
    </div>
  )
}

// TODO: header change children to diferent props
