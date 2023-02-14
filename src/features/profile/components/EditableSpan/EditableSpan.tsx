import React, { ChangeEvent, KeyboardEvent, FC, useState, memo } from 'react'

import { BorderColorOutlined } from '@mui/icons-material'
import { Box, IconButton, TextField, Typography } from '@mui/material'

import { EditableSpanSaveButton } from './EditableSpanSaveButton'

type EditableSpanProps = {
  children: string
  disabled?: boolean
  changeTitle: (title: string) => void
}
export const EditableSpan: FC<EditableSpanProps> = memo(props => {
  const { children, changeTitle, disabled } = props
  const [title, setTitle] = useState(children)
  const [error, setError] = useState<string | null>('')
  const [editMode, setEditMode] = useState(false)

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(children)
  }

  const disableEditMode = () => {
    const trimmedTitle = title.trim()

    if (trimmedTitle) {
      changeTitle(title)
      setEditMode(false)
    } else {
      setError('nickname should be not empty')
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(null)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      disableEditMode()
    }
    if (e.key === 'Escape') {
      setEditMode(false)
    }
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" width={1} mb={1}>
      {editMode ? (
        <TextField
          autoFocus
          error={!!error}
          variant="standard"
          label="Nickname"
          helperText={error ? error : ''}
          sx={{
            flexGrow: '1',
            mb: 1,
            '& .MuiInputBase-root': { paddingRight: '12px', paddingBottom: '3px' },
          }}
          value={title}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          InputProps={{
            endAdornment: <EditableSpanSaveButton disabled={!!error} onClick={disableEditMode} />,
          }}
        />
      ) : (
        <>
          <Typography sx={{ fontSize: '20px', lineHeight: 1.2, fontWeight: 500 }}>
            {children}
          </Typography>
          {
            <IconButton
              color="inherit"
              sx={{ mr: '-40px' }}
              onClick={activateEditMode}
              disabled={disabled}
            >
              <BorderColorOutlined />
            </IconButton>
          }
        </>
      )}
    </Box>
  )
})
