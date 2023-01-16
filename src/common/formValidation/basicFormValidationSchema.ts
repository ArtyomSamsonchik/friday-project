import * as Yup from 'yup'
export const loginFormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)
    .required('Required'),
  password: Yup.string().min(7, 'Password length must be more then 7').required('Required'),
})
export const newPasswordFormValidationSchema = Yup.object().shape({
  newPassword: Yup.string().min(7, 'Password length must be more then 7').required('Required.'),
})
export const emailFormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)
    .required('Required'),
})
