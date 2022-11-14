import { useForm } from '../../../../context/providers/FormContext'
import { BOOT_VALUES_MAP } from '../../../../schemas/engine'
import Input from '../../../Input'
import Select from '../../../Select'

export default function EditEngineForm() {
  const { errors, handleChange, touched, upperCaseHandleChange, values } =
    useForm()

  return (
    <>
      <Input
        id='function'
        label='Función'
        placeholder='Función del motor'
        value={values.function}
        onChange={upperCaseHandleChange()}
        error={touched.function ? errors.function : undefined}
      />
      <Input
        id='mark'
        label='Marca'
        placeholder='Marca del motor'
        value={values.mark}
        onChange={upperCaseHandleChange()}
        error={touched.mark ? errors.mark : undefined}
      />
      <Input
        id='type'
        label='Tipo'
        placeholder='Tipo del motor'
        value={values.type}
        onChange={upperCaseHandleChange()}
        error={touched.type ? errors.type : undefined}
      />
      <Input
        id='powerHp'
        label='Potencia [Hp]'
        placeholder='Potencia [Hp] del motor'
        value={values.powerHp}
        onChange={handleChange}
        error={touched.powerHp ? errors.powerHp : undefined}
        type='number'
      />
      <Input
        id='powerKw'
        label='Potencia [Kw]'
        placeholder='Potencia [Kw] del motor'
        value={values.powerKw}
        onChange={handleChange}
        error={touched.powerKw ? errors.powerKw : undefined}
        type='number'
      />
      <Input
        id='voltage'
        label='Tensión [V]'
        placeholder='Tensión [V] del motor'
        value={values.voltage}
        onChange={upperCaseHandleChange()}
        error={touched.voltage ? errors.voltage : undefined}
      />
      <Input
        id='current'
        label='Corriente [A]'
        placeholder='Corriente [A] del motor'
        value={values.current}
        onChange={upperCaseHandleChange()}
        error={touched.current ? errors.current : undefined}
      />
      <Input
        id='rpm'
        label='rpm'
        placeholder='rpm del motor'
        value={values.rpm}
        onChange={handleChange}
        error={touched.rpm ? errors.rpm : undefined}
        type='number'
      />
      <Input
        id='cosPhi'
        label='Cos ϕ'
        placeholder='Cos ϕ del motor'
        value={values.cosPhi}
        onChange={handleChange}
        error={touched.cosPhi ? errors.cosPhi : undefined}
        type='number'
      />
      <Input
        id='performance'
        label='Rendimiento'
        placeholder='Rendimiento del motor'
        value={values.performance}
        onChange={handleChange}
        error={touched.performance ? errors.performance : undefined}
        type='number'
      />
      <Input
        id='frequency'
        label='Frecuencia'
        placeholder='Frecuencia del motor'
        value={values.frequency}
        onChange={handleChange}
        error={touched.frequency ? errors.frequency : undefined}
        type='number'
      />
      <Input
        id='poles'
        label='N° polos'
        placeholder='N° polos del motor'
        value={values.poles}
        onChange={handleChange}
        error={touched.poles ? errors.poles : undefined}
        type='number'
      />
      <Input
        id='ip'
        label='Grado de protección'
        placeholder='Grado de protección del motor'
        value={values.ip}
        onChange={handleChange}
        error={touched.ip ? errors.ip : undefined}
        type='number'
      />
      <Select
        id='boot'
        label='Arranque'
        value={values.boot}
        placeholder='Arranque del motor'
        optionsMap={BOOT_VALUES_MAP}
        onChange={handleChange}
        error={touched.boot ? errors.boot : undefined}
      />
    </>
  )
}
