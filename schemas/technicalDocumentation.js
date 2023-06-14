import { z } from 'zod'

const MIN_TECHNICAL_DOCUMENTATION_ID = 1
const MAX_TECHNICAL_DOCUMENTATION_ID = 4
const INVALID_TYPE_ERROR =
  'La documentación técnica de la máquina debe ser MANUAL DE OPERACIONES, MANUAL DE MANTENIMIENTO, PLANOS ELÉCTRICOS o PLANOS MECÁNICOS'

export const TECHNICAL_DOCUMENTATION_INITIAL_VALUE = []

const TECHNICAL_DOCUMENTATION_ID_ZOD = z
  .number()
  .min(MIN_TECHNICAL_DOCUMENTATION_ID, INVALID_TYPE_ERROR)
  .max(MAX_TECHNICAL_DOCUMENTATION_ID, INVALID_TYPE_ERROR)

export const TECHNICAL_DOCUMENTATION_ARRAY_ZOD = z
  .union([
    TECHNICAL_DOCUMENTATION_ID_ZOD,
    TECHNICAL_DOCUMENTATION_ID_ZOD.array(),
  ])
  .optional()
  .transform((value) =>
    value == null
      ? []
      : typeof value === 'number'
      ? [value]
      : [...new Set(value)]
  )
