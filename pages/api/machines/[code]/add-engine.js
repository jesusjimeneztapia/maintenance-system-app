import axios from 'redaxios'

const API_URL = process.env.API_URL

export default async function addEngine(req, res) {
  const {
    body,
    query: { code },
  } = req
  try {
    const { data, status } = await axios.post(
      `${API_URL}/machines/${code}/engines`,
      body
    )
    return res.status(status).json(data)
  } catch (error) {
    const { data, status } = error
    return res
      .status(status ?? 500)
      .json(data ?? { message: 'Ocurrió algún error' })
  }
}
