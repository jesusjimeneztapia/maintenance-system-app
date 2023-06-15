import nc from 'next-connect'
import { ACTIVITY_GET_FIELDS_TO_CREATE_URL_EXTERNAL } from '../../../../services/activityServices'
import { requestExternalApi } from '../../../../services/requestApi'

const fieldsToCreateActivity = nc()

fieldsToCreateActivity.post(async (req, res) => {
  const { method } = req
  const { machineCode } = req.query
  const { data, message, status } = await requestExternalApi({
    method,
    url: ACTIVITY_GET_FIELDS_TO_CREATE_URL_EXTERNAL,
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
    return res.json({ fields, machine })
  }
  return res.status(status).json({ message })
})

export default fieldsToCreateActivity
