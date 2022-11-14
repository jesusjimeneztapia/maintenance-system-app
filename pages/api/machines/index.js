import { HTTP_METHODS } from '../../../services'
import { MACHINE_URL_EXTERNAL } from '../../../services/machineServices'
import { requestExternalApi } from '../../../services/requestApi'

export default async function getAllMachines(_req, res) {
  const { data, message, status } = await requestExternalApi({
    method: HTTP_METHODS.GET,
    url: MACHINE_URL_EXTERNAL,
  })
  if (message) {
    return res.status(status).json({ message })
  }

  const machines = data.map(({ image, ...rest }) => ({
    ...rest,
    image: image ? image.url : null,
  }))

  return res.status(status).json(machines)
}
