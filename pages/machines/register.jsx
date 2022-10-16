import Button from '../../components/Button'
import Page from '../../components/page'
import axios from 'redaxios'
import Box from '../../components/Box'
import styles from '../../styles/machines/Register.module.css'
import RegisterMachineForm from '../../components/machines/register/RegisterMachineForm'
import { Formik } from 'formik'
import { z } from 'zod'
import { useToast } from '../../context/providers/ToastContext'

const dataInitialValue = {
  name: '',
  maker: '',
  model: '',
  function: '',
  code: '',
  location: '',
  specificData: '',
  criticality: '',
  technicalDocumentation: [],
  image: undefined,
}

const machineSchema = z.object({
  name: z.string().min(1, 'El nombre de la máquina es requerido'),
  maker: z.string().min(1, 'El fabricante de la máquina es requerido'),
  model: z.string().min(1, 'El modelo de la máquina es requerido'),
  function: z.string().min(1, 'La función de la máquina es requerido'),
  code: z.string().min(1, 'El código de la máquina es requerido'),
  location: z.string().min(1, 'La ubicación de la máquina es requerido'),
  specificData: z
    .string()
    .min(1, 'Los datos específicos de la máquina es requerido'),
  criticality: z.enum(['HIGH', 'MEDIUM', 'LOW'], {
    errorMap: () => ({ message: 'La criticidad de la máquina es requerido' }),
  }),
  image: z.any().refine((val) => {
    return val ? !!val.name : false
  }, 'La imagen de la máquina es requerido'),
})

export default function RegisterMachine() {
  const { reset, showToast, request } = useToast()

  const handleSubmit = (values, { resetForm }) => {
    showToast({
      autoClose: false,
      close: false,
      color: 'secondary',
      position: 'right',
      children: (
        <article className={styles.modal}>
          <h4>Registro de la máquina</h4>
          <p>¿Seguro que quiere registrar la máquina?</p>
          <div>
            <Button
              variant='primary'
              onClick={() => registerMachine(values, resetForm)}
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

  const registerMachine = async (values, resetForm) => {
    showToast({
      autoClose: false,
      close: true,
      color: 'secondary',
      position: 'center',
      children: 'La máquina se está registrando...',
    })
    const { technicalDocumentation, ...rest } = values
    const body = {
      ...rest,
      technicalDocumentation: JSON.stringify(technicalDocumentation),
    }
    const formData = new FormData()
    const keys = Object.keys(body)
    keys.forEach((key) => {
      formData.set(key, body[key])
    })
    const response = await request(
      async () => {
        const { data } = await axios.post('/api/machines/add', formData)
        return data
      },
      {
        autoClose: true,
        close: true,
        color: 'success',
        children: 'La máquina se registró exitósamente',
      }
    )
    if (response) {
      resetForm()
    }
  }

  return (
    <Page title='Registro de máquinas | TECNOPOR S.A.'>
      <section className={styles.container}>
        <h2 className={styles.title}>Registro de Máquina</h2>
        <div className={styles.grid}>
          <Box>
            <Formik
              initialValues={dataInitialValue}
              validate={(values) => {
                try {
                  machineSchema.parse(values)
                } catch (error) {
                  const {
                    formErrors: { fieldErrors },
                  } = error
                  return fieldErrors
                }
              }}
              onSubmit={handleSubmit}
              validateOnMount={true}
            >
              <RegisterMachineForm />
            </Formik>
          </Box>
        </div>
      </section>
    </Page>
  )
}
