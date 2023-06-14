import { z } from 'zod'

const MIN_AREA_ID = 1
const MAX_AREA_ID = 7
const INVALID_TYPE_ERROR =
  'El área de la máquina debe ser GENERAL, VIGUETAS, SERVICIOS, PRE EXPANDIDO, BLOQUEADO, CORTE o RECICLADO'

export const AREA_ID_INITIAL_VALUE = undefined

export const AREA_ID_ZOD = z
  .number({
    required_error: 'El área de la máquina es requerida',
  })
  .min(MIN_AREA_ID, INVALID_TYPE_ERROR)
  .max(MAX_AREA_ID, INVALID_TYPE_ERROR)
