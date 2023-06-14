import { z } from 'zod'
import { CRITICALITY_ID_INITIAL_VALUE, CRITICALITY_ID_ZOD } from './criticality'
import { AREA_ID_INITIAL_VALUE, AREA_ID_ZOD } from './area'
import {
  TECHNICAL_DOCUMENTATION_ARRAY_ZOD,
  TECHNICAL_DOCUMENTATION_INITIAL_VALUE,
} from './technicalDocumentation'
import {
  cleanUnnecessarySpaces,
  transformOptionalField,
  validateOptionalField,
} from '../libs/fields'
import { generateImageZod } from './image'

export const MACHINE_INITIAL_VALUES = {
  code: undefined,
  name: undefined,
  maker: undefined,
  model: undefined,
  function: undefined,
  location: undefined,
  areaId: AREA_ID_INITIAL_VALUE,
  specificData: undefined,
  criticalityId: CRITICALITY_ID_INITIAL_VALUE,
  technicalDocumentation: TECHNICAL_DOCUMENTATION_INITIAL_VALUE,
  image: undefined,
}

const machineShapeUpdate = {
  name: z
    .string({
      required_error: 'El nombre de la máquina es requerido',
      invalid_type_error: 'El nombre de la máquina debe ser un texto',
    })
    .transform((field) => cleanUnnecessarySpaces({ field }))
    .refine(
      (value) => value?.length >= 5,
      (field) => ({
        message:
          field == null
            ? 'El nombre de la máquina es requerido'
            : 'El nombre de la máquina debe tener al menos 5 caracteres',
      })
    ),
  maker: z
    .string({
      invalid_type_error: 'El fabricante de la máquina debe ser un texto',
    })
    .optional()
    .transform((field) => transformOptionalField({ field }))
    .refine(
      validateOptionalField,
      "El fabricante de la máquina debe tener por lo menos 1 carácter o tener '-' para no definir el fabricante"
    ),
  location: z
    .string({
      required_error: 'La ubicación de la máquina es requerida',
      invalid_type_error: 'La ubicación de la máquina debe ser un texto',
    })
    .transform((field) => cleanUnnecessarySpaces({ field }))
    .refine(
      (value) => value?.length >= 3 && value?.length <= 11,
      (field) => ({
        message:
          field == null
            ? 'La ubicación de la máquina es requerida'
            : field.length < 3
            ? 'La ubicación de la máquina debe tener al menos 3 caracteres'
            : 'La ubicación de la máquina debe tener máximo 11 caracteres',
      })
    ),
  areaId: AREA_ID_ZOD,
  model: z
    .string({
      invalid_type_error: 'El modelo de la máquina debe ser un texto',
    })
    .optional()
    .transform((field) => transformOptionalField({ field }))
    .refine(
      validateOptionalField,
      "El modelo de la máquina debe tener por lo menos 1 carácter o tener '-' para no definir el modelo"
    ),
  specificData: z
    .string({
      invalid_type_error:
        'Los datos específicos de la máquina debe ser un texto',
    })
    .optional()
    .transform((field) => transformOptionalField({ field }))
    .refine(
      validateOptionalField,
      "Los datos específicos de la máquina debe tener por lo menos 1 carácter o tener '-' para no definir los datos específicos"
    ),
  function: z
    .string({
      invalid_type_error: 'La función de la máquina debe ser un texto',
    })
    .optional()
    .transform((field) => transformOptionalField({ field }))
    .refine(
      validateOptionalField,
      "La función de la máquina debe tener por lo menos 1 carácter o tener '-' para no definir la función"
    ),
  technicalDocumentation: TECHNICAL_DOCUMENTATION_ARRAY_ZOD,
  criticalityId: CRITICALITY_ID_ZOD,
  image: generateImageZod({
    required_error: 'La imagen de la máquina es requerida',
    invalid_type_error:
      'La imagen de la máquina debe ser un solo archivo de tipo imagen',
  }),
}

const machineShapeCreate = {
  ...machineShapeUpdate,
  code: z
    .string({
      required_error: 'El código de la máquina es requerido',
      invalid_type_error: 'El código de la máquina de ser un texto',
    })
    .refine(
      (field) => /^[A-Z]{2}-[0-9]{2}-[A-Z]{3}-[0-9]{2}$/.test(field ?? ''),
      (field) => ({
        message:
          field === ''
            ? 'El código de la máquina es requerido'
            : "El código de la máquina debe tener el formato: LL-NN-LLL-NN (donde 'L' es letra mayúscula y 'N' es número)",
      })
    ),
}

export const createMachineDto = z.object(machineShapeCreate)

export const updateMachineDto = z.object(machineShapeUpdate)
