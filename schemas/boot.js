import { z } from 'zod'

const MIN_BOOT_ID = 1
const MAX_BOOT_ID = 2
const INVALID_TYPE_ERROR = 'El arranque del motor debe ser DIRECTO o SUAVE'

export const BOOT_ID_ZOD = z
  .number({
    required_error: 'El arranque del motor es requerido',
  })
  .min(MIN_BOOT_ID, INVALID_TYPE_ERROR)
  .max(MAX_BOOT_ID, INVALID_TYPE_ERROR)
