import nc from 'next-connect'
import { requestExternalApi } from '../../../services/requestApi'

const storeEndPoint = nc()

storeEndPoint.post(async (req, res) => {
  const { method, body } = req
  const { machineCode, ...createDto } = body
  const { data, message, status } = await requestExternalApi({
    method,
    data: createDto,
    url: `/machines/${machineCode}/stores`,
  })
  return res.status(status).json(message ? { message } : data)
})

storeEndPoint.get(async (req, res) => {
  const { method } = req
  const { data, message, status } = await requestExternalApi({
    method,
    url: '/stores',
  })
  return res.status(status).json(message ? { message } : data)
})

export default storeEndPoint
