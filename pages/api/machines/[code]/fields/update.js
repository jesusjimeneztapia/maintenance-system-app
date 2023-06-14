import nc from 'next-connect'
import { requestExternalApi } from '../../../../../services/requestApi'
import { getMachineFieldsToUpdateUrlExternal } from '../../../../../services/machineServices'

const fieldsToUpdateMachine = nc()

fieldsToUpdateMachine.get(async (req, res) => {
  const { method } = req
  const { code } = req.query
  const { data, message, status } = await requestExternalApi({
    method,
    url: getMachineFieldsToUpdateUrlExternal(code),
  })
  if (data != null) {
    const {
      machine: { maker, model, function: fn, specificData, ...machine },
    } = data
    const fields = Object.entries(data.fields).reduce((acc, [key, array]) => {
      return {
        ...acc,
        [key]: array.reduce((acc, value) => {
          const { id, name } = value
          return { ...acc, [id]: name }
        }, {}),
      }
    }, {})
    return res.json({
      fields,
      machine: {
        ...machine,
        maker: maker ?? undefined,
        model: model ?? undefined,
        function: fn ?? undefined,
        specificData: specificData ?? undefined,
      },
    })
  }
  return res.status(status).json({ message })
})

export default fieldsToUpdateMachine
