import axios from 'redaxios'

const API_URL = process.env.API_URL

export default async function getEngine(req, res) {
  const {
    query: { code: machineCode, engineCode },
  } = req

  try {
    const { data } = await axios.get(
      `${API_URL}/machines/${machineCode}/engines/${engineCode}`
    )
    return res.json(data)
  } catch (error) {
    const { data, status } = error
    return res
      .status(status ?? 500)
      .json(data ?? { message: 'Ocurrió algún error' })
  }
}
