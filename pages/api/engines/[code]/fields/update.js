import nc from 'next-connect'
import { engineGetFieldsToUpdateUrlExternal } from '../../../../../services/engineServices'
import { requestExternalApi } from '../../../../../services/requestApi'

const fieldsToUpdateEngine = nc()

fieldsToUpdateEngine.put(async (req, res) => {
  const { method } = req
  const { code } = req.query
  const { data, message, status } = await requestExternalApi({
    method,
    url: engineGetFieldsToUpdateUrlExternal(code),
  })
  if (data != null) {
    const { engine } = data
    const fields = Object.entries(data.fields).reduce((acc, [key, array]) => {
      return {
        ...acc,
        [key]: array.reduce((acc, value) => {
          const { id, name } = value
          return { ...acc, [id]: name }
        }, {}),
      }
    }, {})
    const { mark, type } = engine
    return res.json({
      engine: { ...engine, mark: mark ?? undefined, type: type ?? undefined },
      fields,
    })
  }
  return res.status(status).json({ message })
})

export default fieldsToUpdateEngine
