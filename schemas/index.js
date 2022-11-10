import { z } from 'zod'

function validateDecimal({ value, precision, scale }) {
  const integerCount = precision - scale
  let [integerPart, decimalPart] = `${value}`.split('.')

  integerPart = integerPart.length
  decimalPart = decimalPart ? decimalPart.length : 0

  return integerPart <= integerCount && decimalPart <= scale
}

export function createZodDecimal({ precision, scale, messageError, ...rest }) {
  return z
    .number({ ...rest, invalid_type_error: rest.required_error })
    .refine((value) => validateDecimal({ value, precision, scale }), {
      message: messageError,
    })
}
