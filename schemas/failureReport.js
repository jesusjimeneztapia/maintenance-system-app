import { z } from 'zod'

export const CREATE_FAILURE_REPORT_INITIAL_VALUES = {
  machineCode: undefined,
  systemFailedState: '',
  description: '',
  operatorName: '',
  stopHours: '',
}

export const SYSTEM_FAILED_STATE_VALUES_MAP = {
  ELECTRIC: 'ELÉCTRICO',
  MECHANIC: 'MECÁNICO',
  HYDRAULIC: 'HIDRAÚLICO',
  STEAM: 'VAPOR',
  TIRE: 'NEUMÁTICO',
  OTHER: 'OTRO',
}

const failureReportShapeCreate = {
  machineCode: z.string({
    required_error: 'La máquina es requerida',
    invalid_type_error: 'La máquina es requerida',
  }),
  systemFailedState: z.enum(
    ['ELECTRIC', 'MECHANIC', 'HYDRAULIC', 'STEAM', 'TIRE', 'OTHER'],
    {
      errorMap: () => ({
        message: 'El sistema en estado de falla es requerido',
      }),
    }
  ),
  description: z
    .string({
      required_error: 'La descripción del reporte de falla es requerido',
    })
    .min(
      10,
      'La descripción del reporte de falla debe tener al menos 10 caracteres'
    ),
  operatorName: z
    .string({
      required_error:
        'El nombre del operador del reporte de falla es requerido',
    })
    .min(
      4,
      'El nombre del operador del reporte de falla debe tener al menos 4 caracteres'
    ),
  stopHours: z
    .number({
      required_error: 'Las horas detinidas del reporte de falla es requerida',
      invalid_type_error:
        'Las horas detinidas del reporte de falla es requerida',
    })
    .min(0, {
      message:
        'Las horas detenidas del reporte de falla debe ser un número positivo',
    }),
}

export const createFailureReportDto = z.object(failureReportShapeCreate)
