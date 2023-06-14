import nc from 'next-connect'
import { requestExternalApi } from '../../../../services/requestApi'
import { ENGINE_GET_FIELDS_TO_CREATE_URL_EXTERNAL } from '../../../../services/engineServices'

const fieldsToCreateEngine = nc()

fieldsToCreateEngine.post(async (req, res) => {
  const { method } = req
  const { machineCode } = req.query
  const { data, message, status } = await requestExternalApi({
    method,
    url: ENGINE_GET_FIELDS_TO_CREATE_URL_EXTERNAL,
    params: { machineCode },
  })
  if (data != null) {
    const { machine } = data
    const fields = Object.entries(data.fields).reduce((acc, [key, array]) => {
      return {
        ...acc,
        [key]: array.reduce((acc, value) => {
          const { id, name } = value
          return { ...acc, [id]: name }
        }, {}),
      }
    }, {})
    return res.json({ machine, fields })
  }
  return res.status(status).json({ message })
})

export default fieldsToCreateEngine
