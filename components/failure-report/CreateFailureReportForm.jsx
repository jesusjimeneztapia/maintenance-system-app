import { useForm } from '../../context/providers/FormContext'
import { SYSTEM_FAILED_STATE_VALUES_MAP } from '../../schemas/failureReport'
import { useFailureReport } from '../../store/failureReport'
import Input from '../Input'
import InputFile from '../InputFile'
import Select from '../Select'
import Textarea from '../Textarea'

export default function CreateFailureReportForm() {
  const formLoading = useFailureReport((state) => state.formLoading)
  const machines = useFailureReport((state) => state.machines)
  const {
    errors,
    handleChange,
    touched,
    setValues,
    upperCaseHandleChange,
    values,
  } = useForm()

  const fileHandleChange = ({ target: { files } }) => {
    const [file] = files
    setValues((values) => ({ ...values, image: file }))
  }

  return (
    <>
      <Select
        id='machineCode'
        label='Máquina'
        placeholder={
          formLoading && machines == null
            ? 'Cargando máquinas...'
            : 'Seleccione una máquina'
        }
        value={values.machineCode}
        optionsMap={machines ?? {}}
        onChange={handleChange}
        error={errors.machineCode}
        touched={touched.machineCode}
      />
      <Select
        id='systemFailedState'
        label='Sistema en estado de falla'
        placeholder='Seleccione el sistema'
        value={values.systemFailedState}
        optionsMap={SYSTEM_FAILED_STATE_VALUES_MAP}
        onChange={handleChange}
        error={errors.systemFailedState}
        touched={touched.systemFailedState}
      />
      <Textarea
        id='description'
        label='Descripción'
        placeholder='Reporte de falla a la máquina...'
        value={values.description}
        onChange={upperCaseHandleChange()}
        error={errors.description}
        touched={touched.description}
        rows={6}
      />
      <Input
        id='operatorName'
        label='Nombre del operador que reporta la falla'
        placeholder='OPERADOR 1'
        value={values.operatorName}
        onChange={upperCaseHandleChange()}
        error={errors.operatorName}
        touched={touched.operatorName}
      />
      <Input
        id='stopHours'
        type='number'
        label='Horas detenidas de la máquina'
        placeholder={0}
        value={values.stopHours}
        onChange={handleChange}
        error={errors.stopHours}
        touched={touched.stopHours}
      />
      <InputFile
        id='image'
        label='Imagen referencial'
        message='Arrastre aquí la imagen o haz click para seleccionar una imagen'
        file={values.image}
        onChange={fileHandleChange}
        accept='image/*'
        error={touched.image ? errors.image : undefined}
      />
    </>
  )
}
