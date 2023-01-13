import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
  baseURL:
    /* process.env.NODE_ENV === 'development'
       ? 'http://localhost:7542/2.0'
       : */ 'https://neko-back.herokuapp.com/2.0',
  withCredentials: true,
})
export const authApi = {
  register(data: RegisterDataType) {
    return instance.post<{ addedUser: any; error?: string }>('/auth/register', data)
  },
  login(values: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse<ResponseType>>('/auth/login', values)
  },
  editProfile(data: ProfilePatchType) {
    return instance.put<{ updatedUser: ProfileType; error?: string }>('auth/me', data)
  },
  logout() {
    return instance.delete<{ info: string; error?: string }>('auth/me')
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

export type ProfileType = ResponseType
export type ResponseType = {
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

export type ProfilePatchType = Partial<Pick<ProfileType, 'name' | 'avatar'>>
