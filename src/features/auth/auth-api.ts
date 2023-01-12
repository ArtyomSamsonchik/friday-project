import { AxiosResponse } from 'axios/index'

import { instance } from '../../app/api-instance'

export const authAPI = {
  register(data: RegisterDataType) {
    return instance.post<{ addedUser: any; error?: string }>('/auth/register', data)
  },
  /*login(email: string, password: string, rememberMe = false) {
    return instance.post<User>('auth/login', { email, password, rememberMe })
  },*/
  login(values: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse<ResponseType>>('/auth/login', values)
  },
  forgot(data: ForgotRequestType) {
    return instance.post<any, AxiosResponse<ForgotResponseType>>('/auth/forgot', data)
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

export type RegisterDataType = {
  email: string
  password: string
}
export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
}

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

type ForgotResponseType = {
  info: string
  error: string
}
export type ForgotRequestType = {
  email: string
  from: string
  message: string
}
