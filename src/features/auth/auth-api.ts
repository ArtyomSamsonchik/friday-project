import { instance } from '../../app/api-instance'

export const authAPI = {
  register(data: RegisterDataType) {
    return instance.post<{ addedUser: ProfileType; error?: string }>('/auth/register', data)
  },
  login(values: LoginParamsType) {
    return instance.post<ProfileType>('/auth/login', values)
  },
  forgot(data: ForgotRequestType) {
    return instance.post<ForgotResponseType>('/auth/forgot', data)
  },
  setNewPassword(data: NewPasswordRequestType) {
    return instance.post<ForgotResponseType>('/auth/set-new-password', data)
  },
  editProfile(data: ProfilePatchType) {
    return instance.put<{ updatedUser: ProfileType; error?: string }>('auth/me', data)
  },
  logout() {
    return instance.delete<ForgotResponseType>('auth/me')
  },
  me() {
    return instance.post<ProfileType>('auth/me')
  },
}

export type RegisterDataType = {
  email: string
  password: string
}
export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
}

export type ProfileType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
  error?: string
}
type ForgotResponseType = {
  info: string
  error?: string
}
export type ForgotRequestType = {
  email: string
  from: string
  message: string
}
export type NewPasswordRequestType = {
  password: string
  resetPasswordToken: string
}
export type NewPasswordResponseType = {
  info: string
  error: string
}

export type ProfilePatchType = Partial<Pick<ProfileType, 'name' | 'avatar'>>
