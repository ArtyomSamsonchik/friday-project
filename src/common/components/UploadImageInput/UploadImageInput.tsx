import React, { ChangeEvent, forwardRef } from 'react'

import { convertFileToBase64 } from '../../../utils/helpers/convertFileToBase64'
import { handleError } from '../../../utils/helpers/handleError'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { uploadImageInputSchema } from '../../../utils/validationSchemas'

type UploadImageInputProps = {
  disabled?: boolean
  onImageUpload: (file64: string) => void
}

export const UploadImageInput = forwardRef<HTMLInputElement, UploadImageInputProps>(
  (props, ref) => {
    const { disabled, onImageUpload } = props
    const dispatch = useAppDispatch()

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]

      if (!file) return

      try {
        uploadImageInputSchema.validateSync(file)
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
        ref={ref}
        disabled={disabled}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    )
  }
)
