import { useWorkOrderList } from '../../context/providers/WorkOrderListContext'
import { updateWorkOrderUrlInternal } from '../../services/workOrderService'
import { useToast } from '../../context/providers/ToastContext'
import axios from 'redaxios'
import WorkOrderInformation from './edit/WorkOrderInformation'
import { isInspection } from '../../libs/workOrder'
import { Modal } from 'flowbite-react'
import { Button, Flex, Tab, TabList, Title } from '@tremor/react'
import InfoIcon from '../icons/InfoIcon'
import { useEffect, useState } from 'react'
import WorkOrderEditForm from './edit/WorkOrderEditForm'
import ArrowReturnRight from '../icons/ArrowReturnRight'

export default function EditWorkOrderModal() {
  const { request, showToast } = useToast()
  const { selectedWorkOrder, deselectWorkOrder, updateWorkOrder } =
    useWorkOrderList()
  const [selectedTab, setSelectedTab] = useState(0)

  useEffect(() => {
    if (!selectedWorkOrder) {
      setSelectedTab(0)
    }
  }, [selectedWorkOrder])

  if (!selectedWorkOrder) {
    return <></>
  }
  const toDoing = isInspection(selectedWorkOrder)

  const passToValidated = async () => {
    showToast({
      autoClose: false,
      close: true,
      color: 'info',
      position: 'center',
      children: `La orden de trabajo ${selectedWorkOrder.code} se está actualizando...`,
    })
    const response = await request(
      async () => {
        const { data } = await axios.put(
          updateWorkOrderUrlInternal(selectedWorkOrder.code),
          {
            state: toDoing ? 'DOING' : 'VALIDATED',
            securityMeasureStarts: [],
            protectionEquipments: [],
            startDate: new Date(),
            allow: toDoing,
          }
        )
        return data
      },
      {
        autoClose: true,
        close: true,
        color: 'success',
        children: `La orden de trabajo ${selectedWorkOrder.code} se actualizó con éxito`,
      }
    )
    if (response) {
      handleUpdate(response)
    }
  }

  const handleUpdate = (updatedWorkOrder) => {
    updateWorkOrder(updatedWorkOrder)
    deselectWorkOrder()
  }

  return (
    <Modal
      className='h-screen'
      dismissible={true}
      show={true}
      onClose={deselectWorkOrder}
      size='7xl'
      position='top-center'
    >
      <Modal.Header>Órden de trabajo #{selectedWorkOrder.code}</Modal.Header>
      <Modal.Body className='max-sm:px-4 max-sm:pt-2'>
        <TabList
          defaultValue={selectedTab}
          color='slate'
          onValueChange={(value) => setSelectedTab(value)}
        >
          <Tab value={0} text='Información' icon={InfoIcon} />
          {selectedWorkOrder?.state !== 'DONE' &&
          selectedWorkOrder?.state !== 'PLANNED' ? (
            <Tab value={1} text='Siguiente estado' icon={ArrowReturnRight} />
          ) : (
            <></>
          )}
        </TabList>
        <Flex
          className='p-1 gap-4 max-h-[calc(100vh-12rem)] max-sm:max-h-[calc(100vh-11rem)] overflow-y-auto'
          flexDirection='col'
          alignItems=''
        >
          <Flex className='pt-6 max-sm:pt-4 gap-2 max-sm:flex-col max-sm:items-start'>
            <Title className='w-full'>{selectedWorkOrder?.activityName}</Title>
            <Flex className='gap-2' justifyContent='end'>
              {selectedWorkOrder?.state === 'PLANNED' && (
                <Button
                  className='max-sm:self-end'
                  color='amber'
                  onClick={passToValidated}
                >
                  Pasar a {toDoing ? 'ejecución' : 'validada'}
                </Button>
              )}
              {selectedWorkOrder?.state !== 'DONE' && (
                <Button className='max-sm:self-end' color='red'>
                  Eliminar
                </Button>
              )}
            </Flex>
          </Flex>
          {selectedTab === 0 ? (
            <WorkOrderInformation {...selectedWorkOrder} />
          ) : (
            <WorkOrderEditForm
              {...selectedWorkOrder}
              updateWorkOrder={handleUpdate}
            />
          )}
        </Flex>
      </Modal.Body>
    </Modal>
  )
}
