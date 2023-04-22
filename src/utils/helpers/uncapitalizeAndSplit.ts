export const uncapitalizeAndSplit = (str: string) => {
  return str.replace(/(^[A-Z])|[A-Z]/g, (match, firstLetter) => {
    if (firstLetter) return firstLetter.toLowerCase()

    return ' ' + match.toLowerCase()
  })
}
