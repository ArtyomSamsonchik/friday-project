/**
 * Stringifies params object to match API query parameter
 */

export const stringifySortQueryParams = (sortParams: { order: 'asc' | 'desc'; column: string }) => {
  const { order, column } = sortParams

  return (order === 'asc' ? 1 : 0) + column
}
