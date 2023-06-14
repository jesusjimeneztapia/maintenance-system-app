import { z } from 'zod'

export function generateImageZod({
  required_error: requiredError = null,
  invalid_type_error: invalidTypeError,
}) {
  const validateFile = (file) => {
    if (file instanceof Array) {
      return false
    }
    if (file == null) {
      return requiredError == null
    }
    return file.type?.startsWith('image/')
  }
  const message =
    requiredError == null
      ? invalidTypeError
      : (file) => ({
          message: file == null ? requiredError : invalidTypeError,
        })

  return z.any().refine(validateFile, message)
}
