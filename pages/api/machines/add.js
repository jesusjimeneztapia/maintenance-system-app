import nc from 'next-connect'
import fileParser from '../../../middlewares/fileParser'
import { createFormDataForApi } from '../../../libs/machine'
import { requestExternalApi } from '../../../services/requestApi'
import { HTTP_METHODS } from '../../../services'
import { MACHINE_URL_EXTERNAL } from '../../../services/machineServices'

export const config = {
  api: {
    bodyParser: false,
  },
}

const addMachine = nc()
addMachine.use(fileParser)

addMachine.post(async (req, res) => {
  const { body, files } = req
  const formData = createFormDataForApi(body, files)

  const { data, message, status } = await requestExternalApi({
    data: formData,
    headers: formData.getHeaders(),
    method: HTTP_METHODS.POST,
    url: MACHINE_URL_EXTERNAL,
  })

  if (message) {
    return res.status(status).json({ message })
  }

  const {
    image: { url },
    ...machineRest
  } = data

  const newMachine = { ...machineRest, image: url }
  return res.status(status).json(newMachine)
})

export default addMachine
