import { z } from 'zod'

const draftWorkOrderShapeFilter = {
  year: z.number({
    required_error: 'El año es requerido',
    invalid_type_error: 'El año es requerido',
  }),
  month: z
    .number({
      required_error: 'El mes es requerido',
      invalid_type_error: 'El mes es requerido',
    })
    .min(0, { message: 'Debe seleccionar un mes desde Enero a Diciembre' })
    .max(11, { message: 'Debe seleccionar un mes desde Enero a Diciembre' }),
  day: z
    .number({
      required_error: 'El día es requerido',
      invalid_type_error: 'El día es requerido',
    })
    .min(1, { message: 'El día debe ser mínimo 1' })
    .max(31, { message: 'El día debe ser máximo 31' }),
}

export const filterDraftWorkOrderDto = z.object(draftWorkOrderShapeFilter)
