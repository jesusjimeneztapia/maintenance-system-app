import nc from 'next-connect'
import { requestExternalApi } from '../../../../services/requestApi'

const fieldsToCreateStore = nc()

fieldsToCreateStore.get(async (req, res) => {
  const { method } = req
  const { data, message, status } = await requestExternalApi({
    method,
    url: '/stores/fields/create',
  })
  if (data != null) {
    const { machines, units } = data
    return res.status(status).json({
      machines: machines.reduce((acc, value) => {
        const { name, code } = value
        return { ...acc, [code]: name }
      }, {}),
      units: units.reduce((acc, value) => {
        const { name } = value
        return { ...acc, [name]: name }
      }, {}),
    })
  }
  return res.status(status).json({ message })
})

export default fieldsToCreateStore
