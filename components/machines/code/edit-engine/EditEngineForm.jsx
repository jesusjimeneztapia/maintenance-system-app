import { useForm } from '../../../../context/providers/FormContext'
import Input from '../../../Input'
import Select from '../../../Select'

export default function EditEngineForm({ fields }) {
  const {
    errors,
    handleChange,
    initialValues,
    touched,
    upperCaseHandleChange,
    values,
    setValues,
  } = useForm()

  const handleChangeBootId = ({ target: { value } }) => {
    setValues((values) => ({ ...values, bootId: +value }))
  }

  return (
    <>
      <Input
        id='function'
        label='Función'
        placeholder={initialValues.function || 'MOTOR VIBRADOR'}
        value={values.function ?? ''}
        onChange={upperCaseHandleChange()}
        error={errors.function}
        touched={touched.function}
      />
      <Input
        id='mark'
        label='Marca'
        placeholder={initialValues.mark || '-'}
        value={values.mark ?? ''}
        onChange={upperCaseHandleChange()}
        error={errors.mark}
        touched={touched.mark}
      />
      <Input
        id='type'
        label='Tipo'
        placeholder={initialValues.type || '-'}
        value={values.type ?? ''}
        onChange={upperCaseHandleChange()}
        error={errors.type}
        touched={touched.type}
      />
      <Input
        id='powerHp'
        label='Potencia [Hp]'
        placeholder={initialValues.powerHp || '2'}
        value={values.powerHp ?? ''}
        onChange={handleChange}
        error={errors.powerHp}
        touched={touched.powerHp}
        type='number'
      />
      <Input
        id='powerKw'
        label='Potencia [Kw]'
        placeholder={initialValues.powerKw || '1.5'}
        value={values.powerKw ?? ''}
        onChange={handleChange}
        error={errors.powerKw}
        touched={touched.powerKw}
        type='number'
      />
      <Input
        id='voltage'
        label='Tensión [V]'
        placeholder={initialValues.voltage || '380'}
        value={values.voltage ?? ''}
        onChange={upperCaseHandleChange()}
        error={errors.voltage}
        touched={touched.voltage}
      />
      <Input
        id='current'
        label='Corriente [A]'
        placeholder={initialValues.current || '4.1'}
        value={values.current ?? ''}
        onChange={upperCaseHandleChange()}
        error={errors.current}
        touched={touched.current}
      />
      <Input
        id='rpm'
        label='rpm'
        placeholder={initialValues.rpm || '3415'}
        value={values.rpm ?? ''}
        onChange={handleChange}
        error={errors.rpm}
        touched={touched.rpm}
        type='number'
      />
      <Input
        id='cosPhi'
        label='Cos ϕ'
        placeholder={initialValues.cosPhi || '0.94'}
        value={values.cosPhi ?? ''}
        onChange={handleChange}
        error={errors.cosPhi}
        touched={touched.cosPhi}
        type='number'
      />
      <Input
        id='performance'
        label='Rendimiento'
        placeholder={initialValues.performance || '0.75'}
        value={values.performance ?? ''}
        onChange={handleChange}
        error={errors.performance}
        touched={touched.performance}
        type='number'
      />
      <Input
        id='frequency'
        label='Frecuencia [Hz]'
        placeholder={initialValues.frequency || '50'}
        value={values.frequency ?? ''}
        onChange={handleChange}
        error={errors.frequency}
        touched={touched.frequency}
        type='number'
      />
      <Input
        id='poles'
        label='N° polos'
        placeholder={initialValues.poles || '2'}
        value={values.poles ?? ''}
        onChange={handleChange}
        error={errors.poles}
        touched={touched.poles}
        type='number'
      />
      <Input
        id='ip'
        label='Grado de protección'
        placeholder={initialValues.ip || '44'}
        value={values.ip ?? ''}
        onChange={handleChange}
        error={errors.ip}
        touched={touched.ip}
        type='number'
      />
      <Select
        id='bootId'
        label='Arranque'
        value={values.bootId ?? ''}
        placeholder='Seleccione el arranque del motor'
        optionsMap={fields?.boots ?? {}}
        onChange={handleChangeBootId}
        error={errors.bootId}
        touched={touched.bootId}
      />
    </>
  )
}
