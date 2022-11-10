import axios from 'redaxios'
import { API_URL } from '../../../../libs/environment'

export default async function editActivity(req, res) {
  const {
    query: { code },
    body,
  } = req

  try {
    const { data, status } = await axios.put(
      `${API_URL}/activities/${code}`,
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
