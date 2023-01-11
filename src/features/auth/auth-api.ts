import { instance } from '../../app/api-instance'

export const authAPI = {
  register(email: string, password: string) {
    return instance.post<User>('auth/register', { email, password })
  },
  login(email: string, password: string, rememberMe = false) {
    return instance.post<User>('auth/login', { email, password, rememberMe })
  },
  me() {},
}

export type User = {
  id: string
  email: string
  name: string
  avatar?: string
  rememberMe: boolean
  isAdmin: boolean
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  __v: number //maybe useless data?

  error?: string
}
