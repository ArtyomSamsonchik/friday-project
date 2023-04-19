import { useCallback, useMemo, useRef } from 'react'

import { useSearchParams } from 'react-router-dom'

export type StringifiedRecord<T> = { [P in keyof T]-?: string }

export const useAppQueryParams = <T extends StringifiedRecord<{}>>(defaultParams?: T) => {
  const [searchParams, setSearchParams] = useSearchParams(defaultParams)

  // setSearchParams doesn't retain its identity like setState from useState
  const searchParamsRef = useRef(setSearchParams)

  searchParamsRef.current = setSearchParams

  const setAppQueryParams = useCallback(
    // allows partial params object as argument, but doesn't allow 'undefined' as props values
    <
      U extends {
        [P in keyof U]: P extends keyof T ? T[P] : never
      }
    >(
      params: U & Partial<T>
    ) => {
      searchParamsRef.current(prevParams => {
        const mergedParams = { ...Object.fromEntries(prevParams), ...params }
        const filteredParamPairs = Object.entries(mergedParams).filter(([_, value]) =>
          Boolean(value)
        )

        return Object.fromEntries(filteredParamPairs)
      })
    },
    []
  )

  const memoParamsObject = useMemo(
    () => Object.fromEntries(searchParams) as Partial<T>,
    [searchParams]
  )

  return [memoParamsObject, setAppQueryParams] as const
}
