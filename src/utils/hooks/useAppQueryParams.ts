import { useMemo } from 'react'

import { useSearchParams } from 'react-router-dom'

import { getQueryParamObject } from '../helpers/getQueryParams'

type QueryParamsValues<T> = T[keyof T]
type DefaultParams<T> = Partial<Record<keyof T, string>>
export const useAppQueryParams = <U, T = DefaultParams<U>, K extends keyof T = keyof T>(
  defaultParams: T = {} as T
): [T, typeof setAppQueryParams] => {
  const [searchParams, setSearchParams] = useSearchParams(defaultParams as Record<string, string>)

  // const setAppQueryParams = (paramName: K, paramValue: QueryParamsValues<T>) => {
  //   setSearchParams(searchParams => {
  //     return getQueryParamObject<T>(paramName, paramValue, Object.fromEntries(searchParams) as T)
  //   })
  // }
  /* const setAppQueryParams = (params: { [key in K]: QueryParamsValues<T> }) => {
    for (let itemParam in params) {
      setSearchParams(searchParams => {
        return getQueryParamObject<T>(
          itemParam,
          params[itemParam],
          Object.fromEntries(searchParams) as T
        )
      })
    }
  }*/
  const setAppQueryParams = (params: Record<string, any>) => {
    setSearchParams(prevParams => {
      return { ...Object.fromEntries(prevParams), ...getQueryParamObject(params) }
    })
  }

  const memoParamsObject = useMemo(() => Object.fromEntries(searchParams) as T, [searchParams])

  return [memoParamsObject, setAppQueryParams]
}
