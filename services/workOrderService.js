import { HTTP_METHODS } from '.'
import { createWorkOrderDto, updateWorkOrderDto } from '../schemas/workOrder'

export const WORK_ORDER_URL_REGULAR = '/work-orders'
export const GET_WORK_ORDERS_COUNT_REGULAR = `${WORK_ORDER_URL_REGULAR}/count`

export const WORK_ORDER_URL_EXTERNAL = WORK_ORDER_URL_REGULAR
export const GET_WORK_ORDERS_COUNT_EXTERNAL = `${WORK_ORDER_URL_EXTERNAL}/count`
export function updateWorkOrderByIdUrlExternal(workOrderId) {
  return `${WORK_ORDER_URL_EXTERNAL}/${workOrderId}`
}

const WORK_ORDER_URL_INTERNAL = `/api${WORK_ORDER_URL_EXTERNAL}`
const CREATE_WORK_ORDER_URL_INTERNAL = `${WORK_ORDER_URL_INTERNAL}/create`
export function updateWorkOrderUrlInternal(workOrderId) {
  return `${WORK_ORDER_URL_INTERNAL}/${workOrderId}/update`
}

export const CREATE_WORK_ORDER_CONFIG = {
  method: HTTP_METHODS.POST,
  url: CREATE_WORK_ORDER_URL_INTERNAL,
  dtoValidation: createWorkOrderDto,
}
export function getUpdateWorkOrderConfig(workOrderId) {
  return {
    method: HTTP_METHODS.PUT,
    url: updateWorkOrderUrlInternal(workOrderId),
    dtoValidation: updateWorkOrderDto,
  }
}
