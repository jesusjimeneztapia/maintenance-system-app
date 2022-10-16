import Button from '../../Button'
import Input from '../../Input'
import InputFile from '../../InputFile'
import Select from '../../Select'
import Textarea from '../../Textarea'
import styles from '../../../styles/machines/RegisterMachineForm.module.css'
import { useFormikContext } from 'formik'
import { useToast } from '../../../context/providers/ToastContext'
import CheckboxList from '../../CheckboxList'

export default function RegisterMachineForm() {
  const {
    handleChange,
    touched,
    errors,
    values,
    handleSubmit,
    setValues,
    resetForm,
    isValid,
  } = useFormikContext()

  const { showToast } = useToast()

  const createHandleChange = () => (e) => {
    const {
      target: { value },
    } = e
    e.target.value = value.toUpperCase()
    handleChange(e)
  }

  const fileHandleChange = ({ target: { files } }) => {
    const [file] = files
    setValues((values) => ({ ...values, image: file }))
  }

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
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        id='code'
        label='Código'
        placeholder='Código de la máquina'
        value={values.code}
        onChange={createHandleChange()}
        error={touched.code ? errors.code : undefined}
      />
      <Input
        id='name'
        label='Nombre'
        placeholder='Nombre de la máquina'
        value={values.name}
        onChange={createHandleChange()}
        error={touched.name ? errors.name : undefined}
      />
      <Input
        id='maker'
        label='Fabricante'
        placeholder='Fabricante de la máquina'
        value={values.maker}
        onChange={createHandleChange()}
        error={touched.maker ? errors.maker : undefined}
      />
      <Input
        id='location'
        label='Ubicación'
        placeholder='Ubicación de la máquina'
        value={values.location}
        onChange={createHandleChange()}
        error={touched.location ? errors.location : undefined}
      />
      <Input
        id='model'
        label='Modelo'
        placeholder='Modelo de la máquina'
        value={values.model}
        onChange={createHandleChange()}
        error={touched.model ? errors.model : undefined}
      />
      <Input
        id='function'
        label='Función'
        placeholder='Función de la máquina'
        value={values.function}
        onChange={createHandleChange()}
        error={touched.function ? errors.function : undefined}
      />
      <Textarea
        id='specificData'
        label='Datos específicos'
        placeholder='Datos específicos de la máquina...'
        rows={3}
        value={values.specificData}
        onChange={createHandleChange()}
        error={touched.specificData ? errors.specificData : undefined}
      />
      <CheckboxList
        id='technicalDocumentation'
        label='Documentación técnica'
        values={values.technicalDocumentation}
        options={[
          { label: 'Manual de operaciones', value: 'OPERATIONS_MANUAL' },
          { label: 'Manual de mantenimiento', value: 'MAINTENANCE_MANUAL' },
          { label: 'Planos eléctricos', value: 'ELECTRICAL_PLANS' },
          { label: 'Planos mecánicos', value: 'MECHANICAL_PLANS' },
        ]}
        onChange={handleChange}
      />
      <Select
        id='criticality'
        label='Criticidad'
        value={values.criticality}
        onChange={handleChange}
        error={touched.criticality ? errors.criticality : undefined}
      >
        <option value='' disabled>
          Criticidad de la máquina
        </option>
        <option value='HIGH'>Alta</option>
        <option value='MEDIUM'>Media</option>
        <option value='LOW'>Baja</option>
      </Select>
      <InputFile
        id='image'
        label='Imagen de la máquina'
        message='Arrastre aquí la imagen o haz click para seleccionar una imagen.'
        file={values.image}
        onChange={fileHandleChange}
        accept='image/*'
        error={touched.image ? errors.image : undefined}
      />
      <footer>
        <Button onClick={resetForm} type='button' variant='secondary'>
          Reiniciar
        </Button>
        <Button onClick={handleClick} type='submit'>
          Registrar
        </Button>
      </footer>
    </form>
  )
}
