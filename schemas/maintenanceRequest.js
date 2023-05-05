import { z } from 'zod'

export const CREATE_MAINTENANCE_REQUEST_INITIAL_VALUES = {
  machineCode: null,
  description: null,
}

const maintenanceRequestShapeCreate = {
  machineCode: z
    .string({
      required_error: 'El código de la máquina es requerido',
      invalid_type_error: 'El código de la máquina es requerido',
    })
    .regex(/^[A-Z]{2}-[0-9]{2}-[A-Z]{3}-[0-9]{2}$/, {
      message:
        "El código de la máquina debe tener el formato: LL-NN-LLL-NN (donde 'L' es letra mayúscula y 'N' es número)",
    }),
  description: z
    .string({
      required_error:
        'La descripción de la solicitud de mantenimiento es requerido',
      invalid_type_error:
        'La descripción de la solicitud de mantenimiento es requerido',
    })
    .min(
      10,
      'La descripción de la solicitud de mantenimiento debe tener al menos 10 caracteres'
    ),
}
export const createMaintenanceRequestDto = z.object(
  maintenanceRequestShapeCreate
)
