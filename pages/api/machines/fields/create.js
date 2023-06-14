import nc from 'next-connect'
import { requestExternalApi } from '../../../../services/requestApi'
import { MACHINE_GET_FIELDS_TO_CREATE_URL_EXTERNAL } from '../../../../services/machineServices'

const fieldsToCreateMachine = nc()

fieldsToCreateMachine.get(async (req, res) => {
  const { method } = req
  const { data, message, status } = await requestExternalApi({
    method,
    url: MACHINE_GET_FIELDS_TO_CREATE_URL_EXTERNAL,
  })
  if (data != null) {
    const response = Object.entries(data).reduce((acc, [key, array]) => {
      return {
        ...acc,
        [key]: array.reduce((acc, value) => {
          const { id, name } = value
          return { ...acc, [id]: name }
        }, {}),
      }
    }, {})
    return res.json(response)
  }
  return res.status(status).json({ message })
})

export default fieldsToCreateMachine
