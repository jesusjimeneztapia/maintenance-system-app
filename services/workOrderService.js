import { HTTP_METHODS } from '.'
import { createWorkOrderDto, updateWorkOrderDto } from '../schemas/workOrder'
import axios from 'redaxios'

export const WORK_ORDER_URL_REGULAR = '/work-orders'
export const GET_WORK_ORDERS_COUNT_REGULAR = `${WORK_ORDER_URL_REGULAR}/count`

export const WORK_ORDER_URL_EXTERNAL = WORK_ORDER_URL_REGULAR
export const GET_WORK_ORDERS_COUNT_EXTERNAL = `${WORK_ORDER_URL_EXTERNAL}/count`
export function updateWorkOrderByIdUrlExternal(workOrderId) {
  return `${WORK_ORDER_URL_EXTERNAL}/${workOrderId}`
}
export function workOrderWithIdUrlExternal(workOrderId) {
  return `${WORK_ORDER_URL_EXTERNAL}/${workOrderId}`
}

const WORK_ORDER_URL_INTERNAL = `/api${WORK_ORDER_URL_EXTERNAL}`
const CREATE_WORK_ORDER_URL_INTERNAL = `${WORK_ORDER_URL_INTERNAL}/create`
export function updateWorkOrderUrlInternal(workOrderId) {
  return `${WORK_ORDER_URL_INTERNAL}/${workOrderId}/update`
}
export function deleteWorkOrderUrlInternal(workOrderId) {
  return `${WORK_ORDER_URL_INTERNAL}/${workOrderId}/delete`
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

export async function getWorkOrderById({ id }) {
  const { data } = await axios.get(`${WORK_ORDER_URL_INTERNAL}/${id}`)
  return data
}
