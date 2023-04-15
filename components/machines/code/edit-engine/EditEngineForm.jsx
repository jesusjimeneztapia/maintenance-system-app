import { useForm } from '../../../../context/providers/FormContext'
import { BOOT_VALUES_MAP } from '../../../../schemas/engine'
import Input from '../../../Input'
import Select from '../../../Select'

export default function EditEngineForm() {
  const {
    errors,
    handleChange,
    initialValues,
    touched,
    upperCaseHandleChange,
    values,
  } = useForm()

  return (
    <>
      <Input
        id='function'
        label='Función'
        placeholder={initialValues.function || 'MOTOR #1'}
        value={values.function}
        onChange={upperCaseHandleChange()}
        error={errors.function}
        touched={touched.function}
      />
      <Input
        id='mark'
        label='Marca'
        placeholder={initialValues.mark || '-'}
        value={values.mark}
        onChange={upperCaseHandleChange()}
        error={errors.mark}
        touched={touched.mark}
      />
      <Input
        id='type'
        label='Tipo'
        placeholder={initialValues.type || '-'}
        value={values.type}
        onChange={upperCaseHandleChange()}
        error={errors.type}
        touched={touched.type}
      />
      <Input
        id='powerHp'
        label='Potencia [Hp]'
        placeholder={initialValues.powerHp || '99.9'}
        value={values.powerHp}
        onChange={handleChange}
        error={errors.powerHp}
        touched={touched.powerHp}
        type='number'
      />
      <Input
        id='powerKw'
        label='Potencia [Kw]'
        placeholder={initialValues.powerKw || '99.9'}
        value={values.powerKw}
        onChange={handleChange}
        error={errors.powerKw}
        touched={touched.powerKw}
        type='number'
      />
      <Input
        id='voltage'
        label='Tensión [V]'
        placeholder={initialValues.voltage || '-'}
        value={values.voltage}
        onChange={upperCaseHandleChange()}
        error={errors.voltage}
        touched={touched.voltage}
      />
      <Input
        id='current'
        label='Corriente [A]'
        placeholder={initialValues.current || '-'}
        value={values.current}
        onChange={upperCaseHandleChange()}
        error={errors.current}
        touched={touched.current}
      />
      <Input
        id='rpm'
        label='rpm'
        placeholder={initialValues.rpm || '0'}
        value={values.rpm}
        onChange={handleChange}
        error={errors.rpm}
        touched={touched.rpm}
        type='number'
      />
      <Input
        id='cosPhi'
        label='Cos ϕ'
        placeholder={initialValues.cosPhi || '99.99'}
        value={values.cosPhi}
        onChange={handleChange}
        error={errors.cosPhi}
        touched={touched.cosPhi}
        type='number'
      />
      <Input
        id='performance'
        label='Rendimiento'
        placeholder={initialValues.performance || '99.99'}
        value={values.performance}
        onChange={handleChange}
        error={errors.performance}
        touched={touched.performance}
        type='number'
      />
      <Input
        id='frequency'
        label='Frecuencia'
        placeholder={initialValues.frequency || '0'}
        value={values.frequency}
        onChange={handleChange}
        error={errors.frequency}
        touched={touched.frequency}
        type='number'
      />
      <Input
        id='poles'
        label='N° polos'
        placeholder={initialValues.poles || '0'}
        value={values.poles}
        onChange={handleChange}
        error={errors.poles}
        touched={touched.poles}
        type='number'
      />
      <Input
        id='ip'
        label='Grado de protección'
        placeholder={initialValues.ip || '0'}
        value={values.ip}
        onChange={handleChange}
        error={errors.ip}
        touched={touched.ip}
        type='number'
      />
      <Select
        id='boot'
        label='Arranque'
        value={values.boot}
        placeholder='Seleccione el arranque del motor'
        optionsMap={BOOT_VALUES_MAP}
        onChange={handleChange}
        error={errors.boot}
        touched={touched.boot}
      />
    </>
  )
}
