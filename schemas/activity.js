import { z } from 'zod'

export const activityInitialValues = {
  name: '',
  frequency: '',
  activityType: '',
}

const weekly = 24 * 7
const monthly = 24 * 30
const bimonthly = monthly * 2
const quarterly = monthly * 3
const fourMonth = monthly * 4
const biannual = monthly * 6
const annual = monthly * 12
const twoAnnual = annual * 2
const fourAnnual = annual * 4

export const frequencyValues = [
  {
    label: 'SEMANAL',
    value: weekly,
  },
  {
    label: 'MENSUAL',
    value: monthly,
  },
  {
    label: 'BIMESTRAL',
    value: bimonthly,
  },
  {
    label: 'TRIMESTRAL',
    value: quarterly,
  },
  {
    label: 'CUATRIMESTRE',
    value: fourMonth,
  },
  {
    label: 'SEMESTRAL',
    value: biannual,
  },
  { label: 'ANUAL', value: annual },
  { label: '2 AÑOS', value: twoAnnual },
  { label: '4 AÑOS', value: fourAnnual },
]

const activityTypeValues = [
  'CONDITION_CHECK',
  'VISUAL_INSPECTIONS',
  'LUBRICATION',
  'AUTONOMOUS_MAINTENANCE',
  'PERIODIC_MAINTENANCE',
  'CORRECTIVE_MAINTENANCE',
]

export const activityType = {
  CONDITION_CHECK: 'VERIFICACIÓN DE CONDICIÓN',
  VISUAL_INSPECTIONS: 'INSPECCIONES VISUALES',
  LUBRICATION: 'LUBRICACIÓN',
  AUTONOMOUS_MAINTENANCE: 'MANTENIMIENTO AUTÓNOMO',
  PERIODIC_MAINTENANCE: 'MANTENIMIENTO PERIÓDICO',
  CORRECTIVE_MAINTENANCE: 'MANTENIMIENTO CORRECTIVO',
}

const activityShapeUpdate = {
  name: z
    .string({ required_error: 'El nombre de la actividad es requerido' })
    .min(1, {
      message: 'El nombre de la actividad debe tener al menos un caracter',
    }),
  frequency: z
    .number({
      required_error: 'La frequencia de la actividad es requerida',
      invalid_type_error: 'La frequencia de la actividad es requerida',
    })
    .int({ message: 'La frequencia de la actividad debe ser número entero' }),
  activityType: z.enum(
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
          message: `El tipo de actividad solo puede tener los valores: ${activityTypeValues
            .map((t) => `'${t}'`)
            .join(' | ')}`,
        }
      },
    }
  ),
  machineCode: z.string({
    required_error: 'El código de la máquina es requerido',
  }),
}

const activityShapeCreate = {
  ...activityShapeUpdate,
  code: z
    .string({ required_error: 'El código de la actividad es requerido' })
    .length(5, {
      message: 'El código de la actividad debe tener 5 caracteres',
    }),
}

export const createActivityDto = z.object(activityShapeCreate)

export const updateActivityDto = z.object(activityShapeUpdate)
