import {
  Button,
  Col,
  Flex,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from '@tremor/react'
import { useForm } from '../../../context/providers/FormContext'
import TrashSolidIcon from '../../icons/TrashSolidIcon'
import Input from '../../Input'
import Select from '../../Select'
import { useState } from 'react'
import PlusIcon from '../../icons/PlusIcon'

export default function SelectStoreForm() {
  const [selectedStore, setSelectedStore] = useState('')
  const [selectedAmount, setSelectedAmount] = useState('')
  const { values, setValues } = useForm()

  const updateUsedStores = ({ name, amount }) => {
    setValues((values) => {
      let usedStores = values.usedStores
      const storeIndex = usedStores.findIndex((store) => store.name === name)
      if (storeIndex < 0) {
        usedStores = [...usedStores, { name, amount }].sort(
          ({ name: n1 }, { name: n2 }) => n1.localeCompare(n2)
        )
      } else {
        usedStores[storeIndex] = { name, amount }
      }
      return { ...values, usedStores: [...usedStores] }
    })
  }

  const handleSelectStore = ({ target: { value } }) => {
    setSelectedStore(value)
  }
  const handleSelectAmount = ({ target: { value } }) => {
    setSelectedAmount(value)
  }
  const handleSubmitSelectStore = async (e) => {
    e.preventDefault()
    const name = selectedStore
    const amount = +selectedAmount
    updateUsedStores({ name, amount })
    setSelectedStore('')
    setSelectedAmount('')
  }

  const handleSubmitNewStore = async (e) => {
    e.preventDefault()
    const { target } = e
    const name = target.storeName.value
    const amount = +target.storeAmount.value
    updateUsedStores({ name, amount })
    target.storeName.value = ''
    target.storeAmount.value = ''
  }

  const removeStore = (name) => () => {
    setValues(({ usedStores, ...rest }) => {
      return {
        ...rest,
        usedStores: usedStores.filter((store) => store.name !== name),
      }
    })
  }

  return (
    <section>
      <Text className='text-slate-900 font-medium'>Repuestos utilizados</Text>
      {values.usedStores.length > 0 && (
        <Table>
          <TableHead>
            <TableRow className='border-b border-gray-200'>
              <TableHeaderCell className='pl-0 pr-2 py-2 font-medium'>
                Nombre
              </TableHeaderCell>
              <TableHeaderCell className='py-2 px-2 text-center font-medium'>
                Cantidad
              </TableHeaderCell>
              <TableHeaderCell className='pr-0 pl-2 py-2 text-right font-medium'>
                Eliminar
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {values.usedStores.map(({ name, amount }) => (
              <TableRow key={name}>
                <TableCell className='pl-0 pr-2 py-2 w-full'>{name}</TableCell>
                <TableCell className='px-2 py-2 text-center'>
                  {amount}
                </TableCell>
                <TableCell className='pl-2 pr-0 py-2 text-right'>
                  <Button
                    type='button'
                    color='rose'
                    icon={() => (
                      <TrashSolidIcon className='w-4 h-4 text-inherit' />
                    )}
                    onClick={removeStore(name)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {values.stores.length > 0 && (
        <form className='mb-2' onSubmitCapture={handleSubmitSelectStore}>
          <Grid className='gap-4' numCols={5}>
            <Col numColSpan={5} numColSpanSm={3}>
              <Select
                id='selectedStore'
                label='Repuesto'
                value={selectedStore}
                placeholder='Seleccione un repuesto'
                optionsMap={values.stores.reduce((acc, value) => {
                  const { name, amount } = value
                  return { ...acc, [name]: `${name} (${amount})` }
                }, {})}
                onChange={handleSelectStore}
                required
              />
            </Col>
            <Col numColSpan={5} numColSpanLg={2}>
              <Flex className='gap-2' alignItems='end'>
                <Input
                  id='selectedAmount'
                  label='Cantidad'
                  placeholder='0'
                  min={1}
                  max={
                    selectedStore
                      ? values.stores.find(({ name }) => name === selectedStore)
                          .amount
                      : 1
                  }
                  onChange={handleSelectAmount}
                  type='number'
                  value={selectedAmount}
                  required
                />
                <Button
                  color='amber'
                  icon={() => <PlusIcon className='w-6 h-6 text-inherit' />}
                />
              </Flex>
            </Col>
          </Grid>
        </form>
      )}
      <form onSubmitCapture={handleSubmitNewStore}>
        <Grid className='gap-4' numCols={5}>
          <Col numColSpan={5} numColSpanSm={3}>
            <Input
              id='storeName'
              label={values.stores.length > 0 ? '' : 'Repuesto'}
              placeholder='REPUESTO'
              onChange={({ target }) =>
                (target.value = target.value.toUpperCase())
              }
              minLength={8}
              required
            />
          </Col>
          <Col numColSpan={5} numColSpanLg={2}>
            <Flex className='gap-2' alignItems='end'>
              <Input
                id='storeAmount'
                label={values.stores.length > 0 ? '' : 'Cantidad'}
                placeholder='0'
                min={1}
                type='number'
                required
              />
              <Button
                color='amber'
                icon={() => <PlusIcon className='w-6 h-6 text-inherit' />}
              />
            </Flex>
          </Col>
        </Grid>
      </form>
    </section>
  )
}
