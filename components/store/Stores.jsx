import { Card, Text } from '@tremor/react'
import { useStores } from '../../store/stores'
import StoreTable from './StoreTable'
import SearchStoreByMachine from './SearchStoreByMachine'

export default function Stores() {
  const stores = useStores((state) => state.stores)

  return (
    <Card>
      {stores.length < 1 ? (
        <Text className='text-center'>No existen repuestos</Text>
      ) : (
        <>
          <SearchStoreByMachine />
          <StoreTable />
        </>
      )}
    </Card>
  )
}
