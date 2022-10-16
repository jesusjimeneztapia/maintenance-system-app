import axios from 'redaxios'
import nc from 'next-connect'
import fileParser from '../../../middlewares/fileParser'
import FormData from 'form-data'
import fs from 'fs-extra'

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
  const formData = new FormData()
  const keys = Object.keys(body)
  keys.forEach((key) => {
    formData.append(key, body[key][0])
  })
  const { path } = files.image[0]
  const stream = fs.createReadStream(path)
  formData.append('image', stream)
  try {
    const {
      data: {
        image: { url },
        ...rest
      },
    } = await axios.post(`${API_URL}/machines/create`, formData, {
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
