import axios from 'redaxios'

const API_URL = process.env.API_URL

export default async function getMachineByCode(req, res) {
  const {
    query: { code },
  } = req
  try {
    const { data } = await axios.get(`${API_URL}/machines/${code}/engines`)
    const { image } = data
    if (image) {
      const { url } = image
      const { name } = data
      data.image = { src: url, name }
    }
    return res.json(data)
  } catch (error) {
    const { data, status } = error
    return res
      .status(status ?? 500)
      .json(data ?? { message: 'Ocurrió algún error' })
  }
}
