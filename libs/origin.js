export function getAPIURL({ req }) {
  const { headers } = req
  const { host } = headers

  const protocol = headers['x-forwarded-proto'] || 'http'
  const baseUrl = req ? `${protocol}://${host}` : ''

  return `${baseUrl}/api`
}
