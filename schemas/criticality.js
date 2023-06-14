import { z } from 'zod'

const MIN_CRITICALITY_ID = 1
const MAX_CRITICALITY_ID = 3
const INVALID_TYPE_ERROR =
  'La criticidad de la máquina debe ser ALTA, MEDIA o BAJA'

export const CRITICALITY_ID_INITIAL_VALUE = undefined

export const CRITICALITY_ID_ZOD = z
  .number({
    required_error: 'La criticidad de la máquina es requerida',
  })
  .min(MIN_CRITICALITY_ID, INVALID_TYPE_ERROR)
  .max(MAX_CRITICALITY_ID, INVALID_TYPE_ERROR)
