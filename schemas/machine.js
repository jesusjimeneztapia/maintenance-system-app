import { z } from 'zod'

export const MACHINE_INITIAL_VALUES = {
  code: '',
  name: '',
  maker: '',
  model: '',
  function: '',
  location: '',
  area: '',
  specificData: '',
  criticality: '',
  technicalDocumentation: [],
  image: undefined,
}

export const AREA_VALUES_MAP = {
  PRE_EXPANDED: 'PRE EXPANDIDO',
  RECYCLED: 'RECICLADO',
  LOCKED: 'BLOQUEADO',
  CUTTING: 'CORTE',
  PRESTRESSED_JOISTS: 'VIGUETAS PRETENSADAS',
  SERVICES: 'SERVICIOS',
}

export const TECHNICAL_DOCUMENTATION_VALUES_MAP = {
  OPERATIONS_MANUAL: 'MANUAL DE OPERACIONES',
  MAINTENANCE_MANUAL: 'MANTENIMIENTO MANUAL',
  ELECTRICAL_PLANS: 'PLANOS ELÉCTRICOS',
  MECHANICAL_PLANS: 'PLANOS MECÁNICOS',
}

export const CRITICALITY_VALUES_MAP = {
  HIGH: 'ALTA',
  MEDIUM: 'MEDIA',
  LOW: 'BAJA',
}

const machineShapeUpdate = {
  name: z
    .string({ required_error: 'El nombre de la máquina es requerido' })
    .min(1, {
      message: 'El nombre de la máquina debe tener al menos 1 caracter',
    }),
  maker: z
    .string({
      required_error: 'El fabricante de la máquina es requerido',
    })
    .min(1, {
      message: 'El fabricante de la máquina debe tener al menos 1 caracter',
    }),
  location: z
    .string({
      required_error: 'La ubicación de la máquina es requerido',
    })
    .min(3, {
      message: 'La ubicación de la máquina debe tener al menos 3 caracteres',
    })
    .max(11, {
      message: 'La ubicación de la máquina debe tener máximo 11 caracteres',
    }),
  area: z.enum(
    [
      'PRE_EXPANDED',
      'RECYCLED',
      'LOCKED',
      'CUTTING',
      'PRESTRESSED_JOISTS',
      'SERVICES',
    ],
    {
      errorMap: () => {
        return {
          message: `El área de la máquina solo puede tener los valores: ${Object.keys(
            AREA_VALUES_MAP
          )
            .map((t) => `'${t}'`)
            .join(' | ')}`,
        }
      },
    }
  ),
  model: z
    .string({ required_error: 'El modelo de la máquina es requerido' })
    .min(1, {
      message: 'El modelo de la máquina debe tener al menos 1 caracter',
    }),
  specificData: z
    .string({
      required_error: 'Los datos específicos de la máquina son requeridos',
    })
    .min(1, {
      message:
        'Los datos específicos de la máquina debe tener al menos 1 caracter',
    }),
  function: z
    .string({
      required_error: 'La función de la máquina es requerido',
    })
    .min(1, {
      message: 'La función de la máquina debe tener al menos 1 caracter',
    }),
  technicalDocumentation: z
    .array(
      z.enum(
        [
          'OPERATIONS_MANUAL',
          'MAINTENANCE_MANUAL',
          'ELECTRICAL_PLANS',
          'MECHANICAL_PLANS',
        ],
        {
          errorMap: () => {
            return {
              message: `La documentación técnica de la máquina solo puede tener los valores: ${Object.keys(
                TECHNICAL_DOCUMENTATION_VALUES_MAP
              )
                .map((t) => `'${t}'`)
                .join(' | ')}`,
            }
          },
        }
      )
    )
    .max(4, {
      message:
        'La documentación técnica de la máquina debe tener máximo 4 valores',
    }),
  criticality: z.enum(['HIGH', 'MEDIUM', 'LOW'], {
    errorMap: () => {
      return {
        message: `La criticidad de la máquina solo puede tener los valores: ${Object.keys(
          CRITICALITY_VALUES_MAP
        )
          .map((t) => `'${t}'`)
          .join(' | ')}`,
      }
    },
  }),
  image: z.any().refine((val) => {
    return val ? !!val.name : false
  }, 'La imagen de la máquina es requerido'),
}

const machineShapeCreate = {
  ...machineShapeUpdate,
  code: z
    .string({ required_error: 'El código de la máquina es requerido' })
    .regex(/^[A-Z]{2}-[0-9]{2}-[A-Z]{3}-[0-9]{2}$/, {
      message:
        "El código de la máquina debe tener el formato: LL-NN-LLL-NN (donde 'L' es letra mayúscula y 'N' es número)",
    }),
}

export const createMachineDto = z.object(machineShapeCreate)

export const updateMachineDto = z.object(machineShapeUpdate)
