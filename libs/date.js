export function dateLocaleString(isoString, withYear = false) {
  const date = new Date(isoString)
  return date.toLocaleString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: withYear ? 'numeric' : undefined,
  })
}

export function getDateValue(stringDate) {
  if (!stringDate) {
    return ''
  }
  const [stringValue] = stringDate.split('T')
  const date = new Date(stringValue.replace(/-/g, '/'))
  return date
    .toLocaleString('af-ZA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '-')
}
