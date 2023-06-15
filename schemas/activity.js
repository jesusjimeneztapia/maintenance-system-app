import { z } from 'zod'
import { cleanUnnecessarySpaces, transformOptionalField } from '../libs/fields'
import { ACTIVITY_TYPE_ID_ZOD } from './activityType'

const ACTIVITY_INITIAL_VALUES = {
  name: undefined,
  frequency: undefined,
  activityTypeId: undefined,
  pem: undefined,
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
    .string({
      required_error: 'El nombre de la actividad es requerido',
      invalid_type_error: 'El nombre de la actividad debe ser un texto',
    })
    .transform((field) => cleanUnnecessarySpaces({ field }))
    .refine(
      (value) => value?.length >= 16,
      (field) => ({
        message:
          field == null
            ? 'El nombre de la actividad es requerido'
            : 'El nombre de la actividad debe tener al menos 16 caracteres',
      })
    ),
  frequency: z
    .number()
    .int({ message: 'La frequencia de la actividad debe ser número entero' })
    .optional()
    .refine(
      (value) => (value != null ? value > 0 : true),
      'La frecuencia de la actividad debe ser mayor a 0'
    ),
  activityTypeId: ACTIVITY_TYPE_ID_ZOD,
  pem: z
    .string({ invalid_type_error: 'El pem de la actividad debe ser un texto' })
    .optional()
    .transform((field) => transformOptionalField({ field }))
    .refine(
      (value) => (value ? /^PEM [0-9]{3}$/.test(value) : true),
      "El pem de la actividad debe tener el formato: PEM NNN (donde 'N' es número)"
    ),
  machineCode: z.string({
    required_error: 'El código de la máquina es requerido',
  }),
}

const activityShapeCreate = {
  ...activityShapeUpdate,
  code: z
    .string({
      required_error: 'El código de la actividad es requerido',
      invalid_type_error: 'El código de la actividad debe ser un texto',
    })
    .refine(
      (field) => /^[A-Z]{3}[0-9]{2,3}$/.test(field ?? ''),
      (field) => ({
        message:
          field === ''
            ? 'El código de la actividad es requerido'
            : "El código de la actividad debe tener el formato: LLLNN o LLLNNN (donde 'L' es letra mayúscula y 'N' es número)",
      })
    ),
}

export const createActivityDto = z.object(activityShapeCreate)

export const updateActivityDto = z.object(activityShapeUpdate)
