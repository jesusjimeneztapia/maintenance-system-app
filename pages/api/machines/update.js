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

addMachine.put(async (req, res) => {
  const { body, files } = req
  const formData = new FormData()
  const { code, ...rest } = body
  const keys = Object.keys(rest)
  keys.forEach((key) => {
    formData.append(key, body[key][0])
  })
  const { image } = files
  if (image) {
    const { path } = image[0]
    const stream = fs.createReadStream(path)
    formData.append('image', stream)
  }
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
