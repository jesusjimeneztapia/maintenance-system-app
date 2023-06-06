import { Modal } from 'flowbite-react'
import { useStores } from '../../store/stores'
import { Title } from '@tremor/react'
import StoreForm from './StoreForm'
import EditStoreForm from './EditStoreForm'
import { updateStoreDto } from '../../schemas/store'

export default function EditStoreModal() {
  const [selectedStore, setSelectedStore, updateStore] = useStores((state) => [
    state.selectedStore,
    state.setSelectedStore,
    state.updateStore,
  ])

  if (selectedStore == null) {
    return <></>
  }

  const handleClose = () => {
    setSelectedStore()
  }

  const handleUpdate = (updatedStore) => {
    const { machineCode } = selectedStore
    updateStore({ machineCode, updatedStore })
    setSelectedStore()
  }

  return (
    <Modal
      className='h-screen'
      show={true}
      onClose={handleClose}
      position='top-center'
      size='3xl'
      dismissible
    >
      <Modal.Header>Máquina {selectedStore?.machineName}</Modal.Header>
      <Modal.Body className='max-sm:px-4 max-sm:pt-2'>
        <Title className='mb-5'>
          Repuesto {selectedStore?.name}({selectedStore?.unit?.name})
        </Title>
        <div className='p-1 gap-4 max-h-[calc(100vh-13rem)] max-sm:max-h-[calc(100vh-12rem)] overflow-y-auto'>
          <StoreForm
            id={selectedStore.id}
            dtoValidation={updateStoreDto}
            initialValues={selectedStore}
            method='PUT'
            title='Editar repuesto'
            url={`/api/stores/${selectedStore.id}`}
            postSubmit={{ update: handleUpdate }}
            full
          >
            <EditStoreForm />
          </StoreForm>
        </div>
      </Modal.Body>
    </Modal>
  )
}
