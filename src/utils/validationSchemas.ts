import * as Yup from 'yup'

import { Tabs } from '../features/cards/components/EditorAddCardModal/EditorAddCardModal'

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

const getModalInputSchema = () => {
  return Yup.string()
    .trim()
    .defined()
    .when('tab', ([tab], schema) => {
      const message =
        tab === Tabs.Text ? '${path} should not be empty' : 'provide an image to ${path} field'

      return schema.required(message)
    })
}

export const editorAddCardSchema = Yup.object({
  tab: Yup.string<Tabs>().defined(),
  question: getModalInputSchema(),
  answer: getModalInputSchema(),
})
