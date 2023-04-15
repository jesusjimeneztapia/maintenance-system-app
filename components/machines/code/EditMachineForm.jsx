import InputFile from '../../InputFile'
import { useForm } from '../../../context/providers/FormContext'
import {
  AREA_VALUES_MAP,
  CRITICALITY_VALUES_MAP,
  TECHNICAL_DOCUMENTATION_VALUES_MAP,
} from '../../../schemas/machine'
import Input from '../../Input'
import Select from '../../Select'
import Textarea from '../../Textarea'
import CheckboxList from '../../CheckboxList'

export default function EditMachineForm() {
  const {
    errors,
    handleChange,
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

  return (
    <>
      <Input
        id='name'
        label='Nombre'
        placeholder={initialValues.name || 'PRE EXPANSORA'}
        value={values.name}
        onChange={upperCaseHandleChange()}
        error={errors.name}
        touched={touched.name}
      />
      <Input
        id='maker'
        label='Marca'
        placeholder={initialValues.maker || '-'}
        value={values.maker}
        onChange={upperCaseHandleChange()}
        error={errors.maker}
        touched={touched.maker}
      />
      <Input
        id='location'
        label='Ubicación'
        placeholder={initialValues.location || 'EPS'}
        value={values.location}
        onChange={upperCaseHandleChange()}
        error={errors.location}
        touched={touched.location}
      />
      <Select
        id='area'
        label='Área'
        value={values.area}
        placeholder='Seleccione el área de la máquina'
        optionsMap={AREA_VALUES_MAP}
        onChange={handleChange}
        error={errors.area}
        touched={touched.area}
      />
      <Input
        id='model'
        label='Modelo'
        placeholder={initialValues.model || '-'}
        value={values.model}
        onChange={upperCaseHandleChange()}
        error={errors.model}
        touched={touched.model}
      />
      <Input
        id='function'
        label='Función'
        placeholder={initialValues.function || '-'}
        value={values.function}
        onChange={upperCaseHandleChange()}
        error={errors.function}
        touched={touched.function}
      />
      <Textarea
        id='specificData'
        label='Datos específicos'
        placeholder={initialValues.specificData || '-'}
        value={values.specificData}
        onChange={upperCaseHandleChange()}
        error={errors.specificData}
        touched={touched.specificData}
        rows={3}
      />
      <CheckboxList
        id='technicalDocumentation'
        label='Documentación técnica'
        onChange={handleChange}
        optionsMap={TECHNICAL_DOCUMENTATION_VALUES_MAP}
        values={values.technicalDocumentation}
      />
      <Select
        id='criticality'
        label='Criticidad'
        value={values.criticality}
        placeholder='Seleccione la criticidad de la máquina'
        optionsMap={CRITICALITY_VALUES_MAP}
        onChange={handleChange}
        error={errors.criticality}
        touched={touched.criticality}
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
