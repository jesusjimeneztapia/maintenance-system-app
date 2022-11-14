import nc from 'next-connect'
import fileParser from '../../../middlewares/fileParser'
import { createFormDataForApi } from '../../../libs/machine'
import { requestExternalApi } from '../../../services/requestApi'
import { HTTP_METHODS } from '../../../services'
import { getMachineByCodeUrlExternal } from '../../../services/machineServices'

export const config = {
  api: {
    bodyParser: false,
  },
}

const updateMachine = nc()
updateMachine.use(fileParser)

updateMachine.put(async (req, res) => {
  const { body, files } = req
  const { code, ...rest } = body
  const formData = createFormDataForApi(rest, files)

  const { data, message, status } = await requestExternalApi({
    data: formData,
    headers: formData.getHeaders(),
    method: HTTP_METHODS.PUT,
    url: getMachineByCodeUrlExternal(code),
  })

  if (message) {
    return res.status(status).json({ message })
  }

  const {
    image: { url },
    ...machineRest
  } = data

  const updatedMachine = { ...machineRest, image: url }
  return res.status(status).json(updatedMachine)
})

export default updateMachine
