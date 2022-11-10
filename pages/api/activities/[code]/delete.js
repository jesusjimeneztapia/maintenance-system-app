import axios from 'redaxios'
import { API_URL } from '../../../../libs/environment'

export default async function deleteActivity(req, res) {
  const {
    query: { code, machineCode },
  } = req

  try {
    const { status } = await axios.delete(`${API_URL}/activities/${code}`, {
      params: { machineCode },
    })
    return res.status(status).send()
  } catch (error) {
    const { data, status } = error
    return res
      .status(status ?? 500)
      .json(data ?? { message: 'Ocurrió algún error' })
  }
}
