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

addMachine.put(async (req, res) => {
  const { body, files } = req
  const { code, ...rest } = body
  const formData = createFormDataForApi(rest, files)
  try {
    const {
      data: {
        image: { url },
        ...rest
      },
    } = await axios.put(`${API_URL}/machines/${code}`, formData, {
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
