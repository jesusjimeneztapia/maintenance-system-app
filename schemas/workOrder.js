import { z } from 'zod'

export const CREATE_WORK_ORDER_INITIAL_VALUES = {
  machineCode: '',
  machineName: '',
  machineArea: '',
  engineCode: undefined,
  engineFunction: undefined,
  activityCode: undefined,
  activityName: undefined,
  priority: undefined,
  activityType: undefined,
  securityMeasureStarts: [],
  protectionEquipments: [],
  activityDescription: undefined,
  storeDescription: undefined,
  storeUnit: undefined,
  failureCause: undefined,
  startHour: undefined,
  totalHours: undefined,
  securityMeasureEnds: [],
  engines: [],
  activities: [],
}

export const WORK_ORDER_STATE_VALUES_MAP = {
  PLANNED: 'Planificada',
  VALIDATED: 'Validada',
  DOING: 'En ejecución',
  DONE: 'Finalizada',
}

export const WORK_ORDER_ACTIVITY_TYPE_VALUES_MAP = {
  PLANNED_PREVENTIVE: 'PREVENTIVO PLANIFICADO',
  CORRECTIVE: 'CORRECTIVO',
  INSPECTION: 'INSPECCIÓN',
  CONDITION_CHECK: 'VERIFICACIÓN DE CONDICIÓN',
  ROUTINE: 'RUTINARIO',
}

export const WORK_ORDER_PRIORITY_VALUES_MAP = {
  URGENT: 'URGENTE',
  IMPORTANT: 'IMPORTANTE',
  NORMAL: 'NORMAL',
}

export const WORK_ORDER_SECURITY_MEASURE_START_VALUES = {
  BLOCKED: 'SE BLOQUEÓ EL EQUIPO ANTES DE LA INTERVENCIÓN',
  LABELED: 'SE ETIQUETÓ EL EQUIPO ANTES DE LA INTERVENCIÓN',
  BLOCKED_LABELED: 'BLOQUEADO Y ETIQUETADO CORRECTO',
}
export const WORK_ORDER_PROTECTION_EQUIPMENT_VALUES = {
  HELMET: 'CASCO',
  SECURITY_GLASSES: 'GAFAS DE SEGURIDAD',
  GLOVES: 'GUANTES',
  SECURITY_HARNESS: 'ARNÉS DE SEGURIDAD',
  ACOUSTIC_PROTECTORS: 'PROTECTORES ACÚSTICOS',
  SECURITY_BOOTS: 'BOTAS DE SEGURIDAD',
  OTHERS: 'OTROS',
}
export const WORK_ORDER_SECURITY_MEASURE_END_VALUES = {
  RETIRE: 'SE RETIRÓ EL BLOQUEO Y ETIQUETADO DEL EQUIPO',
  REPORT: 'SE INFORMÓ AL OPERADOR DEL RETIRO DEL BLOQUEO',
  KEEP: 'SE MANTIENE ORDEN Y LIMPIEZA EN EL ÁREA',
  CHECK: 'SE VERIFICÓ EL EQUIPO ANTES DE LA ENTREGA',
}

const dateSchema = z.preprocess((arg) => {
  if (typeof arg === 'string' || arg instanceof Date) return new Date(arg)
  return arg
}, z.date())

const workOrderShapeCreate = {
  machineCode: z
    .string({ required_error: 'El código de la máquina es requerido' })
    .regex(/^[A-Z]{2}-[0-9]{2}-[A-Z]{3}-[0-9]{2}$/, {
      message:
        "El código de la máquina debe tener el formato: LL-NN-LLL-NN (donde 'L' es letra mayúscula y 'N' es número)",
    }),
  engineCode: z
    .string({ required_error: 'El código del motor es requerido' })
    .regex(/^[A-Z]{2}-[0-9]{2}-[A-Z]{3}-[0-9]{2}-MOT-[0-9]{3}$/, {
      message:
        "El código de motor de la orden de trabajo debe tener el formato: LL-NN-LLL-NN-MOT-NNN (donde 'L' es letra mayúscula y 'N' es número)",
    })
    .optional(),
  engineFunction: z
    .string()
    .min(1, { message: 'La función del motor debe tener al menos 1 caracter' })
    .optional(),

  priority: z.enum(['URGENT', 'IMPORTANT', 'NORMAL'], {
    errorMap: (parameter) => {
      if (parameter.received === 'undefined') {
        return {
          message: 'La prioridad de la orden de trabajo es requerida',
        }
      }
      return {
        message: `La prioridad de la orden de trabajo solo puede tener los valores: ${Object.keys(
          WORK_ORDER_PRIORITY_VALUES_MAP
        )
          .map((t) => `'${t}'`)
          .join(' | ')}`,
      }
    },
  }),
  activityType: z.enum(
    [
      'PLANNED_PREVENTIVE',
      'CORRECTIVE',
      'INSPECTION',
      'CONDITION_CHECK',
      'ROUTINE',
    ],
    {
      errorMap: (parameter) => {
        if (parameter.received === 'undefined') {
          return {
            message: 'El tipo de actividad de la orden de trabajo es requerido',
          }
        }
        return {
          message: `El tipo de actividad de la orden de trabajo solo puede tener los valores: ${Object.keys(
            WORK_ORDER_ACTIVITY_TYPE_VALUES_MAP
          )
            .map((t) => `'${t}'`)
            .join(' | ')}`,
        }
      },
    }
  ),
  activityCode: z
    .string()
    .regex(/^[A-Z]{3}[0-9]{2,3}$/, {
      message:
        "El código de actividad de la orden de trabajo debe tener el formato: LLLNN o LLLNNN (donde 'L' es letra mayúscula y 'N' es número)",
    })
    .optional(),
  activityName: z
    .string({
      required_error:
        'El nombre de la actividad de la orden de trabajo es requerido',
    })
    .min(1, {
      message: 'El nombre de actividad debe tener al menos un caracter',
    }),
}

const workOrderShapeUpdate = {
  startDate: dateSchema.optional(),
  endDate: dateSchema.optional(),
  state: z.enum(['PLANNED', 'VALIDATED', 'DOING', 'DONE'], {
    errorMap: () => {
      return {
        message: `El estado de la orden de trabajo solo puede tener los valores: ${Object.values(
          WORK_ORDER_STATE_VALUES_MAP
        )
          .map((t) => `'${t}'`)
          .join(' | ')}`,
      }
    },
  }),
  failureCause: z
    .string()
    .min(1, {
      message:
        'La causa de falla de la orden de trabajo debe tener al menos 1 caracter',
    })
    .optional(),
}

export const createWorkOrderDto = z.object(workOrderShapeCreate)

export const updateWorkOrderDto = z.object(workOrderShapeUpdate)
