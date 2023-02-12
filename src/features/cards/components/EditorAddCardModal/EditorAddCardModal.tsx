import React, { ChangeEvent, FC, SyntheticEvent, useState } from 'react'

import { SxProps, Theme } from '@mui/material'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { Formik, useFormik } from 'formik'
import { InferType, object, string, ValidationError } from 'yup'

import {
  AlternativeBasicModal,
  AlternativeBasicModalProps,
} from '../../../../common/components/AlternativeBasicModal/AlternativeBasicModal'
import { ModalLabel } from '../../../../common/components/AlternativeBasicModal/styled'
import { useAppDispatch } from '../../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../../utils/hooks/useAppSelector'
import { selectCard } from '../../cards-selectors'
import { addCardTC, updateCardTC } from '../../cards-slice'

enum Options {
  Text,
  Image,
}

const validationSchema = object({
  question: string().trim().required('question should not be empty!'),
  answer: string().trim().required('answer should not be empty!'),
})

const getTextFieldProps = (error?: string): TextFieldProps => ({
  fullWidth: true,
  variant: 'standard',
  error: !!error,
  helperText: error || ' ',
})

type FormValues = InferType<typeof validationSchema>

type EditorAddCardModalProps = Pick<AlternativeBasicModalProps, 'isOpen' | 'title' | 'onClose'> & {
  cardId: string
  packId: string
}

export const EditorAddCardModal: FC<EditorAddCardModalProps> = props => {
  const { cardId, onClose, packId, ...restProps } = props

  const card = useAppSelector(state => selectCard(state, cardId))
  const initCardQuestion = card?.question || ''
  const initCardAnswer = card?.answer || ''

  const [selected, setSelected] = useState(Options.Text)
  // const [question, setQuestion] = useState(initCardQuestion)
  // const [answer, setAnswer] = useState(initCardAnswer)
  // const [error, setError] = useState<string | null>(null)
  const dispatch = useAppDispatch()

  const handleEditorAddCardSubmit = (values: FormValues) => {
    const { question, answer } = validationSchema.cast(values)

    console.log(question, answer)

    // if (card) {
    //   dispatch(updateCardTC({ _id: cardId, packId, question, answer }))
    // } else {
    //   dispatch(addCardTC({ cardsPack_id: packId, question, answer }))
    // }
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      question: initCardQuestion,
      answer: initCardAnswer,
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleEditorAddCardSubmit,
  })

  const handleTabChange = (e: SyntheticEvent, value: Options) => {
    setSelected(value)
  }

  const getMyFieldProps = (field: keyof FormValues) => {
    const fieldProps = formik.getFieldProps(field)

    fieldProps.onChange = (e: ChangeEvent<HTMLInputElement>) => {
      formik.setFieldError(field, undefined)

      formik.handleChange(e)
    }

    return fieldProps
  }

  // const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setQuestion(e.currentTarget.value)
  //   setError(null)
  // }
  //
  // const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setAnswer(e.currentTarget.value)
  //   setError(null)
  // }

  const handleModalClose = () => {
    // setQuestion(initCardQuestion)
    // setAnswer(initCardAnswer)
    // setError(null)
    formik.resetForm()
    onClose()
  }

  return (
    <AlternativeBasicModal
      primaryButtonName="Save"
      primaryButtonIsDisabled={!formik.isValid}
      onPrimaryButtonClick={async () => {
        await formik.validateForm()
        await formik.submitForm()
      }}
      onClose={handleModalClose}
      {...restProps}
    >
      <ModalLabel>Choose a question format</ModalLabel>
      <Tabs variant="fullWidth" value={selected} sx={{ mb: 3 }} onChange={handleTabChange}>
        <Tab value={Options.Text} label="Text" />
        <Tab value={Options.Image} label="Image" />
      </Tabs>

      <TextField
        label="Question"
        {...getTextFieldProps(formik.errors.question)}
        {...getMyFieldProps('question')}
      />
      <TextField
        sx={{ mb: '-16px' }}
        label="Answer"
        {...getTextFieldProps(formik.errors.answer)}
        {...getMyFieldProps('answer')}
      />
    </AlternativeBasicModal>
  )
}
