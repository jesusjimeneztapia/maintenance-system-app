import FormProvider, { useForm } from '../context/providers/FormContext'
import { useToast } from '../context/providers/ToastContext'
import Button from './Button'
import axios from 'redaxios'
import Box from './Box'
import styles from '../styles/Form.module.css'

function FormContainer({ children, message }) {
  const { showToast } = useToast()

  const { handleSubmit, resetForm, isValid } = useForm()

  const handleClick = () => {
    if (!isValid) {
      showToast({
        autoClose: false,
        close: true,
        color: 'danger',
        position: 'right',
        children: (
          <section className={styles.failed}>
            <h4>Fallo al registrar la máquina</h4>
            <p>Por favor verifique los campos.</p>
          </section>
        ),
      })
    }
  }

  return (
    <Box>
      <form className={styles.form} onSubmit={handleSubmit}>
        {children}
        <footer>
          <Button onClick={resetForm} type='button' variant='secondary'>
            Reiniciar
          </Button>
          <Button onClick={handleClick} type='submit'>
            {message}
          </Button>
        </footer>
      </form>
    </Box>
  )
}

export default function Form({
  children,
  title,
  dtoValidation,
  initialValues,
  onSubmit = {
    method: '',
    url: '',
    preSubmit: { title: '', question: '', mutateValues: null },
    duringSubmit: { message: '' },
    postSubmit: { update: undefined },
    successSubmit: { message: '' },
    message: '',
    reset: true,
  },
  validateOnMount = true,
  information,
}) {
  const { showToast, request, reset } = useToast()

  const handleMutateValues = (values, resetForm) => {
    let mutatedValues = values
    const { mutateValues } = onSubmit.preSubmit
    if (mutateValues) {
      mutatedValues = mutateValues(values)
    }
    submitAction(mutatedValues, resetForm)
  }

  const submitAction = async (values, resetForm) => {
    const { method, successSubmit, url, reset } = onSubmit
    const { message } = onSubmit.duringSubmit
    showToast({
      autoClose: false,
      close: true,
      color: 'secondary',
      position: 'center',
      children: message,
    })
    const response = await request(
      async () => {
        const { data } = await axios({ method, url, data: values })
        return data
      },
      {
        autoClose: true,
        close: true,
        color: 'success',
        children: successSubmit.message,
      }
    )
    if (response) {
      const { postSubmit } = onSubmit
      if (postSubmit && postSubmit.update) {
        postSubmit.update(response)
      }
      if (reset) {
        resetForm()
      }
    }
  }

  const handleSubmit = (values, { resetForm }) => {
    const { title, question } = onSubmit.preSubmit
    showToast({
      autoClose: false,
      close: false,
      color: 'secondary',
      position: 'right',
      children: (
        <article className={styles.modal}>
          <h4>{title}</h4>
          <p>{question}</p>
          <div>
            <Button
              variant='primary'
              onClick={() => handleMutateValues(values, resetForm)}
            >
              Si
            </Button>
            <Button variant='danger' onClick={reset}>
              No
            </Button>
          </div>
        </article>
      ),
    })
  }

  return (
    <FormProvider
      dtoValidation={dtoValidation}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnMount={validateOnMount}
    >
      <h2>{title}</h2>
      <div className={styles.grid}>
        {information && <Box>{information}</Box>}
        <FormContainer message={onSubmit.message}>{children}</FormContainer>
      </div>
    </FormProvider>
  )
}
