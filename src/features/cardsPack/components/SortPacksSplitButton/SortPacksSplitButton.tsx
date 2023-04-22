import React, { FC, memo, useState } from 'react'

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import Box from '@mui/material/Box'

import { DropdownListSplitButton } from '../../../../common/components/DropdownListSplitButton/DropdownListSplitButton'
import { uncapitalizeAndSplit } from '../../../../utils/helpers/uncapitalizeAndSplit'
import { SortPacksParams } from '../../card-packs-api'

type SortPacksSplitButtonProps = {
  disabled?: boolean
  sortPackOrder: string
  onSortChange: (sortParams: SortPacksParams) => void
}

const options: SortPacksParams['column'][] = ['updated', 'name', 'cardsCount', 'created']
const menuItemNames = options.slice().map(uncapitalizeAndSplit)

export const SortPacksSplitButton: FC<SortPacksSplitButtonProps> = memo(props => {
  const { disabled, sortPackOrder, onSortChange } = props

  const selectedColumn = sortPackOrder.slice(1) as SortPacksParams['column']
  const isAscending = sortPackOrder.includes('1')

  const [selectedIndex, setSelectedIndex] = useState(() => {
    const index = options.indexOf(selectedColumn)

    return index === -1 ? 0 : index
  })

  const toggleSortOrder = () => {
    onSortChange({
      order: isAscending ? 'desc' : 'asc',
      column: options[selectedIndex],
    })
  }

  const handleMenuItemClick = (index: number) => {
    setSelectedIndex(index)
    onSortChange({
      order: isAscending ? 'asc' : 'desc',
      column: options[index],
    })
  }

  return (
    <DropdownListSplitButton
      disabled={disabled}
      options={menuItemNames}
      selectedIndex={selectedIndex}
      onActionButtonClick={toggleSortOrder}
      onMenuItemClick={handleMenuItemClick}
    >
      <Box component="span" display="flex" gap="5px">
        {menuItemNames[selectedIndex]}
        {isAscending ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </Box>
    </DropdownListSplitButton>
  )
})
