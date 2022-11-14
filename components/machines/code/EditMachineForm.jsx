import CheckboxList from '../../CheckboxList'
import Input from '../../Input'
import InputFile from '../../InputFile'
import Select from '../../Select'
import Textarea from '../../Textarea'
import { useForm } from '../../../context/providers/FormContext'
import {
  AREA_VALUES_MAP,
  CRITICALITY_VALUES_MAP,
  TECHNICAL_DOCUMENTATION_VALUES_MAP,
} from '../../../schemas/machine'

export default function EditMachineForm() {
  const {
    errors,
    handleChange,
    setValues,
    touched,
    upperCaseHandleChange,
    values,
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
        placeholder='Nombre de la máquina'
        value={values.name}
        onChange={upperCaseHandleChange()}
        error={touched.name ? errors.name : undefined}
      />
      <Input
        id='maker'
        label='Fabricante'
        placeholder='Fabricante de la máquina'
        value={values.maker}
        onChange={upperCaseHandleChange()}
        error={touched.maker ? errors.maker : undefined}
      />
      <Input
        id='location'
        label='Ubicación'
        placeholder='Ubicación de la máquina'
        value={values.location}
        onChange={upperCaseHandleChange()}
        error={touched.location ? errors.location : undefined}
      />
      <Select
        id='area'
        label='Área'
        value={values.area}
        placeholder='Área de la máquina'
        optionsMap={AREA_VALUES_MAP}
        onChange={handleChange}
        error={touched.area ? errors.area : undefined}
      />
      <Input
        id='model'
        label='Modelo'
        placeholder='Modelo de la máquina'
        value={values.model}
        onChange={upperCaseHandleChange()}
        error={touched.model ? errors.model : undefined}
      />
      <Input
        id='function'
        label='Función'
        placeholder='Función de la máquina'
        value={values.function}
        onChange={upperCaseHandleChange()}
        error={touched.function ? errors.function : undefined}
      />
      <Textarea
        id='specificData'
        label='Datos específicos'
        placeholder='Datos específicos de la máquina...'
        rows={3}
        value={values.specificData}
        onChange={upperCaseHandleChange()}
        error={touched.specificData ? errors.specificData : undefined}
      />
      <CheckboxList
        id='technicalDocumentation'
        label='Documentación técnica'
        values={values.technicalDocumentation}
        optionsMap={TECHNICAL_DOCUMENTATION_VALUES_MAP}
        onChange={handleChange}
      />
      <Select
        id='criticality'
        label='Criticidad'
        value={values.criticality}
        placeholder='Criticidad de la máquina'
        optionsMap={CRITICALITY_VALUES_MAP}
        onChange={handleChange}
        error={touched.criticality ? errors.criticality : undefined}
      />
      <InputFile
        id='image'
        label='Imagen de la máquina'
        message='Arrastre aquí la imagen o haz click para seleccionar una imagen.'
        file={values.image}
        onChange={fileHandleChange}
        accept='image/*'
        error={touched.image ? errors.image : undefined}
      />
    </>
  )
}
