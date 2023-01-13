import { ProfileType } from '../features/auth/auth-api'

export const profileIsNotLoaded = (profile: ProfileType) => {
  const { _id, name, email } = profile

  return !(_id && name && email)
}
