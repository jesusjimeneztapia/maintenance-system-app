export function cleanUnnecessarySpaces({ field, defaultValue = undefined }) {
  field = field?.replace(/ {2,}/g, ' ').trim()
  const transformedField = transformOptionalField({ field, defaultValue })
  return transformedField
}

export function transformOptionalField({ field, defaultValue = undefined }) {
  if (field == null || field === '') {
    return defaultValue
  }
  return field
}

export function validateOptionalField(field) {
  if (field == null) {
    return true
  }
  return /^(([A-Z]|\d){1,}|-$)/.test(field)
}
