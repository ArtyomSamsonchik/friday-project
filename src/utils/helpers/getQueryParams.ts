export const getQueryParams = (searchParams: URLSearchParams) => {
  return Object.fromEntries(searchParams)
}

export const getQueryParamObject = <T extends Record<string, any>>(searchParams: T) => {
  const keys = Object.keys(searchParams)
  const result = {} as Record<string, any>

  for (let key of keys) {
    const value = searchParams[key]

    if (value) {
      result[key] = String(value)
    } else {
      continue
    }
  }

  return result
}
