export const getQueryParams = (searchParams: URLSearchParams) => {
  return Object.fromEntries(searchParams)
}

// changed UrlSearchpType to GetCardPacksQueryParams

export const getQueryParamObject = <T extends {}, K extends keyof T = keyof T>(
  paramName: K,
  paramValue: T[K],
  searchParams: T
) => {
  //const packNameQuery: { [key: string]: string } = paramValue ? { [paramName]: paramValue } : {}
  //const packNameQuery = paramValue ? { [paramName]: paramValue } : {}

  //const { [paramName]: param, ...otherQueries } = Object.fromEntries(searchParams)
  if (paramValue) {
    return { ...searchParams, [paramName]: paramValue } as Record<string, string>
  } else {
    let copy = { ...searchParams }

    delete copy[paramName]

    return copy
  }
}
