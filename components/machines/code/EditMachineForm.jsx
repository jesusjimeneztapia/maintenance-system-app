import Button from '../../Button'
import CheckboxList from '../../CheckboxList'
import Input from '../../Input'
import InputFile from '../../InputFile'
import Select from '../../Select'
import Textarea from '../../Textarea'
import styles from '../../../styles/machines/RegisterMachineForm.module.css'
import { useToast } from '../../../context/providers/ToastContext'
import { useState } from 'react'

export default function EditMachineForm({
  handleSubmit,
  values,
  handleChange,
  touched,
  errors,
  resetForm,
  setValues,
  isValid,
  initialValues,
}) {
  const { showToast } = useToast()
  const [edited, setEdited] = useState(false)

  const isDiferrent = (property) => {
    const original = { ...initialValues, [property]: undefined }
    const current = { ...values, [property]: undefined }
    const differrent = JSON.stringify(original) !== JSON.stringify(current)
    return differrent
  }

  const fileHandleChange = ({ target: { files } }) => {
    const [file] = files
    setValues((values) => ({ ...values, image: file }))
  }

  const createHandleChange = (isFile) => (e) => {
    setEdited(() => {
      const {
        target: { name, value },
      } = e
      if (name === 'image') {
        return true
      }
      let differrent
      if (name === 'technicalDocumentation') {
        let orTD = initialValues[name]
        const cuTD = values[name]
        let newTD = [...cuTD, value]
        const index = cuTD.indexOf(value)
        if (index >= 0) {
          newTD = [...cuTD.slice(0, index), ...cuTD.slice(index + 1, 5)].sort()
        }
        orTD = orTD.sort()
        differrent = JSON.stringify(orTD) !== JSON.stringify(newTD)
      } else {
        differrent = initialValues[name] !== value
      }
      return differrent || isDiferrent(name)
    })
    if (isFile) {
      return fileHandleChange(e)
    }
    const {
      target: { name, value },
    } = e
    if (name !== 'technicalDocumentation') {
      e.target.value = value.toUpperCase()
    }
    handleChange(e)
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
        onChange={createHandleChange()}
      />
      <Select
        id='criticality'
        label='Criticidad'
        value={values.criticality}
        onChange={createHandleChange()}
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
        onChange={createHandleChange(true)}
        accept='image/*'
        error={touched.image ? errors.image : undefined}
      />
      <footer>
        <Button
          onClick={() => {
            resetForm()
            setEdited(false)
          }}
          type='button'
          variant='secondary'
          disabled={!edited}
        >
          Cancelar
        </Button>
        <Button onClick={handleClick} type='submit' disabled={!edited}>
          Guardar
        </Button>
      </footer>
    </form>
  )
}
