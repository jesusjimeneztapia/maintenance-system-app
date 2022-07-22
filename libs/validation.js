export function validateMethods(req, ...args) {
  const { method } = req
  if (args.includes(method)) {
    return method
  }
  throw { status: 404, message: 'Not found route' }
}

export function cleanBody(req, ...args) {
  const { body } = req
  const cleanedBody = {}

  args.forEach((property) => {
    cleanedBody[property] = body[property]
  })

  return cleanedBody
}

export function validateError(error) {
  let { status, message } = error
  return {
    status: status ?? 500,
    message: message ?? 'An unexpected error occurred',
  }
}
