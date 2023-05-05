import { HTTP_METHODS } from '.'
import { createMachineDto, updateMachineDto } from '../schemas/machine'
import axios from 'redaxios'

export const MACHINE_URL_REGULAR = '/machines'
export function getMachineByCodeUrlRegular(machineCode) {
  return `${MACHINE_URL_REGULAR}/${machineCode}`
}

export const MACHINE_URL_EXTERNAL = `${MACHINE_URL_REGULAR}`
export function getMachineByCodeUrlExternal(machineCode) {
  return `${MACHINE_URL_EXTERNAL}/${machineCode}`
}

const MACHINE_URL_INTERNAL = `/api${MACHINE_URL_EXTERNAL}`
export function getMachineByCodeUrlInternal(machineCode) {
  return `${MACHINE_URL_INTERNAL}/${machineCode}`
}
const ADD_MACHINE_URL = `${MACHINE_URL_INTERNAL}/add`
const UPDATE_MACHINE_URL = `${MACHINE_URL_INTERNAL}/update`

export const ADD_MACHINE_CONFIG = {
  method: HTTP_METHODS.POST,
  url: ADD_MACHINE_URL,
  dtoValidation: createMachineDto,
}
export const UPDATE_MACHINE_CONFIG = {
  method: HTTP_METHODS.PUT,
  url: UPDATE_MACHINE_URL,
  dtoValidation: updateMachineDto,
}

export async function getMachines() {
  const { data } = await axios.get(MACHINE_URL_INTERNAL)
  return data
}
