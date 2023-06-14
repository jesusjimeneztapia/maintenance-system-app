import InputFile from '../../InputFile'
import { useForm } from '../../../context/providers/FormContext'
import Input from '../../Input'
import Select from '../../Select'
import Textarea from '../../Textarea'
import CheckboxList from '../../CheckboxList'

export default function EditMachineForm({ fields }) {
  const {
    errors,
    setValues,
    touched,
    upperCaseHandleChange,
    values,
    initialValues,
  } = useForm()

  const fileHandleChange = ({ target: { files } }) => {
    const [file] = files
    setValues((values) => ({ ...values, image: file }))
  }
  const handleChangeField = ({ target: { name, value } }) => {
    setValues((values) => ({ ...values, [name]: +value }))
  }
  const handleChangeFieldCheckbox = ({ target: { name, value } }) => {
    setValues((values) => ({
      ...values,
      [name]: values[name].includes(+value)
        ? values[name].filter((id) => id !== +value)
        : [...values[name], +value],
    }))
  }

  return (
    <>
      <Input
        id='name'
        label='Nombre'
        placeholder={initialValues.name || 'PRE EXPANSORA'}
        value={values.name ?? ''}
        onChange={upperCaseHandleChange()}
        error={errors.name}
        touched={touched.name}
      />
      <Input
        id='maker'
        label='Fabricante'
        placeholder={initialValues.maker || '-'}
        value={values.maker ?? ''}
        onChange={upperCaseHandleChange()}
        error={errors.maker}
        touched={touched.maker}
      />
      <Input
        id='location'
        label='Ubicación'
        placeholder={initialValues.location || 'EPS'}
        value={values.location ?? ''}
        onChange={upperCaseHandleChange()}
        error={errors.location}
        touched={touched.location}
      />
      <Select
        id='areaId'
        label='Área'
        value={values.areaId}
        placeholder='Seleccione el área de la máquina'
        optionsMap={fields.areas ?? {}}
        onChange={({ target: { value } }) =>
          setValues((values) => ({ ...values, areaId: +value }))
        }
        error={errors.areaId}
        touched={touched.areaId}
      />
      <Input
        id='model'
        label='Modelo'
        placeholder={initialValues.model || '-'}
        value={values.model ?? ''}
        onChange={upperCaseHandleChange()}
        error={errors.model}
        touched={touched.model}
      />
      <Input
        id='function'
        label='Función'
        placeholder={initialValues.function || '-'}
        value={values.function ?? ''}
        onChange={upperCaseHandleChange()}
        error={errors.function}
        touched={touched.function}
      />
      <Textarea
        id='specificData'
        label='Datos específicos'
        placeholder={initialValues.specificData || '-'}
        value={values.specificData ?? ''}
        onChange={upperCaseHandleChange()}
        error={errors.specificData}
        touched={touched.specificData}
        rows={3}
      />
      <CheckboxList
        id='technicalDocumentation'
        label='Documentación técnica'
        onChange={handleChangeFieldCheckbox}
        optionsMap={fields.technicalDocumentation ?? {}}
        values={values.technicalDocumentation}
      />
      <Select
        id='criticalityId'
        label='Criticidad'
        value={values.criticalityId}
        placeholder='Seleccione la criticidad de la máquina'
        optionsMap={fields.criticalities ?? {}}
        onChange={handleChangeField}
        error={errors.criticalityId}
        touched={touched.criticalityId}
      />
      <InputFile
        id='image'
        label='Imagen de la máquina'
        message='Arrastre aquí la imagen o haz click para seleccionar una imagen'
        file={values.image}
        onChange={fileHandleChange}
        accept='image/*'
        error={touched.image ? errors.image : undefined}
      />
    </>
  )
}
