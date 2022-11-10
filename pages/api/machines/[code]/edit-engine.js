import axios from 'redaxios'

const API_URL = process.env.API_URL

export default async function editEngine(req, res) {
  const {
    query: { code: machineCode, engineCode },
    body,
  } = req

  try {
    const { data } = await axios.put(
      `${API_URL}/machines/${machineCode}/engines/${engineCode}`,
      body
    )
    return res.json(data)
  } catch (error) {
    const { data, status } = error
    return res
      .status(status ?? 500)
      .json(data ?? { message: 'Ocurrió algún error' })
  }
}
