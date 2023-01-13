import { AxiosError, isAxiosError } from 'axios'

import { setAppError, setAppStatus } from '../app/app-slice'
import { AppDispatch } from '../app/store'

export const handleError = (e: Error | AxiosError<{ error: string }>, dispatch: AppDispatch) => {
  let message = e.message

  if (isAxiosError(e)) {
    message = e.response?.data?.error
  }
  dispatch(setAppError(message))
  dispatch(setAppStatus('failure'))
}
