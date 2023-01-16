import * as Yup from 'yup'
export const basicFormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)
    .required('Required'),
  password: Yup.string().min(7).required('Required'),
  newPassword: Yup.string().min(7).required('Required. Password length must be more then 7'),
})
