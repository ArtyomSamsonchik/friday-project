import React, { ChangeEvent, FC } from 'react'

import { setAppError } from '../../../app/app-slice'
import { convertFileToBase64 } from '../../../utils/helpers/convertFileToBase64'
import { handleError } from '../../../utils/helpers/handleError'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'

const BASE64_MAX_SIZE = 107_520 //105 KiB

type UploadImageInputProps = {
  disabled?: boolean
  onImageUpload: (file64: string) => void
}

export const UploadImageInput: FC<UploadImageInputProps> = ({ disabled, onImageUpload }) => {
  const dispatch = useAppDispatch()

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      dispatch(
        setAppError('Unsupported image format. Please select one of the following: JPEG, PNG, GIF')
      )

      return
    }

    if (file.size > BASE64_MAX_SIZE) {
      dispatch(setAppError('Image file is too large. Max size is 105 KiB (kilobytes)'))

      return
    }

    try {
      const file64 = await convertFileToBase64(file)

      onImageUpload(file64)
    } catch (e) {
      handleError(e as Error, dispatch)
    }
  }

  return (
    <input
      type="file"
      accept="image/*"
      disabled={disabled}
      onChange={handleChange}
      style={{ display: 'none' }}
    />
  )
}
