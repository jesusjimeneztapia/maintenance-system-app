import axios from 'redaxios'
import nc from 'next-connect'
import fileParser from '../../../middlewares/fileParser'
import { createFormDataForApi } from '../../../libs/machine'

const API_URL = process.env.API_URL

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
  try {
    const {
      data: {
        image: { url },
        ...rest
      },
    } = await axios.post(`${API_URL}/machines`, formData, {
      headers: formData.getHeaders(),
    })

    return res.status(201).json({ ...rest, image: url })
  } catch (error) {
    const { data, status } = error
    return res
      .status(status ?? 500)
      .json(data ?? { message: 'Ocurrió algún error' })
  }
})

export default addMachine
