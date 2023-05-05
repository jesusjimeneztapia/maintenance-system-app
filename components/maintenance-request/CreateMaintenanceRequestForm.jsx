import { useForm } from '../../context/providers/FormContext'
import { useMaintenanceRequest } from '../../store/maintenanceRequest'
import Select from '../Select'
import Textarea from '../Textarea'

export default function CreateMaintenanceRequestForm() {
  const formLoading = useMaintenanceRequest((state) => state.formLoading)
  const machines = useMaintenanceRequest((state) => state.machines)
  const { errors, handleChange, touched, upperCaseHandleChange, values } =
    useForm()

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
        value={values.machineCode ?? ''}
        optionsMap={machines ?? {}}
        onChange={handleChange}
        error={errors.machineCode}
        touched={touched.machineCode}
      />
      <Textarea
        id='description'
        label='Descripción'
        placeholder='Solicitud de mantenimiento a la máquina...'
        value={values.description ?? ''}
        onChange={upperCaseHandleChange()}
        error={errors.description}
        touched={touched.description}
        rows={6}
      />
    </>
  )
}
