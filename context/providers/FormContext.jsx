import { useFormik } from 'formik'
import { createContext, useContext } from 'react'
import { formInitialState } from '../reducers/formReducer'

const FormContext = createContext({ ...formInitialState })

export function useForm() {
  const context = useContext(FormContext)
  return context
}

function useFormProvider({
  initialValues,
  onSubmit,
  dtoValidation,
  validateOnMount,
}) {
  const { setValues, values, ...formik } = useFormik({
    initialValues,
    onSubmit,
    validate: (values) => {
      try {
        dtoValidation.parse(values)
      } catch (error) {
        const {
          formErrors: { fieldErrors },
        } = error
        return fieldErrors
      }
    },
    validateOnMount,
  })

  const upperCaseHandleChange =
    () =>
    ({ target: { name, value } }) => {
      setValues({ ...values, [name]: value.toUpperCase() })
    }

  return {
    ...formik,
    setValues,
    values,
    upperCaseHandleChange,
  }
}

export default function FormProvider({
  children,
  dtoValidation,
  initialValues,
  onSubmit,
  validateOnMount = true,
}) {
  const value = useFormProvider({
    dtoValidation,
    initialValues,
    onSubmit,
    validateOnMount,
  })

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}
