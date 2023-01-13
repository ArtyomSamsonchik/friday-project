import { ProfileType } from '../app/api-instance'

export const profileIsNotLoaded = (profile: ProfileType) => {
  const { _id, name, email } = profile

  return !(_id && name && email)
}
