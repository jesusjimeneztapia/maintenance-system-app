import axios from 'redaxios'
import { API_URL } from '../../../../libs/environment'

export default async function editActivity(req, res) {
  const {
    query: { code, machineCode },
  } = req

  try {
    const { data, status } = await axios.get(`${API_URL}/activities/${code}`, {
      params: { machineCode },
    })
    return res.status(status).json(data)
  } catch (error) {
    const { data, status } = error
    return res
      .status(status ?? 500)
      .json(data ?? { message: 'Ocurrió algún error' })
  }
}
