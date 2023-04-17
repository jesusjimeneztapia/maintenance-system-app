import FormProvider, { useForm } from '../context/providers/FormContext'
import { useToast } from '../context/providers/ToastContext'
import axios from 'redaxios'
import { Button, Card, Col, Flex, Grid, Subtitle, Text } from '@tremor/react'

function FormContainer({ children, message }) {
  const { showToast } = useToast()

  const { handleSubmit, resetForm, isValid } = useForm()

  const handleClick = () => {
    if (!isValid) {
      showToast({
        autoClose: false,
        close: true,
        color: 'failure',
        position: 'right',
        children: (
          <>
            <Subtitle className='text-inherit'>
              Fallo al registrar la máquina
            </Subtitle>
            <Text className='text-inherit'>
              Por favor verifique los campos.
            </Text>
          </>
        ),
      })
    }
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      {children}
      <footer className='flex justify-end gap-3'>
        <Button onClick={resetForm} type='button' color='slate'>
          Reiniciar
        </Button>
        <Button onClick={handleClick} type='submit' color='amber'>
          {message}
        </Button>
      </footer>
    </form>
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
      color: 'info',
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
      color: 'dark',
      position: 'right',
      children: (
        <Flex className='gap-1' flexDirection='col' alignItems=''>
          <Subtitle className='text-inherit'>{title}</Subtitle>
          <Text className='text-inherit'>{question}</Text>
          <Flex className='gap-4 pt-1' justifyContent='end'>
            <Button
              onClick={() => handleMutateValues(values, resetForm)}
              color='amber'
            >
              Si
            </Button>
            <Button onClick={reset} color='red'>
              No
            </Button>
          </Flex>
        </Flex>
      ),
    })
  }

  return (
    <Grid className='gap-4' numCols={2}>
      {information && (
        <Col numColSpan={2} numColSpanLg={1}>
          <Card>{information}</Card>
        </Col>
      )}
      <Col numColSpan={2} numColSpanLg={1}>
        <Card>
          <FormProvider
            dtoValidation={dtoValidation}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validateOnMount={validateOnMount}
          >
            {title && <Subtitle className='mb-6'>{title}</Subtitle>}
            <div>
              {/* {information && <Box>{information}</Box>} */}
              <FormContainer message={onSubmit.message}>
                {children}
              </FormContainer>
            </div>
          </FormProvider>
        </Card>
      </Col>
    </Grid>
  )
}
