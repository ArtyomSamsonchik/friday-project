import React, { ChangeEvent } from 'react'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { IconButton } from '@mui/material'

import { fetchUpdatedProfile } from '../../../features/profile/profile-slice'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'

export const InputTypeFile = () => {
  const avatar = useAppSelector(state => state.profile.userData.avatar)
  const dispatch = useAppDispatch()
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          dispatch(fetchUpdatedProfile({ avatar: file64 }))
        })
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }
  }

  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      const file64 = reader.result as string

      callBack(file64)
    }
    reader.readAsDataURL(file)
  }

  return (
    <span>
      <label>
        <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
        <IconButton component="span">
          <CloudUploadIcon />
        </IconButton>
      </label>
    </span>
  )
}
