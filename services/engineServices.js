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

export function getEngineUrlExternal(machineCode, complete) {
  return `${getMachineByCodeUrlExternal(machineCode)}${
    complete ? ENGINE_URL_REGULAR : ''
  }`
}
export function getEngineByCodeUrlExternal(machineCode, engineCode) {
  return `${getEngineUrlExternal(machineCode, true)}/${engineCode}`
}

function addEngineUrlInternal(machineCode) {
  return `${getMachineByCodeUrlInternal(machineCode)}/add-engine`
}
function editEngineUrlInternal(machineCode, engineCode) {
  return `${getMachineByCodeUrlInternal(
    machineCode
  )}/edit-engine?engineCode=${engineCode}`
}

export function addEngineConfig(machineCode) {
  return {
    method: HTTP_METHODS.POST,
    url: addEngineUrlInternal(machineCode),
    dtoValidation: createEngineDto,
  }
}
export function editEngineConfig(machineCode, engineCode) {
  return {
    method: HTTP_METHODS.PUT,
    url: editEngineUrlInternal(machineCode, engineCode),
    dtoValidation: updateEngineDto,
  }
}
