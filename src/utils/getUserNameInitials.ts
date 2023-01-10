//The username is allowed to contain only firstname
export const getUserNameInitials = (name: string) => {
  const [firstName, surName] = name.split(' ')

  return firstName[0] + (surName?.[0] || '')
}
