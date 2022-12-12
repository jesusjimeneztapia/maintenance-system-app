import { z } from 'zod'
import { ACTIVITY_TYPE_VALUES_MAP } from './activity'

export const CREATE_WORK_ORDER_INITIAL_VALUES = {
  machineCode: '',
  machineName: '',
  machineArea: '',
  engineCode: '',
  engineFunction: '',
  activity: {
    code: undefined,
    name: undefined,
    activityType: undefined,
  },
  engines: [],
  activities: [],
}

export const WORK_ORDER_STATE_VALUES_MAP = {
  PLANNED: 'Planificada',
  VALIDATED: 'Validada',
  DOING: 'En ejecución',
  DONE: 'Finalizada',
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
    }),
  activity: z.object({
    code: z
      .string()
      .regex(/^[A-Z]{3}[0-9]{2,3}$/, {
        message:
          "El código de actividad de la orden de trabajo debe tener el formato: LLLNN o LLLNNN (donde 'L' es letra mayúscula y 'N' es número)",
      })
      .optional(),
    name: z
      .string({
        required_error:
          'El nombre de actividad de la orden de trabajo es requerido',
        invalid_type_error:
          'El nombre de actividad de la orden de trabajo es requerido',
      })
      .min(1, {
        message: 'El nombre de actividad debe tener al menos un caracter',
      }),
    activityType: z
      .enum(
        [
          'CONDITION_CHECK',
          'VISUAL_INSPECTIONS',
          'LUBRICATION',
          'AUTONOMOUS_MAINTENANCE',
          'PERIODIC_MAINTENANCE',
          'CORRECTIVE_MAINTENANCE',
        ],
        {
          errorMap: () => {
            return {
              message: `El tipo de actividad solo puede tener los valores: ${Object.values(
                ACTIVITY_TYPE_VALUES_MAP
              )
                .map((t) => `'${t}'`)
                .join(' | ')}`,
            }
          },
        }
      )
      .optional(),
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
