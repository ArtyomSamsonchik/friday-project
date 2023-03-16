import React, { FC, memo, SyntheticEvent } from 'react'

import Tab from '@mui/material/Tab'
import MUITabs from '@mui/material/Tabs'
import { Formik, FormikConfig } from 'formik'
import { InferType } from 'yup'

import {
  ConfirmModal,
  ConfirmModalProps,
} from '../../../../common/components/Modals/ConfirmModal/ConfirmModal'
import { ModalLabel } from '../../../../common/components/Modals/ConfirmModal/styled'
import { coerceImage64 } from '../../../../utils/helpers/coerceImage64'
import { useAppDispatch } from '../../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../../utils/hooks/useAppSelector'
import { editorAddCardSchema } from '../../../../utils/validationSchemas'
import { Card, CardMutationData } from '../../cards-api'
import { selectCard } from '../../cards-selectors'
import { addCardTC, updateCardTC } from '../../cards-slice'

import { SwitchableModalInput } from './SwitchableModalInput'

export enum Tabs {
  Text = 'text',
  Image = 'image',
}

enum FormStatus {
  Initialized,
  Switched,
}

export type CardModalFormValues = InferType<typeof editorAddCardSchema>

type EditorAddCardModalProps = Pick<ConfirmModalProps, 'isOpen' | 'title' | 'onClose'> & {
  cardId: string
  packId: string
}

export const EditorAddCardModal: FC<EditorAddCardModalProps> = memo(props => {
  const { cardId, onClose, packId, ...restProps } = props

  const card = useAppSelector(state => selectCard(state, cardId))
  const dispatch = useAppDispatch()

  const getFormInitValues = (card?: Card, tab?: Tabs) => {
    const initValues: CardModalFormValues = {
      tab: tab || Tabs.Text,
      question: '',
      answer: '',
    }

    if (card) {
      const questionImg = coerceImage64(card.questionImg)
      const answerImg = coerceImage64(card.answerImg)
      const isAnyValidImage = Boolean(questionImg || answerImg)

      //Select active tab on modal open/close (when tab arg is undefined) if card is defined
      if (!tab) initValues.tab = isAnyValidImage ? Tabs.Image : Tabs.Text

      //Card modal should not display text fields if it has any image for question/answer
      if (initValues.tab === Tabs.Text) {
        initValues.question = isAnyValidImage ? '' : card.question
        initValues.answer = isAnyValidImage ? '' : card.answer
      } else {
        initValues.question = questionImg
        initValues.answer = answerImg
      }
    }

    return initValues
  }

  const handleModalSubmit: FormikConfig<CardModalFormValues>['onSubmit'] = async (
    values,
    { resetForm }
  ) => {
    const { question, answer, tab } = editorAddCardSchema.cast(values)
    const patch = {} as CardMutationData

    if (tab === Tabs.Text) {
      patch.question = question
      patch.answer = answer
      patch.questionImg = 'no question image'
      patch.answerImg = 'no answer image'
    } else {
      patch.question = 'no question'
      patch.answer = 'no answer'
      patch.questionImg = question
      patch.answerImg = answer
    }

    if (card) {
      const updatedCard = await dispatch(updateCardTC({ _id: cardId, packId, ...patch }))

      if (updatedCard) resetForm({ values: getFormInitValues(updatedCard) })
    } else {
      await dispatch(addCardTC({ cardsPack_id: packId, ...patch }))
      resetForm({ values: getFormInitValues() })
    }

    onClose()
  }

  return (
    <Formik
      initialValues={getFormInitValues(card)}
      validationSchema={editorAddCardSchema}
      validateOnChange={false}
      validateOnBlur={false}
      initialStatus={FormStatus.Initialized}
      onSubmit={handleModalSubmit}
    >
      {({ values, isValid, isSubmitting, resetForm, handleSubmit, status, setStatus }) => {
        const handleModalClose = () => {
          onClose()
          resetForm({ values: getFormInitValues(card) })
        }

        const handleTabChange = (e: SyntheticEvent, tab: Tabs) => {
          resetForm({ values: getFormInitValues(card, tab) })
          setStatus(FormStatus.Switched)
        }

        return (
          <ConfirmModal
            isLoading={isSubmitting}
            primaryButtonName="Save"
            primaryButtonIsDisabled={!isValid}
            onPrimaryButtonClick={() => handleSubmit()}
            onClose={handleModalClose}
            {...restProps}
          >
            <ModalLabel>Choose a question format</ModalLabel>
            <MUITabs
              variant="fullWidth"
              value={values.tab}
              sx={{ mb: 3 }}
              onChange={handleTabChange}
            >
              <Tab value={Tabs.Text} label="Text" />
              <Tab value={Tabs.Image} label="Image" />
            </MUITabs>
            <SwitchableModalInput
              autoFocus={status === FormStatus.Initialized && props.isOpen}
              tab={values.tab}
              label="question"
              field="question"
            />
            <SwitchableModalInput tab={values.tab} label="answer" field="answer" />
          </ConfirmModal>
        )
      }}
    </Formik>
  )
})
