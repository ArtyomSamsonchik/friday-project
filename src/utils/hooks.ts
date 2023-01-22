import { DependencyList, EffectCallback, useEffect, useRef, useState } from 'react'

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootStateType } from '../app/store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector

export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export const useControlledUpdateEffect = (effect: EffectCallback, deps?: DependencyList) => {
  const skipEffectRef = useRef(true)

  useEffect(() => {
    if (!skipEffectRef.current) {
      return effect()
    } else {
      skipEffectRef.current = false
    }
  }, deps)

  return skipEffectRef
}
