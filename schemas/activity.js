import { z } from 'zod'

const ACTIVITY_INITIAL_VALUES = {
  name: '',
  frequency: '',
  activityType: '',
}

function createActivityCodeInitial(machineCode) {
  return machineCode.split('-')[2]
}

export function activityInitialValues(machineCode) {
  return {
    ...ACTIVITY_INITIAL_VALUES,
    code: createActivityCodeInitial(machineCode),
    machineCode,
  }
}

const weekly = 24 * 7
const biweekly = weekly * 2
const monthly = 24 * 30
const bimonthly = monthly * 2
const quarterly = monthly * 3
const fourMonth = monthly * 4
const biannual = monthly * 6
const annual = monthly * 12
const twoAnnual = annual * 2
const fourAnnual = annual * 4

export const FREQUENCY_VALUES_MAP = {
  [weekly]: 'SEMANAL',
  [biweekly]: 'QUINCENAL',
  [monthly]: 'MENSUAL',
  [bimonthly]: 'BIMESTRAL',
  [quarterly]: 'TRIMESTRAL',
  [fourMonth]: 'CUATRIMESTRE',
  [biannual]: 'SEMESTRAL',
  [annual]: 'ANUAL',
  [twoAnnual]: '2 AÑOS',
  [fourAnnual]: '4 AÑOS',
}

export function getFrequencyName(frequency) {
  const foundFrequencyName = FREQUENCY_VALUES_MAP[frequency]
  return foundFrequencyName ?? `${frequency} hrs.`
}

export const ACTIVITY_TYPE_VALUES_MAP = {
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
          message: `El tipo de actividad solo puede tener los valores: ${Object.keys(
            ACTIVITY_TYPE_VALUES_MAP
          )
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
    .regex(/^[A-Z]{3}[0-9]{2}$/, {
      message:
        "El código de la actividad debe tener el formato: LLLNN (donde 'L' es letra mayúscula y 'N' es número)",
    }),
}

export const createActivityDto = z.object(activityShapeCreate)

export const updateActivityDto = z.object(activityShapeUpdate)
