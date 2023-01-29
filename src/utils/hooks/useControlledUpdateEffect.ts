import { DependencyList, EffectCallback, useEffect, useRef } from 'react'

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
