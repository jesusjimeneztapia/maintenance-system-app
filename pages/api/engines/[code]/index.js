import nc from 'next-connect'
import { requestExternalApi } from '../../../../services/requestApi'
import { getEngineByCodeUrlExternal } from '../../../../services/engineServices'

const engineWithCodeRouter = nc()

engineWithCodeRouter.put(async (req, res) => {
  const { method, body } = req
  const { code } = req.query
  const { data, message, status } = await requestExternalApi({
    method,
    url: getEngineByCodeUrlExternal(code),
    data: body,
  })
  return res.status(status).json(data == null ? { message } : data)
})

export default engineWithCodeRouter
