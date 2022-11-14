import { HTTP_METHODS } from '../../../../services'
import { getEngineUrlExternal } from '../../../../services/engineServices'
import { requestExternalApi } from '../../../../services/requestApi'

export default async function getMachineByCode(req, res) {
  const {
    query: { code, complete },
  } = req

  const { data, message, status } = await requestExternalApi({
    method: HTTP_METHODS.GET,
    url: getEngineUrlExternal(code, complete),
  })

  if (message) {
    return res.status(status).json({ message })
  }

  const machine = data
  const { image } = machine
  if (image) {
    const { url } = image
    const { name } = machine
    machine.image = { src: url, name }
  }

  return res.status(status).json(machine)
}
