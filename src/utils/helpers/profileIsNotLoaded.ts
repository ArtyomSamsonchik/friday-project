import { ProfileType } from '../../features/auth/auth-api'

export const profileIsNotLoaded = (profile: ProfileType) => {
  const { _id, name, email } = profile

  return !(_id && name && email)
}

// TODO: delete in future (delete helper and implementations).
//  Helper is redundant because profile page can't be loaded without profile data in the store.
//  authTC hook  will not allow to redirect to profile if is not authenticated.
//  And profile date is loaded inside authTC hook
