import { useMemo } from 'react'

import { useSearchParams } from 'react-router-dom'

import { getQueryParamObject } from '../helpers/getQueryParams'

type QueryParamsValues<T> = T[keyof T]
export const useAppQueryParams = <T extends {}, K extends keyof T = keyof T>(
  defaultParams: Partial<Record<keyof T, string>> = {}
): [T, typeof setAppQueryParams] => {
  const [searchParams, setSearchParams] = useSearchParams(defaultParams as Record<string, string>)

  /*const setAppQueryParams = (paramName: K, paramValue: QueryParamsValues<T>) => {
    setSearchParams(searchParams => {
      return getQueryParamObject<T>(paramName, paramValue, Object.fromEntries(searchParams) as T)
    })
  }*/
  const setAppQueryParams = (params: { [key in K]: QueryParamsValues<T> }) => {
    for (let itemParam in params) {
      setSearchParams(searchParams => {
        return getQueryParamObject<T>(
          itemParam,
          params[itemParam],
          Object.fromEntries(searchParams) as T
        )
      })
    }
  }
  const memoParamsObject = useMemo(() => Object.fromEntries(searchParams) as T, [searchParams])

  return [memoParamsObject, setAppQueryParams]
}
