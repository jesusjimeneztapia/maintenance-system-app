import {
  Button,
  Flex,
  Subtitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from '@tremor/react'
import EditSolidIcon from '../icons/EditSolidIcon'
import TrashSolidIcon from '../icons/TrashSolidIcon'
import { useStores } from '../../store/stores'
import { useMemo } from 'react'
import { useToast } from '../../store/toast'
import * as storeService from '../../services/storeServices'
import EditStoreModal from './EditStoreModal'

function useStoreTable() {
  const [request, reset, show] = useToast((state) => [
    state.request,
    state.reset,
    state.show,
  ])
  const stores = useStores((state) => state.stores)
  const selectedMachine = useStores((state) => state.selectedMachine)
  const deleteStore = useStores((state) => state.deleteStoreById)
  const setSelectedStore = useStores((state) => state.setSelectedStore)

  const filteredStores = useMemo(() => {
    if (selectedMachine === '') {
      return stores
    }
    return stores.filter(({ name }) => name.startsWith(selectedMachine))
  }, [stores, selectedMachine])

  const deleteStoreById =
    ({ machineCode, storeId }) =>
    async () => {
      const response = await request(
        async () => storeService.deleteStoreById(storeId),
        {
          autoClose: true,
          close: true,
          color: 'success',
          children: `El repuesto se eliminó exitósamente`,
        }
      )
      if (response) {
        deleteStore({ machineCode, storeId })
      }
    }

  const handleClickDeleteStore =
    ({ machineCode, storeId, storeName, machineName }) =>
    () => {
      show({
        autoClose: false,
        close: false,
        color: 'dark',
        position: 'right',
        children: (
          <Flex className='gap-1' flexDirection='col' alignItems=''>
            <Subtitle className='text-inherit'>Eliminar repuesto</Subtitle>
            <Text className='text-inherit'>
              ¿Seguro que quiere eliminar el repuesto
              <span className='font-bold'>{` ${storeName} `}</span>de la máquina
              <span className='font-bold'>{` ${machineName}`}</span>?
            </Text>
            <Flex className='gap-4 pt-1' justifyContent='end'>
              <Button
                onClick={deleteStoreById({ machineCode, storeId })}
                color='amber'
              >
                Si
              </Button>
              <Button onClick={reset} color='red'>
                No
              </Button>
            </Flex>
          </Flex>
        ),
      })
    }

  return {
    filteredStores,
    selectedMachine,
    handleClickDeleteStore,
    setSelectedStore,
  }
}

export default function StoreTable() {
  const {
    filteredStores,
    selectedMachine,
    handleClickDeleteStore,
    setSelectedStore,
  } = useStoreTable()

  if (filteredStores.length === 0) {
    return (
      <Text className='mt-6 text-center'>
        No existe repuestos para la máquina
        <span className='font-bold'>{` ${selectedMachine}`}</span>
      </Text>
    )
  }

  return (
    <>
      <Table className='mt-6'>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Máquina</TableHeaderCell>
            <TableHeaderCell>Repuestos</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredStores.map(
            ({ code: machineCode, name: machineName, stores }) => (
              <TableRow key={machineCode}>
                <TableCell className='align-top'>
                  <Title>{machineCode}</Title>
                  <Text>{machineName}</Text>
                </TableCell>
                <TableCell className='w-full'>
                  <Table>
                    <TableHead>
                      <TableRow className='border-b border-gray-200'>
                        <TableHeaderCell className='pl-0 pr-2 py-2 font-medium'>
                          Nombre
                        </TableHeaderCell>
                        <TableHeaderCell className='py-2 px-2 text-center font-medium'>
                          Cantidad
                        </TableHeaderCell>
                        <TableHeaderCell className='pt-0 py-2 text-center font-medium'>
                          Cantidad mínima
                        </TableHeaderCell>
                        <TableHeaderCell className='py-2 px-2 text-center font-medium'>
                          Editar
                        </TableHeaderCell>
                        <TableHeaderCell className='pr-0 pl-2 py-2 text-right font-medium'>
                          Eliminar
                        </TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stores.map(
                        ({ id, name, amount, minimumAmount, unit }) => (
                          <TableRow
                            key={id}
                            className={
                              amount < minimumAmount && 'bg-rose-200/60'
                            }
                          >
                            <TableCell className='pl-0 pr-2 py-2 w-full'>
                              {name}
                            </TableCell>
                            <TableCell className='px-2 py-2 text-center'>
                              {amount}
                            </TableCell>
                            <TableCell className='px-2 py-2 text-center'>
                              {minimumAmount}
                            </TableCell>
                            <TableCell className='px-2 py-2 text-center'>
                              <Button
                                color='gray'
                                icon={() => (
                                  <EditSolidIcon className='w-5 h-5 text-inherit' />
                                )}
                                onClick={() =>
                                  setSelectedStore({
                                    id,
                                    name,
                                    amount,
                                    minimumAmount,
                                    machineName,
                                    machineCode,
                                    unit,
                                  })
                                }
                              />
                            </TableCell>
                            <TableCell className='pl-2 pr-0 py-2 text-right'>
                              <Button
                                color='rose'
                                icon={() => (
                                  <TrashSolidIcon className='w-5 h-5 text-inherit' />
                                )}
                                onClick={handleClickDeleteStore({
                                  machineCode,
                                  machineName,
                                  storeId: id,
                                  storeName: name,
                                })}
                              />
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
      <EditStoreModal />
    </>
  )
}
