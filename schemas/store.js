import { z } from 'zod'

export const ADD_STORE_INITIAL_VALUES = {
  machineCode: undefined,
  name: undefined,
  unit: undefined,
  amount: undefined,
  minimumAmount: undefined,
}

const storeShapeUpdate = {
  amount: z
    .number({
      required_error: 'La cantidad de repuestos es requerida',
      invalid_type_error: 'La cantidad de repuestos debe ser un número',
    })
    .int('La cantidad de repuestos debe ser un número entero')
    .min(0, 'La cantidad de repuestos debe ser un número positivo'),
  minimumAmount: z
    .number({
      required_error: 'La cantidad minima de repuestos es requerida',
      invalid_type_error: 'La cantidad mínima de repuestos debe ser un número',
    })
    .int('La cantidad mínima de repuestos debe ser un número entero')
    .min(1, 'La cantidad mínima de repuestos debe ser mayor a 1'),
}

const storeShapeCreate = {
  machineCode: z.string({
    required_error: 'La máquina del repuesto es requerida',
    invalid_type_error: 'La máquina del repuesto debe ser un texto',
  }),
  name: z
    .string({
      required_error: 'El nombre del repuesto es requerido',
      invalid_type_error: 'El nombre de repuestos debe ser un texto',
    })
    .trim()
    .min(8, 'El nombre del repuesto debe tener al menos 8 caracteres'),
  unit: z
    .string({
      required_error: 'La unidad del repuesto es requerida',
      invalid_type_error: 'La unidad del repuesto es un texto',
    })
    .trim()
    .min(1, 'La unidad del repuesto debe tener al menos un carácter'),
  ...storeShapeUpdate,
}

export const createStoreDto = z.object(storeShapeCreate)
export const updateStoreDto = z.object(storeShapeUpdate)
