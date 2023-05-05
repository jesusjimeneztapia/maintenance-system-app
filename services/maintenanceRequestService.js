import axios from 'redaxios'

export const MAINTENANCE_REQUEST_URL_REGULAR = '/maintenance-request'

export const MAINTENANCE_REQUEST_URL_INTERNAL = `/api${MAINTENANCE_REQUEST_URL_REGULAR}`

export async function verifyMaintenanceRequest(id) {
  const { data } = await axios.patch(
    `${MAINTENANCE_REQUEST_URL_INTERNAL}/${id}`
  )
  return data
}
