import * as Yup from 'yup'

export const emailSchema = Yup.string()
  .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email')
  .required('Required')

export const passwordSchema = Yup.string()
  .min(7, 'Password length must be more then 7')
  .required('Required')

export const loginSchema = Yup.object({
  email: emailSchema,
  password: passwordSchema,
})
