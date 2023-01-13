//The username is allowed to contain only firstname
export const getUserNameInitials = (name: string) => {
  if (!name.length) return ''
  const [firstName, surName] = name.split(' ')

  return firstName[0] + (surName?.[0] || '')
}
