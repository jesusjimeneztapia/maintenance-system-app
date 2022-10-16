import Page from '../../../components/page'
import { getAPIURL } from '../../../libs/origin'
import axios from 'redaxios'
import { useFormik } from 'formik'
import { z } from 'zod'
import EditMachineForm from '../../../components/machines/code/EditMachineForm'
import Box from '../../../components/Box'
import { useToast } from '../../../context/providers/ToastContext'
import Button from '../../../components/Button'
import styles from '../../../styles/machines/Register.module.css'

const machineSchema = z.object({
  name: z.string().min(1, 'El nombre de la máquina es requerido'),
  maker: z.string().min(1, 'El fabricante de la máquina es requerido'),
  model: z.string().min(1, 'El modelo de la máquina es requerido'),
  function: z.string().min(1, 'La función de la máquina es requerido'),
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

function useEditMachine({ machine }) {
  const { reset, request, showToast } = useToast()

  const updateMachine = async (values) => {
    showToast({
      autoClose: false,
      close: true,
      color: 'secondary',
      position: 'center',
      children: 'La máquina se está actualizando...',
    })
    const { technicalDocumentation, ...rest } = values
    const body = rest
    if (technicalDocumentation) {
      body.technicalDocumentation = JSON.stringify(technicalDocumentation)
    }
    const formData = new FormData()
    const keys = Object.keys(body)
    keys.forEach((key) => {
      formData.set(key, body[key])
    })
    await request(
      async () => {
        const { data } = await axios.put('/api/machines/update', formData)
        return data
      },
      {
        autoClose: true,
        close: true,
        color: 'success',
        children: 'La máquina se actualizó exitósamente',
      }
    )
  }

  const formik = useFormik({
    initialValues: machine ?? {},
    validate: (values) => {
      try {
        machineSchema.parse(values)
      } catch (error) {
        const {
          formErrors: { fieldErrors },
        } = error
        return fieldErrors
      }
    },
    onSubmit: (values) => {
      const { image, ...data } = values
      if (image.size) {
        data.image = image
      }
      showToast({
        autoClose: false,
        close: false,
        color: 'secondary',
        position: 'right',
        children: (
          <article className={styles.modal}>
            <h4>Editar máquina</h4>
            <p>¿Seguro que quiere guardar los cambios?</p>
            <div>
              <Button variant='primary' onClick={() => updateMachine(data)}>
                Si
              </Button>
              <Button variant='danger' onClick={reset}>
                No
              </Button>
            </div>
          </article>
        ),
      })
    },
  })

  return formik
}

export default function EditMachine({ code, machine, ...rest }) {
  const formik = useEditMachine({ machine })

  return (
    <Page title={`Máquina ${code} | TECNOPOR S.A.`}>
      <h2
        style={{
          fontWeight: '500',
          lineHeight: '1.75rem',
          fontSize: '1.125rem',
          color: 'var(--slate-900)',
        }}
      >
        Máquina {code}
      </h2>
      {machine && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
            marginTop: '1.25rem',
          }}
        >
          <Box>
            <EditMachineForm {...formik} />
          </Box>
        </div>
      )}
    </Page>
  )
}

export async function getServerSideProps(context) {
  const {
    query: { code },
  } = context

  let machine = null
  let message = null

  const api = getAPIURL(context)
  try {
    const { data } = await axios.get(`${api}/machines/${code}`)
    machine = data
  } catch (error) {
    const { data } = error
    message = data.message
  }

  return {
    props: {
      code,
      machine,
      message,
    },
  }
}
