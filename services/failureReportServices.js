import axios from 'redaxios'

export const FAILURE_REQUEST_URL_REGULAR = '/failure-report'
export const FAILURE_REQUEST_URL_INTERNAL = `/api${FAILURE_REQUEST_URL_REGULAR}`

export async function verifyFailureReport(id) {
  const { data } = await axios.patch(`${FAILURE_REQUEST_URL_INTERNAL}/${id}`)
  return data
}
