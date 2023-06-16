import { HTTP_METHODS } from '.'
import { createEngineDto, updateEngineDto } from '../schemas/engine'
import {
  getMachineByCodeUrlExternal,
  getMachineByCodeUrlInternal,
  getMachineByCodeUrlRegular,
} from './machineServices'

const ENGINE_URL_REGULAR = '/engines'
export function getEngineUrlRegular(machineCode) {
  return `${getMachineByCodeUrlRegular(machineCode)}/get-engine`
}
export const ENGINE_GET_FIELDS_TO_CREATE_URL_REGULAR = `${ENGINE_URL_REGULAR}/fields/create`
export function engineGetFieldsToUpdateUrlRegular(engineCode) {
  return `${ENGINE_URL_REGULAR}/${engineCode}/fields/update`
}

export const ENGINE_GET_FIELDS_TO_CREATE_URL_EXTERNAL =
  ENGINE_GET_FIELDS_TO_CREATE_URL_REGULAR
export function engineGetFieldsToUpdateUrlExternal(engineCode) {
  return `${ENGINE_URL_REGULAR}/${engineCode}/fields/update`
}

export function getEngineByCodeUrlExternal(engineCode) {
  return `${ENGINE_URL_REGULAR}/${engineCode}`
}

export function getEngineUrlExternal(machineCode, complete) {
  return `${getMachineByCodeUrlExternal(machineCode)}${
    complete ? ENGINE_URL_REGULAR : ''
  }`
}

const ENGINE_URL_INTERNAL = `/api${ENGINE_URL_REGULAR}`

function addEngineUrlInternal(machineCode) {
  return `${getMachineByCodeUrlInternal(machineCode)}/add-engine`
}

export function addEngineConfig(machineCode) {
  return {
    method: HTTP_METHODS.POST,
    url: addEngineUrlInternal(machineCode),
    dtoValidation: createEngineDto,
  }
}
export function editEngineConfig(engineCode) {
  return {
    method: HTTP_METHODS.PUT,
    url: `${ENGINE_URL_INTERNAL}/${engineCode}`,
    dtoValidation: updateEngineDto,
  }
}
